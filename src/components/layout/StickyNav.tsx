"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { navLinks } from "@/data/nav";
import { useSite } from "@/components/providers";

export default function StickyNav() {
  const { searchTerm, setSearchTerm } = useSite();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-brand shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        {expanded ? (
          <div className="flex flex-1 items-center gap-2">
            <input
              autoFocus
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm mã giảm giá, sản phẩm..."
              className="w-full rounded-md bg-white px-3 py-1.5 text-sm text-[#1c1b1b] outline-none placeholder:text-[#9ca3af]"
            />
            <button
              type="button"
              aria-label="Đóng tìm kiếm"
              onClick={() => {
                setExpanded(false);
                setSearchTerm("");
              }}
              className="shrink-0 p-2 text-white"
            >
              <X className="size-[18px]" />
            </button>
          </div>
        ) : (
          <>
            <nav className="flex items-center gap-1 overflow-x-auto">
              {navLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className={`flex shrink-0 items-center gap-1.5 rounded-md px-4 py-2 text-sm whitespace-nowrap ${
                    Icon === null
                      ? "bg-white font-bold text-brand"
                      : "font-semibold text-white"
                  }`}
                >
                  {Icon && <Icon className="size-3.5" />}
                  {label}
                </Link>
              ))}
            </nav>
            <button
              type="button"
              aria-label="Tìm kiếm"
              onClick={() => setExpanded(true)}
              className="shrink-0 p-2 text-white"
            >
              <Search className="size-[18px]" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
