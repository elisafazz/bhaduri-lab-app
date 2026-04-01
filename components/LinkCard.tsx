"use client";

import { ExternalLink } from "lucide-react";

type Props = {
  label: string;
  description?: string;
  url: string;
  badge?: string;
};

export default function LinkCard({ label, description, url, badge }: Props) {
  const isPlaceholder = url === "#placeholder";

  return (
    <a
      href={isPlaceholder ? undefined : url}
      target={isPlaceholder ? undefined : "_blank"}
      rel="noopener noreferrer"
      className={`
        group block bg-white border border-[#D4D9EE] rounded-xl p-4
        transition-all duration-200
        ${isPlaceholder
          ? "cursor-default opacity-60"
          : "hover:border-[#8B9DC3] hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
        }
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[#1C1D2E] text-sm leading-snug">
              {label}
            </span>
            {badge && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${
                badge === "HIPAA"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-amber-100 text-amber-700 border-amber-200"
              }`}>
                {badge}
              </span>
            )}
            {isPlaceholder && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-400 border border-gray-200">
                URL pending
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-sm text-[#374151] leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {!isPlaceholder && (
          <ExternalLink
            size={14}
            className="text-[#8B9DC3] opacity-30 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
          />
        )}
      </div>
    </a>
  );
}
