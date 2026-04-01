import { redirect } from "next/navigation";
import { getCurrentProfile, getAllProfiles, getChecklistItems } from "@/lib/supabase";
import ChecklistPanel from "@/components/admin/ChecklistPanel";
import Link from "next/link";

export const metadata = {
  title: "Checklists — Bhaduri Lab",
};

export default async function ChecklistsPage() {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== "admin") {
    redirect("/login");
  }

  const allProfiles = await getAllProfiles();
  const members = allProfiles.filter((p) => p.role === "member");

  const memberChecklists = await Promise.all(
    members.map(async (member) => ({
      member,
      onboarding: await getChecklistItems(member.id, "onboarding"),
      offboarding: await getChecklistItems(member.id, "offboarding"),
    }))
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#1C1D2E]">Checklists</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Onboarding and offboarding per lab member.
          </p>
        </div>
        <Link
          href="/admin"
          className="px-4 py-2 bg-white border border-[#D4D9EE] hover:border-[#8B9DC3] text-sm font-medium text-[#6B75B0] rounded-xl transition-all"
        >
          Members
        </Link>
      </div>

      <ChecklistPanel memberChecklists={memberChecklists} adminId={profile.id} />
    </div>
  );
}
