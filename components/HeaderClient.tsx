"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Image from "next/image";
import Link from "next/link";
import ReportBugButton from "./ReportBugButton";

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export default function HeaderClient() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();

    async function loadRole() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setIsLoggedIn(true);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") setIsAdmin(true);
    }

    loadRole();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadRole();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = getSupabase();
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
      </div>
    </header>
  );
}
