"use client";

import { categories } from "@/data/nav";
import { useSite } from "@/components/providers";

export default function CategoryFilterBar() {
  const { category: active, setCategory: setActive } = useSite();

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white p-[13px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2 overflow-x-auto py-1">
        <div className="shrink-0 border-r border-[#e5e7eb] pr-[9px] text-sm font-bold text-[#6b7280]">
          Danh mục
        </div>
        {categories.map(({ label, icon: Icon }) => {
          const isActive = label === active;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setActive(label)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-[13px] py-[7px] text-xs font-bold whitespace-nowrap ${
                isActive
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-[#e5e7eb] text-[#4b5563]"
              }`}
            >
              <Icon className="size-[13px]" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
