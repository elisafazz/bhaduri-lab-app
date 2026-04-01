"use client";

import { createBrowserClient } from "@supabase/ssr";

export default function SignOutButton() {
  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-xs font-medium text-white/50 hover:text-white/80 transition-colors"
    >
      Sign out
    </button>
  );
}
