import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { createClient } from "@supabase/supabase-js";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
    const supabase = createSupabaseServerClient();

    // Race auth check against a 3s timeout to prevent page hangs
    const authResult = await Promise.race([
      supabase.auth.getUser(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);

    const user = authResult && "data" in authResult ? authResult.data.user : null;

    if (user) {
      isLoggedIn = true;
      const adminClient = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        process.env.SUPABASE_SERVICE_ROLE_KEY || ""
      );
      const { data: profile } = await adminClient
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (profile?.role === "admin") isAdmin = true;
    }
  } catch {
    // Not logged in or env vars not set
  }

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header isAdmin={isAdmin} isLoggedIn={isLoggedIn} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
