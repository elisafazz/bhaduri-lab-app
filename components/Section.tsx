import LinkCard from "./LinkCard";
import type { Section as SectionType } from "@/data/content";

type Props = {
  section: SectionType;
};

export default function Section({ section }: Props) {
  return (
    <div className="mb-10">
      <div className="mb-3">
        <h2 className="text-xs font-bold tracking-widest uppercase text-[#8B9DC3]">
          {section.title}
        </h2>
        {section.description && (
          <p className="mt-1 text-sm text-[#6B7280]">{section.description}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {section.links.map((link) => (
          <LinkCard key={link.label} {...link} />
        ))}
      </div>
    </div>
  );
}
