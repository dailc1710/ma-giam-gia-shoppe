"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Check, Copy, X } from "lucide-react";

type VoucherModalData = {
  code: string;
  discount?: string;
  tag?: string;
  description?: string;
};

type SiteContextValue = {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showToast: (message: string) => void;
  openVoucherModal: (voucher: VoucherModalData) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within <Providers>");
  return ctx;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [category, setCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const [voucher, setVoucher] = useState<VoucherModalData | null>(null);
  const [copied, setCopied] = useState(false);

  const showToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2500);
  }, []);

  const openVoucherModal = useCallback((v: VoucherModalData) => {
    setCopied(false);
    setVoucher(v);
  }, []);

  const closeVoucherModal = useCallback(() => setVoucher(null), []);

  useEffect(() => {
    if (!voucher) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVoucherModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [voucher, closeVoucherModal]);

  const handleCopyCode = async () => {
    if (!voucher) return;
    try {
      await navigator.clipboard.writeText(voucher.code);
    } catch {
      // clipboard unavailable, still confirm for the demo
    }
    setCopied(true);
    showToast(`Đã sao chép mã "${voucher.code}"`);
  };

  const value = useMemo(
    () => ({
      category,
      setCategory,
      searchTerm,
      setSearchTerm,
      showToast,
      openVoucherModal,
    }),
    [category, searchTerm, showToast, openVoucherModal]
  );

  return (
    <SiteContext.Provider value={value}>
      {children}

      {voucher && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4"
          onClick={closeVoucherModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-[#1f2937] uppercase">
                Mã giảm giá của bạn
              </h3>
              <button
                type="button"
                aria-label="Đóng"
                onClick={closeVoucherModal}
                className="text-[#9ca3af]"
              >
                <X className="size-5" />
              </button>
            </div>

            {(voucher.discount || voucher.tag) && (
              <p className="mt-1 text-xs text-[#6b7280]">
                {voucher.discount ? `Giảm ${voucher.discount}` : ""}
                {voucher.discount && voucher.tag ? " · " : ""}
                {voucher.tag ?? ""}
              </p>
            )}

            {voucher.description && (
              <p className="mt-2 text-xs text-[#6b7280]">{voucher.description}</p>
            )}

            <div className="mt-4 flex items-center justify-between rounded-lg border-2 border-dashed border-brand bg-brand/5 px-4 py-3">
              <span className="font-mono text-xl font-bold tracking-widest text-brand">
                {voucher.code}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-bold text-white"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Đã sao chép
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Sao chép mã
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 z-[300] flex -translate-x-1/2 flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="rounded-lg bg-[#1f2937] px-4 py-2 text-sm text-white shadow-lg"
          >
            {t.message}
          </div>
        ))}
      </div>
    </SiteContext.Provider>
  );
}
