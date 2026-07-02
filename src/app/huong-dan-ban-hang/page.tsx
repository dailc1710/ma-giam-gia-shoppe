import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import GuideContent from "@/components/sections/GuideContent";
import { sellingGuideSteps, sellingGuideFaqs } from "@/data/guides";

export const metadata: Metadata = {
  title: "Hướng Dẫn Bán Hàng - Mã Giảm Giá",
  description:
    "Hướng dẫn đăng ký gian hàng, đăng sản phẩm và tạo mã giảm giá cho shop trên Shopee, kèm giải đáp câu hỏi thường gặp.",
};

export default function HuongDanBanHangPage() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <Breadcrumb current="Hướng Dẫn Bán Hàng" />
      <div>
        <h1 className="text-xl font-bold text-brand uppercase">
          Hướng Dẫn Bán Hàng
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">
          4 bước để bắt đầu bán hàng và tạo mã giảm giá thu hút khách trên Shopee.
        </p>
      </div>
      <GuideContent steps={sellingGuideSteps} faqs={sellingGuideFaqs} />
    </main>
  );
}
