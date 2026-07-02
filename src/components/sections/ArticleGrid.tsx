import Image from "next/image";
import { CalendarDays } from "lucide-react";

type Article = {
  image: string;
  title: string;
  excerpt: string;
  date: string;
};

export default function ArticleGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((a) => (
        <article
          key={a.title}
          className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
        >
          <div className="relative h-[180px] w-full bg-brand/10">
            <Image src={a.image} alt={a.title} fill className="object-cover" />
          </div>
          <div className="flex flex-col gap-2 px-4 pt-4 pb-4">
            <h3 className="text-sm font-bold text-[#1c1b1b]">{a.title}</h3>
            <p className="text-xs text-[#6b7280]">{a.excerpt}</p>
            <div className="flex items-center gap-2 pt-2">
              <CalendarDays className="size-[10px] text-[#9ca3af]" />
              <span className="text-[10px] text-[#9ca3af]">{a.date}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
