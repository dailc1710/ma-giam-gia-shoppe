"use client";

import { useState } from "react";
import Link from "next/link";
import { Flame } from "lucide-react";
import { productFilters, products } from "@/data/products";
import { useSite } from "@/components/providers";
import ProductCard from "@/components/sections/ProductCard";

export default function TopProducts() {
  const [active, setActive] = useState(productFilters[0]);
  const { searchTerm } = useSite();

  const term = searchTerm.trim().toLowerCase();
  const filtered = products.filter((p) => {
    const matchesTab = active === "Tất cả" || p.category === active;
    const matchesSearch = !term || p.name.toLowerCase().includes(term);
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e5e7eb] pb-[9px]">
        <div className="flex items-center gap-2">
          <Flame className="size-4 text-brand" />
          <h2 className="text-base font-bold text-brand uppercase">
            TOP SẢN PHẨM NỔI BẬT
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {productFilters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className={`shrink-0 rounded-full px-4 py-1 text-[11px] font-bold whitespace-nowrap ${
                active === f ? "bg-brand text-white" : "bg-[#f3f4f6] text-[#4b5563]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Link href="/san-pham" className="text-[11px] font-bold text-brand">
          Xem tất cả sản phẩm →
        </Link>
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#e5e7eb] bg-white py-8 text-center text-sm text-[#9ca3af]">
          Không tìm thấy sản phẩm phù hợp.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {filtered.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
