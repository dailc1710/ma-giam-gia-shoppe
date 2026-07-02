import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AllProductsGrid from "@/components/sections/AllProductsGrid";

export const metadata: Metadata = {
  title: "Tất Cả Sản Phẩm - Mã Giảm Giá",
  description:
    "Toàn bộ sản phẩm nổi bật đang giảm giá trên Shopee: công nghệ, mẹ & bé, gia dụng, làm đẹp.",
};

export default function SanPhamPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <Breadcrumb current="Tất Cả Sản Phẩm" />
      <div>
        <h1 className="text-xl font-bold text-brand uppercase">Tất Cả Sản Phẩm</h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          Toàn bộ sản phẩm nổi bật đang có ưu đãi giảm giá.
        </p>
      </div>
      <AllProductsGrid />
    </main>
  );
}
