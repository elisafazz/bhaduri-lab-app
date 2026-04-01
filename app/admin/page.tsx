import { redirect } from "next/navigation";
import { getCurrentProfile, getAllProfiles } from "@/lib/supabase";
import MemberTable from "@/components/admin/MemberTable";
import Link from "next/link";

export const metadata = {
  title: "Admin — Bhaduri Lab",
};

export default async function AdminPage() {
  const profile = await getCurrentProfile();

  if (!profile || profile.role !== "admin") {
    redirect("/login");
  }

  const members = await getAllProfiles();

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

      <MemberTable members={members} />
    </div>
  );
}
