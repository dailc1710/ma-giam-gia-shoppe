"use client";

import { useEffect, useState } from "react";
import { Clock, X } from "lucide-react";
import { timeSlots, type TimeSlot } from "@/data/timeSlots";
import { useSite } from "@/components/providers";

function getActiveIndex(now: Date) {
  const hour = now.getHours();
  let idx = 0;
  for (let i = 0; i < timeSlots.length; i++) {
    if (timeSlots[i].hour <= hour) idx = i;
  }
  return idx;
}

function getNextSlotStart(now: Date, activeIndex: number) {
  const nextIndex = (activeIndex + 1) % timeSlots.length;
  const next = new Date(now);
  next.setHours(timeSlots[nextIndex].hour, 0, 0, 0);
  if (nextIndex <= activeIndex) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

function statusFor(index: number, activeIndex: number) {
  if (index === activeIndex) return "Đang diễn ra";
  if (index < activeIndex) return "Đã kết thúc";
  return "Sắp mở";
}

export default function FlashSaleTimeline() {
  const { openVoucherModal } = useSite();
  const [now, setNow] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [showAllModal, setShowAllModal] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- clock must tick immediately on mount, not one second late
    setNow(new Date());
    return () => clearInterval(id);
  }, []);

  const activeIndex = now ? getActiveIndex(now) : 1;
  const countdown =
    now != null ? formatCountdown(getNextSlotStart(now, activeIndex).getTime() - now.getTime()) : null;

  const selectedSlotIndex = selectedSlot
    ? timeSlots.findIndex((s) => s.time === selectedSlot.time)
    : -1;
  const selectedSlotStatus =
    selectedSlotIndex >= 0 ? statusFor(selectedSlotIndex, activeIndex) : null;
  const selectedSlotIsActive = selectedSlotStatus === "Đang diễn ra";

  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f3f4f6] px-3 pt-3 pb-[13px]">
        <div className="flex items-center gap-2">
          <Clock className="size-[15px] text-brand" />
          <h2 className="text-sm font-bold text-brand">KHUNG GIỜ SĂN MÃ HÔM NAY</h2>
          {countdown && (
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
              Khung tiếp theo sau {countdown}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowAllModal(true)}
          className="text-[11px] font-bold text-brand"
        >
          Xem tất cả khung giờ →
        </button>
      </div>
      <div className="flex">
        {timeSlots.map((slot, i) => {
          const status = statusFor(i, activeIndex);
          const isActive = i === activeIndex;
          return (
            <button
              key={slot.time}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`flex flex-1 flex-col items-center gap-1 py-4 transition-colors hover:bg-[#fef2f2]/60 ${
                i > 0 ? "border-l border-[#f3f4f6]" : ""
              } ${isActive ? "bg-[#fef2f2]" : ""}`}
            >
              <span
                className={`text-sm font-bold ${isActive ? "text-brand" : "text-[#1c1b1b]"}`}
              >
                {slot.time}
              </span>
              <span
                className={`text-[9px] ${
                  isActive ? "font-bold text-brand" : "text-[#6b7280]"
                }`}
              >
                {status}
              </span>
              <span className={`text-[9px] ${isActive ? "text-brand" : "text-[#9ca3af]"}`}>
                {slot.label}
              </span>
            </button>
          );
        })}
      </div>

      {showAllModal && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowAllModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand uppercase">
                Lịch khung giờ săn mã hôm nay
              </h3>
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setShowAllModal(false)}
                className="text-[#9ca3af]"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-3 flex flex-col divide-y divide-[#f3f4f6]">
              {timeSlots.map((slot, i) => {
                const status = statusFor(i, activeIndex);
                const isActive = i === activeIndex;
                return (
                  <li key={slot.time}>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAllModal(false);
                        setSelectedSlot(slot);
                      }}
                      className="flex w-full items-center justify-between py-3 text-left"
                    >
                      <span className="flex flex-col">
                        <span
                          className={`text-sm font-bold ${
                            isActive ? "text-brand" : "text-[#1c1b1b]"
                          }`}
                        >
                          {slot.time} · {slot.label}
                        </span>
                        <span className="text-xs text-[#9ca3af]">
                          {slot.vouchers.length} mã giảm giá
                        </span>
                      </span>
                      <span
                        className={`text-[11px] font-bold ${
                          isActive ? "text-brand" : "text-[#9ca3af]"
                        }`}
                      >
                        {status}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {selectedSlot && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setSelectedSlot(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand uppercase">
                {selectedSlot.time} · {selectedSlot.label}
              </h3>
              <button
                type="button"
                aria-label="Đóng"
                onClick={() => setSelectedSlot(null)}
                className="text-[#9ca3af]"
              >
                <X className="size-5" />
              </button>
            </div>
            {!selectedSlotIsActive && (
              <p className="mt-1 text-xs text-[#9ca3af]">
                {selectedSlotStatus === "Sắp mở"
                  ? `Khung giờ này chưa mở. Quay lại lúc ${selectedSlot.time} để lấy mã.`
                  : "Khung giờ này đã kết thúc cho hôm nay."}
              </p>
            )}
            <div className="mt-3 flex flex-col gap-3">
              {selectedSlot.vouchers.map((v) => (
                <div
                  key={v.code}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#e5e7eb] p-3"
                >
                  <div>
                    <p className="text-sm font-bold text-brand">Giảm {v.discount}</p>
                    <p className="text-xs text-[#6b7280]">{v.description}</p>
                  </div>
                  <button
                    type="button"
                    disabled={!selectedSlotIsActive}
                    onClick={() =>
                      openVoucherModal({
                        code: v.code,
                        discount: v.discount,
                        tag: selectedSlot.label,
                        description: v.description,
                      })
                    }
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold ${
                      selectedSlotIsActive
                        ? "bg-brand text-white"
                        : "cursor-not-allowed bg-[#f3f4f6] text-[#9ca3af]"
                    }`}
                  >
                    {selectedSlotIsActive
                      ? "Lấy mã"
                      : selectedSlotStatus === "Sắp mở"
                        ? "Chưa mở"
                        : "Đã hết hạn"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
