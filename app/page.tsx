import Image from "next/image";
import { sections } from "@/data/content";
import Section from "@/components/Section";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="flex flex-col items-center text-center mb-14">
        <Image
          src="/bhaduri-lab-logo.jpg"
          alt="Bhaduri Lab"
          width={180}
          height={180}
          priority
          className="object-contain mb-6"
        />
        <h1 className="text-2xl font-bold text-[#1C1D2E] tracking-tight">
          Bhaduri Lab
        </h1>
        <p className="mt-2 text-sm text-[#374151] font-medium max-w-md">
          Resources, protocols, and links for lab members.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-[#D4D9EE] mb-10" />

      {/* Sections */}
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}
