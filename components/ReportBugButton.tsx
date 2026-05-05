"use client";

import { useState } from "react";
import { Bug, X, Send, CheckCircle } from "lucide-react";

export default function ReportBugButton() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/report-bug", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text, name: name.trim() || null }),
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          setOpen(false);
          setStatus("idle");
          setText("");
          setName("");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all"
      >
        <Bug size={12} />
        Report Bug
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#1C1D2E]">Report a Bug</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {status === "sent" ? (
              <div className="flex flex-col items-center gap-2 py-6 text-center">
                <CheckCircle size={32} className="text-green-500" />
                <p className="text-sm text-[#6B7280]">Bug report sent. Thanks!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full border border-[#D4D9EE] rounded-xl p-3 text-sm text-[#1C1D2E] placeholder-gray-400 focus:outline-none focus:border-[#8B9DC3] mb-2"
                />
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Describe the issue..."
                  rows={4}
                  className="w-full border border-[#D4D9EE] rounded-xl p-3 text-sm text-[#1C1D2E] placeholder-gray-400 focus:outline-none focus:border-[#8B9DC3] resize-none"
                />
                {status === "error" && (
                  <p className="mt-2 text-xs text-red-500">
                    Failed to send. Please email elisafazzari815@gmail.com directly.
                  </p>
                )}
                <div className="mt-3 flex justify-end">
                  <button
                    type="submit"
                    disabled={!text.trim() || status === "sending"}
                    className="flex items-center gap-2 px-4 py-2 bg-[#6B75B0] hover:bg-[#5a639e] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    <Send size={13} />
                    {status === "sending" ? "Sending..." : "Send Report"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
