import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

export const metadata = {
  title: "Admin — Bhaduri Lab",
};

const ONBOARDING_ITEMS = [
  { key: "info_sheet", label: "Fill out lab member info sheet", url: "https://docs.google.com/forms/d/e/1FAIpQLSfUhGS6oZjPrrWiKghUe9HOaQcyaPwxuQprMEQI43r_zv807g/viewform?usp=header" },
  { key: "google_drive", label: "Give access to Bhaduri Lab Google Drive", url: "https://drive.google.com/drive/u/1/folders/1a_6AwkZNbMYaZzfFsjblWp1ahWnkIqg4" },
  { key: "building_access", label: "Building access" },
  { key: "training", label: "Training confirmed" },
  { key: "lab_website", label: "Added to lab website" },
  { key: "hoffman_account", label: "Hoffman account created" },
];

const OFFBOARDING_ITEMS = [
  { key: "website_removed", label: "Removed/moved on lab website" },
  { key: "spaces_cleared", label: "Lab spaces cleared" },
  { key: "slack_removed", label: "Removed from Slack" },
  { key: "drive_password", label: "Bhaduri lab Google Drive password changed" },
];

const ALWAYS_ITEMS = [
  "Control delete access from critical Bhaduri lab Box folders",
];

export default async function AdminPage() {
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

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-[#1C1D2E]">Admin</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Onboarding, offboarding, and member management.
          </p>
        </div>
        <Link
          href="/admin/members"
          className="px-4 py-2 bg-[#6B75B0] hover:bg-[#5a639e] text-white text-sm font-medium rounded-xl transition-all"
        >
          Manage Members
        </Link>
      </div>

      <div className="space-y-6">
        {/* Onboarding + Offboarding side by side */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white border border-[#D4D9EE] rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-4">
              Onboarding
            </h2>
            <ul className="space-y-2.5">
              {ONBOARDING_ITEMS.map((item) => (
                <li key={item.key} className="flex items-start gap-2.5 text-sm text-[#1C1D2E]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9DC3] flex-shrink-0" />
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B75B0] hover:underline"
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-[#D4D9EE] rounded-xl p-5">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-4">
              Offboarding
            </h2>
            <ul className="space-y-2.5">
              {OFFBOARDING_ITEMS.map((item) => (
                <li key={item.key} className="flex items-start gap-2.5 text-sm text-[#1C1D2E]">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8B9DC3] flex-shrink-0" />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Always */}
        <div className="bg-white border border-[#D4D9EE] rounded-xl p-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-4">
            Always
          </h2>
          <ul className="space-y-2.5">
            {ALWAYS_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#1C1D2E]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D97706] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
