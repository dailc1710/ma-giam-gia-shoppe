import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import GuideContent from "@/components/sections/GuideContent";
import { buyingGuideSteps, buyingGuideFaqs } from "@/data/guides";

export const metadata: Metadata = {
  title: "Hướng Dẫn Mua Hàng - Mã Giảm Giá",
  description:
    "Hướng dẫn cách tìm, sao chép và áp dụng mã giảm giá Shopee khi mua hàng, kèm giải đáp các câu hỏi thường gặp.",
};

export default function HuongDanMuaHangPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <Breadcrumb current="Hướng Dẫn Mua Hàng" />
      <div>
        <h1 className="text-xl font-bold text-brand uppercase">
          Hướng Dẫn Mua Hàng
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          4 bước đơn giản để săn và áp dụng mã giảm giá Shopee cho đơn hàng của bạn.
        </p>
      </div>
      <GuideContent steps={buyingGuideSteps} faqs={buyingGuideFaqs} />
    </main>
  );
}
