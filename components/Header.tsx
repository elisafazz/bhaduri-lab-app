import Image from "next/image";
import Link from "next/link";
import ReportBugButton from "./ReportBugButton";
import SignOutButton from "./SignOutButton";

type Props = {
  isAdmin?: boolean;
  isLoggedIn?: boolean;
};

export default function Header({ isAdmin, isLoggedIn }: Props) {
  return (
    <header className="bg-[#1C1D2E]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/bhaduri-lab-logo.jpg"
            alt="Bhaduri Lab"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <span className="text-white font-semibold text-sm tracking-wide">
            Bhaduri Lab
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              href="/admin"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              Admin
            </Link>
          )}
          {isLoggedIn ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
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
