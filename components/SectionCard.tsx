import { ArrowUpRight } from "lucide-react";
import type { Section } from "@/data/content";

type Props = {
  section: Section;
};

export default function SectionCard({ section }: Props) {
  const Icon = section.icon;

  return (
    <div className="group bg-white border border-[#D4D9EE] rounded-xl p-6 transition-all duration-200 hover:border-[#8B9DC3] hover:shadow-lg">
      {/* Icon badge */}
      <div className="mb-4">
        <span
          className={`inline-flex rounded-lg p-2.5 ring-2 ring-inset ${section.iconBg} ${section.iconColor}`}
        >
          <Icon className="size-5" aria-hidden />
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-[#1C1D2E] mb-1.5">
        {section.title}
      </h3>

      {/* Description */}
      {section.description && (
        <p className="text-sm text-[#6B7280] leading-relaxed mb-4 line-clamp-3">
          {section.description}
        </p>
      )}

      {/* Links */}
      <div className="space-y-2 mt-auto pt-2 border-t border-[#F0F1F7]">
        {section.links.map((link) => {
          const isPlaceholder = link.url === "#placeholder";

          return (
            <a
              key={link.label}
              href={isPlaceholder ? undefined : link.url}
              target={isPlaceholder ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`flex items-start justify-between gap-2 py-1.5 text-sm rounded-md transition-colors ${
                isPlaceholder
                  ? "cursor-default text-[#B8C5E0]"
                  : "text-[#1C1D2E] hover:text-[#6B75B0] cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate font-medium">{link.label}</span>
                {link.badge && (
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border flex-shrink-0 ${
                      link.badge === "HIPAA"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {isPlaceholder && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-400 border border-gray-200 flex-shrink-0">
                    pending
                  </span>
                )}
              </div>
              {!isPlaceholder && (
                <ArrowUpRight
                  size={14}
                  className="text-[#8B9DC3] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
                />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
