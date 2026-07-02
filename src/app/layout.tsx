import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Providers from "@/components/providers";
import RedBanner from "@/components/layout/RedBanner";
import StickyNav from "@/components/layout/StickyNav";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mã Giảm Giá - Tổng hợp mã giảm giá Shopee mới nhất",
  description:
    "Tổng hợp mã giảm giá Shopee miễn phí, uy tín và cập nhật liên tục mỗi ngày. Giúp bạn mua sắm thông minh, tiết kiệm tối đa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f9fafb] font-sans">
        <Providers>
          <RedBanner />
          <StickyNav />
          {children}
          <Footer />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
