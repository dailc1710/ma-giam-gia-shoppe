import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ArticleGrid from "@/components/sections/ArticleGrid";
import { newsArticles } from "@/data/newsArticles";

export const metadata: Metadata = {
  title: "Tin Khuyến Mãi - Mã Giảm Giá",
  description:
    "Cập nhật tin tức khuyến mãi, lịch tung mã và chương trình ưu đãi mới nhất trên Shopee mỗi ngày.",
};

export default function TinKhuyenMaiPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <Breadcrumb current="Tin Khuyến Mãi" />
      <div>
        <h1 className="text-xl font-bold text-brand uppercase">Tin Khuyến Mãi</h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          Tổng hợp tin tức và chương trình khuyến mãi mới nhất từ Shopee.
        </p>
      </div>
      <ArticleGrid articles={newsArticles} />
    </main>
  );
}
