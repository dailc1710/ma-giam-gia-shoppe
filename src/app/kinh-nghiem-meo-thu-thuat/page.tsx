import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleGrid from "@/components/sections/ArticleGrid";
import { tipsArticles } from "@/data/tipsArticles";

export const metadata: Metadata = {
  title: "Kinh Nghiệm - Mẹo - Thủ Thuật - Mã Giảm Giá",
  description:
    "Chia sẻ kinh nghiệm, mẹo và thủ thuật săn mã giảm giá, mua sắm tiết kiệm trên Shopee.",
};

export default function KinhNghiemMeoThuThuatPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <Breadcrumb current="Kinh Nghiệm - Mẹo - Thủ Thuật" />
      <div>
        <h1 className="text-xl font-bold text-brand uppercase">
          Kinh Nghiệm - Mẹo - Thủ Thuật
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          Bí quyết săn mã và mua sắm tiết kiệm trên Shopee do cộng đồng chia sẻ.
        </p>
      </div>
      <ArticleGrid articles={tipsArticles} />
    </main>
  );
}
