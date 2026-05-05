"use client";

export default function SignOutButton() {
  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-medium text-white/60 hover:text-white transition-colors"
    >
      Sign out
    </button>
  );
}
