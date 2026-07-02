import {
  BookOpen,
  Store,
  Tag,
  MapPin,
  Sparkles,
  Ticket,
  CheckCircle,
  ShoppingBag,
  Globe,
  Truck,
  Circle,
} from "lucide-react";

export const navLinks = [
  { label: "Trang Chủ", href: "/", icon: null },
  { label: "Hướng Dẫn Mua Hàng", href: "/huong-dan-mua-hang", icon: BookOpen },
  { label: "Hướng Dẫn Bán Hàng", href: "/huong-dan-ban-hang", icon: Store },
  { label: "Tin Khuyến Mãi", href: "/tin-khuyen-mai", icon: Tag },
  {
    label: "Kinh Nghiệm - Mẹo - Thủ Thuật",
    href: "/kinh-nghiem-meo-thu-thuat",
    icon: MapPin,
  },
];

export const categories = [
  { label: "Tất cả", icon: Sparkles },
  { label: "Toàn Sàn", icon: Store },
  { label: "Voucher Xtra", icon: Ticket },
  { label: "Chọn Lọc", icon: CheckCircle },
  { label: "Shop nổi bật", icon: ShoppingBag },
  { label: "Quốc tế", icon: Globe },
  { label: "Freeship", icon: Truck },
  { label: "Shopee Mall", icon: Circle },
];
