"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (authError) {
      setError(authError.message);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/bhaduri-lab-logo.jpg"
            alt="Bhaduri Lab"
            width={72}
            height={72}
            className="mx-auto object-contain mb-4"
          />
          <h1 className="text-lg font-semibold text-[#1C1D2E]">Reset password</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Enter your email to receive a reset link.
          </p>
        </div>
        <div className="bg-white border border-[#D4D9EE] rounded-2xl p-6 shadow-sm">
          {status === "sent" ? (
            <div className="text-center space-y-3">
              <p className="text-sm text-[#1C1D2E] font-medium">Check your email</p>
              <p className="text-xs text-[#6B7280]">
                A password reset link has been sent to {email}.
              </p>
              <Link href="/login" className="block text-xs text-[#8B9DC3] hover:text-[#6B75B0] mt-4">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-[#D4D9EE] rounded-xl px-4 py-2.5 text-sm text-[#1C1D2E] focus:outline-none focus:border-[#8B9DC3] transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              {status === "error" && (
                <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[#6B75B0] hover:bg-[#5a639e] disabled:opacity-50 text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
              >
                {status === "sending" ? "Sending..." : "Send reset link"}
              </button>
              <Link href="/login" className="block text-center text-xs text-[#6B7280] hover:text-[#1C1D2E] transition-colors">
                Back to sign in
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
