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
            <SignOutButton />
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
