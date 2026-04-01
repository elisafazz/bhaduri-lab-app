import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";
import MemberTable from "@/components/admin/MemberTable";
import Link from "next/link";
import type { Profile } from "@/lib/supabase";

export const metadata = {
  title: "Admin — Bhaduri Lab",
};

export default async function AdminPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  // Use service role to bypass RLS
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

  const { data: members } = await adminClient
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#1C1D2E]">Admin</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Manage lab members and access.
          </p>
        </div>
        <Link
          href="/admin/checklists"
          className="px-4 py-2 bg-white border border-[#D4D9EE] hover:border-[#8B9DC3] text-sm font-medium text-[#6B75B0] rounded-xl transition-all"
        >
          Checklists
        </Link>
      </div>

      <MemberTable members={(members ?? []) as Profile[]} />
    </div>
  );
}
