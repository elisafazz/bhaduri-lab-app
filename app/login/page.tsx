import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Sign in — Bhaduri Lab",
};

export default function LoginPage() {
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
          <h1 className="text-lg font-semibold text-[#1C1D2E]">Sign in</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Bhaduri Lab member access
          </p>
        </div>
        <div className="bg-white border border-[#D4D9EE] rounded-2xl p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
