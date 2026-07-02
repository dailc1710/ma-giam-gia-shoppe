"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, X, ExternalLink } from "lucide-react";

type Product = {
  image: string;
  discount: string;
  badge: string;
  badgeBg: string;
  name: string;
  oldPrice: string;
  price: string;
  rating: string;
  sold: string;
  url: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-[#f3f4f6] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="relative aspect-square w-full">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        <span className="absolute top-1 right-1 rounded-lg bg-brand/90 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {product.discount}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <span
          className={`inline-block w-fit rounded-lg px-1 py-0.5 text-[8px] font-bold text-white uppercase ${product.badgeBg}`}
        >
          {product.badge}
        </span>
        <h3 className="line-clamp-2 min-h-8 text-[11px] font-semibold text-[#1c1b1b]">
          {product.name}
        </h3>
        <div>
          <p className="text-[9px] text-[#9ca3af] line-through">{product.oldPrice}</p>
          <p className="text-sm font-bold text-brand">{product.price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="size-[8px] fill-current text-[#6b7280]" />
            <span className="text-[8px] text-[#6b7280]">{product.rating}</span>
          </div>
          <span className="text-[8px] text-[#6b7280]">{product.sold}</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full rounded-lg bg-brand py-1.5 text-[10px] font-bold text-white uppercase"
        >
          XEM DEAL
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-[#1c1b1b]">{product.name}</h3>
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setOpen(false)}
                className="shrink-0 text-[#9ca3af]"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="relative mt-3 aspect-square w-full overflow-hidden rounded-lg">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
              <span className="absolute top-2 right-2 rounded-lg bg-brand/90 px-2 py-1 text-xs font-bold text-white">
                {product.discount}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-[#9ca3af] line-through">{product.oldPrice}</p>
                <p className="text-xl font-bold text-brand">{product.price}</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-[#6b7280]">
                <div className="flex items-center gap-1">
                  <Star className="size-3 fill-current text-[#6b7280]" />
                  {product.rating}
                </div>
                <span>{product.sold}</span>
              </div>
            </div>

            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-bold text-white"
            >
              <ExternalLink className="size-4" />
              Đến Shopee mua ngay
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
