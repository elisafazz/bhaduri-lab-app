"use client";

import { useState } from "react";
import { Profile, updateProfileActive } from "@/lib/supabase";
import { UserCheck, UserX, Shield } from "lucide-react";

type Props = {
  members: Profile[];
};

export default function MemberTable({ members: initialMembers }: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [toggling, setToggling] = useState<string | null>(null);

  async function toggleAccess(id: string, currentActive: boolean) {
    setToggling(id);
    const { error } = await updateProfileActive(id, !currentActive);
    if (!error) {
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, is_active: !currentActive } : m))
      );
    }
    setToggling(null);
  }

  return (
    <div className="bg-white border border-[#D4D9EE] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#D4D9EE]">
        <h2 className="font-semibold text-[#1C1D2E] text-sm">
          Lab Members ({members.length})
        </h2>
        <p className="text-xs text-[#6B7280] mt-0.5">
          Toggle access to enable or disable login for a member.
        </p>
      </div>
      {members.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-[#6B7280]">
          No members yet. Members appear here after they sign up.
        </div>
      ) : (
        <div className="divide-y divide-[#D4D9EE]">
          {members.map((member) => (
            <div key={member.id} className="px-5 py-3 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#1C1D2E] truncate">{member.email}</span>
                  {member.role === "admin" && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium bg-[#EEF0F9] text-[#6B75B0]">
                      <Shield size={10} />
                      Admin
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Joined {new Date(member.created_at).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => toggleAccess(member.id, member.is_active)}
                disabled={toggling === member.id || member.role === "admin"}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${member.role === "admin"
                    ? "opacity-40 cursor-not-allowed bg-gray-100 text-gray-500"
                    : member.is_active
                    ? "bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                    : "bg-red-50 text-red-700 border border-red-200 hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  }
                `}
              >
                {member.is_active ? (
                  <>
                    <UserCheck size={12} /> Active
                  </>
                ) : (
                  <>
                    <UserX size={12} /> Disabled
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
