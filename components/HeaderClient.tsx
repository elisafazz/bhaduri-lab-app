"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import Link from "next/link";
import ReportBugButton from "./ReportBugButton";

export default function HeaderClient() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function checkRole() {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (data.role) {
        setIsLoggedIn(true);
        setIsAdmin(data.role === "admin");
      }
      setLoaded(true);
    }
    checkRole();
  }, []);

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <header className="bg-[#1C1D2E] border-b border-white/10">
      <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/bhaduri-lab-logo.jpg"
            alt="Bhaduri Lab"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <span className="text-white font-semibold text-sm tracking-wide">
            Bhaduri Lab
          </span>
        </div>
        {loaded && (
          <div className="flex items-center gap-3">
            {isAdmin && (
              <Link
                href="/admin"
                className="text-xs font-medium text-[#B8C5E0] hover:text-white transition-colors"
              >
                Admin
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleSignOut}
                className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors"
              >
                Sign out
              </button>
            ) : (
              <Link
                href="/login"
                className="text-xs font-medium text-[#B8C5E0] hover:text-white transition-colors"
              >
                Sign in
              </Link>
            )}
            <ReportBugButton />
          </div>
        )}
      </div>
    </header>
  );
}
