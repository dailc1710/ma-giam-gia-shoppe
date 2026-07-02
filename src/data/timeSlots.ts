export type TimeSlotVoucher = {
  code: string;
  discount: string;
  description: string;
};

export type TimeSlot = {
  time: string;
  hour: number;
  label: string;
  vouchers: TimeSlotVoucher[];
};

export const timeSlots: TimeSlot[] = [
  {
    time: "00:00",
    hour: 0,
    label: "Mã toàn sàn",
    vouchers: [
      { code: "SUAT0H1", discount: "10%", description: "Đơn tối thiểu: 0đ - Giảm tối đa: 20.000đ" },
      { code: "SUAT0H2", discount: "30K", description: "Đơn tối thiểu: 300.000đ" },
    ],
  },
  {
    time: "09:00",
    hour: 9,
    label: "Freeship",
    vouchers: [
      {
        code: "FREESHIPXTRA",
        discount: "SHIP",
        description: "Đơn tối thiểu: 0đ. Giảm tối đa: 100.000đ. Áp dụng cho đơn hàng Freeship Xtra.",
      },
      { code: "FREESHIP9H", discount: "15K", description: "Đơn tối thiểu: 150.000đ" },
    ],
  },
  {
    time: "12:00",
    hour: 12,
    label: "Mã toàn sàn",
    vouchers: [
      { code: "TRUA12H", discount: "12%", description: "Đơn tối thiểu: 0đ - Giảm tối đa: 50.000đ" },
      { code: "GIAM50K", discount: "50K", description: "Đơn tối thiểu: 250.000đ" },
    ],
  },
  {
    time: "15:00",
    hour: 15,
    label: "Shopee Live",
    vouchers: [
      { code: "LIVE15H", discount: "20%", description: "Áp dụng khi mua qua Shopee Live" },
    ],
  },
  {
    time: "18:00",
    hour: 18,
    label: "Mã toàn sàn",
    vouchers: [
      { code: "TOI18H", discount: "18%", description: "Đơn tối thiểu: 0đ - Giảm tối đa: 80.000đ" },
    ],
  },
  {
    time: "20:00",
    hour: 20,
    label: "Ví Shopee",
    vouchers: [
      { code: "VISHOPEE20", discount: "20K", description: "Thanh toán qua Ví Shopee" },
    ],
  },
  {
    time: "21:00",
    hour: 21,
    label: "Shopee Mall",
    vouchers: [
      {
        code: "MALL15",
        discount: "15%",
        description: "Đơn tối thiểu: 0đ. Giảm tối đa: 50.000đ. Áp dụng cho gian hàng chính hãng.",
      },
    ],
  },
];
