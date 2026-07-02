import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6b7280]">
      <Link href="/" className="hover:text-brand">
        Trang Chủ
      </Link>
      <ChevronRight className="size-3" />
      <span className="font-semibold text-[#1c1b1b]">{current}</span>
    </nav>
  );
}
