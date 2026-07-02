"use client";

import { smallVouchers } from "@/data/vouchers";
import { useSite } from "@/components/providers";

export default function VoucherDetailGrid() {
  const { category, searchTerm, openVoucherModal } = useSite();

  const filtered = smallVouchers.filter((v) => {
    const matchesCategory = category === "Tất cả" || v.category === category;
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      v.tag.toLowerCase().includes(term) ||
      v.description.toLowerCase().includes(term) ||
      v.code.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-[#e5e7eb] bg-white py-8 text-center text-sm text-[#9ca3af]">
        Không tìm thấy mã giảm giá phù hợp.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {filtered.map((v) => (
        <div
          key={v.code}
          className="flex flex-col justify-between overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
        >
          <div className={`flex gap-2 p-3 ${v.bg}`}>
            <div
              className={`flex min-w-[50px] flex-col items-center rounded-lg p-2 ${v.badgeBg}`}
            >
              <span className="text-[10px] text-white">
                {v.discountLabel ?? "Giảm"}
              </span>
              <span className="text-lg font-bold text-white">{v.discount}</span>
              <span className="mt-1 rounded-lg bg-white/20 px-1 text-[8px] text-white uppercase">
                {v.tag}
              </span>
            </div>
            <p className="flex-1 text-[9px] leading-[13.5px] text-[#6b7280]">
              {v.description}
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-dashed border-[#e5e7eb] px-2 py-2">
            <span className="text-[8px] text-[#9ca3af]">{v.expiry}</span>
            <button
              type="button"
              onClick={() =>
                openVoucherModal({
                  code: v.code,
                  discount: v.discount,
                  tag: v.tag,
                  description: v.description,
                })
              }
              className="rounded-lg bg-brand px-3 py-1 text-[10px] font-bold text-white"
            >
              {v.cta}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
