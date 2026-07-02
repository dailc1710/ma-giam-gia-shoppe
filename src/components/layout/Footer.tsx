"use client";

import { useState } from "react";
import { Share2, Mail, Rss, Check } from "lucide-react";
import { footerColumns } from "@/data/footer";
import { useSite } from "@/components/providers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Footer() {
  const { showToast } = useSite();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }
    setError("");
    setSubscribed(true);
    showToast("Đăng ký nhận tin thành công!");
  };

  return (
    <footer className="border-t border-[#e5e7eb] bg-white px-4 pt-[49px] pb-12">
      <div className="mx-auto flex max-w-[1338px] flex-col gap-8 sm:flex-row sm:justify-center">
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-sm font-bold text-brand uppercase">MÃ GIẢM GIÁ</h3>
          <p className="text-xs text-[#6b7280]">
            Trang tổng hợp mã giảm giá Shopee miễn phí, uy tín và cập nhật liên tục
            mỗi ngày. Giúp bạn mua sắm thông minh, tiết kiệm tối đa.
          </p>
          <div className="flex gap-3">
            {[Share2, Mail, Rss].map((Icon, i) => (
              <span
                key={i}
                className="flex size-8 items-center justify-center rounded-full bg-[#f3f4f6] text-[#6b7280]"
              >
                <Icon className="size-3.5" />
              </span>
            ))}
          </div>
        </div>
        {footerColumns.map((col) => (
          <div key={col.title} className="flex flex-1 flex-col gap-4">
            <h3 className="text-sm font-bold text-[#1f2937] uppercase">
              {col.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {col.items.map((item) => (
                <li key={item} className="text-xs text-[#6b7280]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-1 flex-col gap-4">
          <h3 className="text-sm font-bold text-[#1f2937] uppercase">
            ĐĂNG KÝ NHẬN TIN
          </h3>
          <p className="text-xs text-[#6b7280]">
            Nhận thông tin mã giảm giá mới nhất qua email mỗi ngày.
          </p>
          {subscribed ? (
            <p className="flex items-center gap-1.5 text-xs font-semibold text-[#009688]">
              <Check className="size-3.5" />
              Đã đăng ký thành công!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="min-w-0 flex-1 rounded-lg border border-[#e5e7eb] px-3 py-2 text-xs outline-none focus:border-brand"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-white"
                >
                  Đăng ký
                </button>
              </div>
              {error && <p className="text-xs text-[#dc2626]">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </footer>
  );
}
