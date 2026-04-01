"use client";

import { useState } from "react";
import { Profile, updateProfileActive } from "@/lib/supabase";
import { UserCheck, UserX, Shield, UserPlus, Trash2, Send } from "lucide-react";

type Props = {
  members: Profile[];
};

export default function MemberTable({ members: initialMembers }: Props) {
  const [members, setMembers] = useState(initialMembers);
  const [toggling, setToggling] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [inviteError, setInviteError] = useState("");

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

  async function removeMember(id: string, email: string) {
    if (!confirm(`Remove ${email} permanently? This cannot be undone.`)) return;
    setRemoving(id);
    const res = await fetch("/api/admin/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: id }),
    });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
    setRemoving(null);
  }

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteStatus("sending");
    setInviteError("");
    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: inviteEmail }),
    });
    if (res.ok) {
      setInviteStatus("sent");
      setInviteEmail("");
      setTimeout(() => {
        setInviteStatus("idle");
        setShowInvite(false);
      }, 2500);
    } else {
      const data = await res.json();
      setInviteError(data.error ?? "Failed to send invite.");
      setInviteStatus("error");
    }
  }

  return (
    <div className="space-y-4">
      {/* Invite panel */}
      <div className="bg-white border border-[#D4D9EE] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#D4D9EE] flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[#1C1D2E] text-sm">
              Lab Members ({members.length})
            </h2>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Toggle access or remove members. Invite sends a signup email.
            </p>
          </div>
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#6B75B0] hover:bg-[#5a639e] text-white text-xs font-medium rounded-lg transition-colors"
          >
            <UserPlus size={13} />
            Invite
          </button>
        </div>

        {showInvite && (
          <div className="px-5 py-4 bg-[#F7F8FC] border-b border-[#D4D9EE]">
            {inviteStatus === "sent" ? (
              <p className="text-sm text-green-600 font-medium">Invite sent! They will receive an email to set their password.</p>
            ) : (
              <form onSubmit={sendInvite} className="flex gap-2">
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="member@example.com"
                  required
                  className="flex-1 border border-[#D4D9EE] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#8B9DC3]"
                />
                <button
                  type="submit"
                  disabled={inviteStatus === "sending"}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#6B75B0] hover:bg-[#5a639e] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <Send size={12} />
                  {inviteStatus === "sending" ? "Sending..." : "Send"}
                </button>
              </form>
            )}
            {inviteStatus === "error" && (
              <p className="mt-2 text-xs text-red-500">{inviteError}</p>
            )}
          </div>
        )}

        {members.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-[#6B7280]">
            No members yet. Use Invite to add lab members.
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
                <div className="flex items-center gap-2">
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
                      <><UserCheck size={12} /> Active</>
                    ) : (
                      <><UserX size={12} /> Disabled</>
                    )}
                  </button>
                  {member.role !== "admin" && (
                    <button
                      onClick={() => removeMember(member.id, member.email)}
                      disabled={removing === member.id}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                      title="Remove member permanently"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
