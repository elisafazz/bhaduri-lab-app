import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";
import MemberTable from "@/components/admin/MemberTable";
import ChecklistPanel from "@/components/admin/ChecklistPanel";
import Link from "next/link";
import type { Profile, ChecklistItem } from "@/lib/supabase";

export const metadata = {
  title: "Members — Bhaduri Lab",
};

export default async function MembersPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data: profile } = await adminClient
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") redirect("/");

  const { data: allProfiles } = await adminClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  const members = ((allProfiles ?? []) as Profile[]).filter((p) => p.role === "member");

  const memberChecklists = await Promise.all(
    members.map(async (member) => {
      const { data: onboarding } = await adminClient
        .from("checklist_items")
        .select("*")
        .eq("member_id", member.id)
        .eq("checklist_type", "onboarding");
      const { data: offboarding } = await adminClient
        .from("checklist_items")
        .select("*")
        .eq("member_id", member.id)
        .eq("checklist_type", "offboarding");
      return {
        member,
        onboarding: (onboarding ?? []) as ChecklistItem[],
        offboarding: (offboarding ?? []) as ChecklistItem[],
      };
    })
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#1C1D2E]">Members</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Manage lab member access and checklists.
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 bg-white border border-[#D4D9EE] hover:border-[#8B9DC3] text-sm font-medium text-[#6B75B0] rounded-xl transition-all"
        >
          Back to Admin
        </Link>
      </div>

      <div className="space-y-10">
        <MemberTable members={(allProfiles ?? []) as Profile[]} />

        {memberChecklists.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-4">
              Per-Member Checklists
            </h2>
            <ChecklistPanel memberChecklists={memberChecklists} adminId={user.id} />
          </div>
        )}
      </div>
    </div>
  );
}
