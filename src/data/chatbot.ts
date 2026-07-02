export const chatbotRules: { keywords: string[]; reply: string }[] = [
  {
    keywords: ["mã", "voucher", "giảm giá", "coupon"],
    reply:
      "Bạn có thể xem các mã giảm giá mới nhất ở đầu trang, lọc theo danh mục Toàn Sàn, Freeship, Voucher Xtra, Shopee Mall... Bấm \"Lấy mã\" trên voucher để sao chép mã.",
  },
  {
    keywords: ["khung giờ", "giờ vàng", "flash sale"],
    reply:
      "Khung giờ săn mã hôm nay được cập nhật theo thời gian thực. Bấm vào từng khung giờ để xem các mã áp dụng riêng, hoặc bấm \"Xem tất cả khung giờ\" để xem lịch cả ngày.",
  },
  {
    keywords: ["freeship", "vận chuyển", "ship"],
    reply:
      "Mã Freeship giúp giảm phí vận chuyển. Bạn có thể tìm trong mục \"Freeship\" ở Danh mục, hoặc khung giờ 09:00 đang có mã FREESHIPXTRA.",
  },
  {
    keywords: ["sản phẩm", "deal", "mua gì"],
    reply:
      "Xem mục \"Top Sản Phẩm Nổi Bật\" hoặc bấm \"Xem tất cả sản phẩm\" để xem toàn bộ deal đang giảm giá theo từng ngành hàng.",
  },
  {
    keywords: ["đánh giá", "bình luận", "review"],
    reply:
      "Bạn có thể xem và viết đánh giá ở mục \"Bình Luận & Đánh Giá\" cuối trang, hoặc trả lời bình luận của người khác.",
  },
  {
    keywords: ["liên hệ", "hỗ trợ", "support"],
    reply:
      "Bạn có thể để lại đánh giá hoặc câu hỏi ở mục Bình Luận & Đánh Giá, đội ngũ Mã Giảm Giá sẽ phản hồi sớm nhất.",
  },
  {
    keywords: ["cảm ơn", "cám ơn", "thanks"],
    reply: "Không có gì! Chúc bạn săn được nhiều mã hời trên Mã Giảm Giá.",
  },
  {
    keywords: ["chào", "hi", "hello"],
    reply: "Chào bạn! Mình có thể giúp gì về mã giảm giá, khung giờ săn mã hay sản phẩm hôm nay?",
  },
];

export const chatbotFallback =
  "Cảm ơn câu hỏi của bạn! Bạn có thể hỏi mình về mã giảm giá, khung giờ săn mã, hoặc sản phẩm đang hot hôm nay.";

export const chatbotGreeting =
  "Xin chào! Mình là trợ lý ảo của Mã Giảm Giá. Bạn cần tìm mã giảm giá, khung giờ săn mã hay sản phẩm nào hôm nay?";
