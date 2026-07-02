import CategoryFilterBar from "@/components/sections/CategoryFilterBar";
import FlashSaleTimeline from "@/components/sections/FlashSaleTimeline";
import VoucherDetailGrid from "@/components/sections/VoucherDetailGrid";
import HighlightVouchers from "@/components/sections/HighlightVouchers";
import TopProducts from "@/components/sections/TopProducts";
import RelatedArticles from "@/components/sections/RelatedArticles";
import Reviews from "@/components/sections/Reviews";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[1370px] flex-1 flex-col gap-6 px-4 py-6">
      <CategoryFilterBar />
      <FlashSaleTimeline />
      <VoucherDetailGrid />
      <HighlightVouchers />
      <TopProducts />
      <RelatedArticles />
      <Reviews />
    </main>
  );
}
