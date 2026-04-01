import type { Metadata } from "next";
import "./globals.css";
import HeaderClient from "@/components/HeaderClient";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bhaduri Lab",
  description: "Resources and links for the Bhaduri Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <HeaderClient />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
