"use client";

import { Share2, ShoppingCart, PlayCircle } from "lucide-react";
import { highlightVoucherRows } from "@/data/vouchers";
import { useSite } from "@/components/providers";

const icons = [Share2, ShoppingCart, PlayCircle];

export default function HighlightVouchers() {
  const { category, searchTerm, openVoucherModal } = useSite();

  const term = searchTerm.trim().toLowerCase();
  const rows = highlightVoucherRows
    .map((row) =>
      row.filter((v) => {
        const matchesCategory = category === "Tất cả" || v.category === category;
        const matchesSearch =
          !term ||
          v.discountPercent.toLowerCase().includes(term) ||
          v.minOrder.toLowerCase().includes(term) ||
          v.code.toLowerCase().includes(term);
        return matchesCategory && matchesSearch;
      })
    )
    .filter((row) => row.length > 0);

  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[#e5e7eb] bg-white py-8 text-center text-sm text-[#9ca3af]">
        Không tìm thấy mã giảm giá phù hợp.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {row.map((v, i) => {
            const Icon = icons[i];
            const isTeal = v.accent === "teal";
            return (
              <div
                key={v.code + rowIndex}
                className={`flex overflow-hidden rounded-xl border border-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${
                  isTeal ? "bg-[#00bfa5]" : "bg-[#ee4d2d]"
                }`}
              >
                <div className="flex w-[134px] shrink-0 flex-col items-center justify-center gap-1 border-r border-dashed border-white/30 px-3 py-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-white">
                    <Icon
                      className={`size-5 ${
                        isTeal ? "text-[#00bfa5]" : "text-[#ee4d2d]"
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white uppercase">
                    TOÀN SÀN
                  </span>
                </div>
                <div
                  className={`flex-1 px-3 pt-[11px] pb-3 ${
                    isTeal ? "bg-[#e0f2f1]" : "bg-[#fdf2f0]"
                  }`}
                >
                  <p className="text-lg font-extrabold text-brand">
                    {v.discountPercent}
                  </p>
                  <p className="text-[10px] text-[#4b5563]">{v.minOrder}</p>
                  <p className="pt-1 text-[9px] leading-[11.25px] text-[#ef4444] italic">
                    {v.note}
                  </p>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-[9px] text-[#9ca3af]">{v.expiry}</span>
                    <button
                      type="button"
                      onClick={() =>
                        openVoucherModal({
                          code: v.code,
                          discount: v.discountPercent.replace(/^Giảm\s*/i, ""),
                          tag: "TOÀN SÀN",
                          description: v.minOrder,
                        })
                      }
                      className="rounded-lg bg-brand px-3 py-1 text-[10px] font-bold text-white"
                    >
                      {v.cta}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
