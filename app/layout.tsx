import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCurrentProfile } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bhaduri Lab",
  description: "Resources and links for the Bhaduri Lab",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let isAdmin = false;
  let isLoggedIn = false;

  try {
    const profile = await getCurrentProfile();
    if (profile) {
      isLoggedIn = true;
      isAdmin = profile.role === "admin";
    }
  } catch {
    // Not logged in
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
