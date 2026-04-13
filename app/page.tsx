import Image from "next/image";
import { sections } from "@/data/content";
import SectionCard from "@/components/SectionCard";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
      {/* Hero */}
      <div className="flex flex-col items-center text-center mb-12 md:mb-16">
        <div className="relative mb-6">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#8B9DC3]/20 to-[#6B75B0]/10 blur-sm" />
          <Image
            src="/bhaduri-lab-logo.jpg"
            alt="Bhaduri Lab"
            width={120}
            height={120}
            priority
            className="relative object-contain rounded-full ring-2 ring-[#D4D9EE]"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1C1D2E] tracking-tight">
          Bhaduri Lab
        </h1>
        <p className="mt-3 text-base text-[#6B7280] max-w-lg">
          Resources, protocols, and links for lab members.
        </p>
      </div>

      {/* Section Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}
