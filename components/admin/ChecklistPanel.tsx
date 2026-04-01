"use client";

import { useState } from "react";
import { Profile, ChecklistItem, upsertChecklistItem } from "@/lib/supabase";
import { ChevronDown, ChevronRight } from "lucide-react";

const ONBOARDING_ITEMS = [
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

type MemberChecklist = {
  member: Profile;
  onboarding: ChecklistItem[];
  offboarding: ChecklistItem[];
};

type Props = {
  memberChecklists: MemberChecklist[];
  adminId: string;
};

function ChecklistRow({
  itemDef,
  items,
  memberId,
  type,
  adminId,
}: {
  itemDef: { key: string; label: string };
  items: ChecklistItem[];
  memberId: string;
  type: "onboarding" | "offboarding";
  adminId: string;
}) {
  const existing = items.find((i) => i.item_key === itemDef.key);
  const [checked, setChecked] = useState(existing?.completed ?? false);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const next = !checked;
    await upsertChecklistItem(memberId, type, itemDef.key, next, adminId);
    setChecked(next);
    setLoading(false);
  }

  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggle}
        disabled={loading}
        className="w-4 h-4 accent-[#6B75B0] cursor-pointer"
      />
      <span className={`text-sm transition-colors ${checked ? "line-through text-[#6B7280]" : "text-[#1C1D2E]"}`}>
        {itemDef.label}
      </span>
    </label>
  );
}

function MemberSection({ data, adminId }: { data: MemberChecklist; adminId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-[#D4D9EE] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F7F8FC] transition-colors"
      >
        <span className="font-medium text-sm text-[#1C1D2E]">{data.member.email}</span>
        {open ? <ChevronDown size={16} className="text-[#8B9DC3]" /> : <ChevronRight size={16} className="text-[#8B9DC3]" />}
      </button>

      {open && (
        <div className="px-5 pb-4 border-t border-[#D4D9EE]">
          <div className="mt-4 grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-2">
                Onboarding
              </h4>
              {ONBOARDING_ITEMS.map((item) => (
                <ChecklistRow
                  key={item.key}
                  itemDef={item}
                  items={data.onboarding}
                  memberId={data.member.id}
                  type="onboarding"
                  adminId={adminId}
                />
              ))}
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-2">
                Offboarding
              </h4>
              {OFFBOARDING_ITEMS.map((item) => (
                <ChecklistRow
                  key={item.key}
                  itemDef={item}
                  items={data.offboarding}
                  memberId={data.member.id}
                  type="offboarding"
                  adminId={adminId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ChecklistPanel({ memberChecklists, adminId }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-3">
          Member Checklists
        </h2>
        {memberChecklists.length === 0 ? (
          <p className="text-sm text-[#6B7280]">No members yet.</p>
        ) : (
          <div className="space-y-2">
            {memberChecklists.map((data) => (
              <MemberSection key={data.member.id} data={data} adminId={adminId} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#8B9DC3] mb-3">
          Always
        </h2>
        <div className="bg-white border border-[#D4D9EE] rounded-xl p-4">
          <p className="text-xs text-[#6B7280] mb-3">Permanent admin responsibilities.</p>
          <ul className="space-y-2">
            {ALWAYS_ITEMS.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#1C1D2E]">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#8B9DC3] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
