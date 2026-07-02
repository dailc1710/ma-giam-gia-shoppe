"use client";

import { useState } from "react";
import { MessageSquareText, Star, UserRound, Reply as ReplyIcon } from "lucide-react";
import { reviews as initialReviews } from "@/data/reviews";
import { useSite } from "@/components/providers";

type Reply = {
  name: string;
  time: string;
  comment: string;
  isAdmin?: boolean;
};

type Review = {
  name: string;
  time: string;
  rating: number;
  comment: string;
  replies: Reply[];
};

export default function Reviews() {
  const { showToast } = useSite();
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const [replyingIndex, setReplyingIndex] = useState<number | null>(null);
  const [replyName, setReplyName] = useState("");
  const [replyComment, setReplyComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    setReviews((prev) => [
      { name: name.trim(), time: "Vừa xong", rating, comment: comment.trim(), replies: [] },
      ...prev,
    ]);
    setName("");
    setComment("");
    setRating(5);
    setFormOpen(false);
    showToast("Cảm ơn bạn đã gửi đánh giá!");
  };

  const openReplyForm = (index: number) => {
    setReplyingIndex(index === replyingIndex ? null : index);
    setReplyName("");
    setReplyComment("");
  };

  const handleReplySubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    if (!replyName.trim() || !replyComment.trim()) return;
    setReviews((prev) =>
      prev.map((r, i) =>
        i === index
          ? {
              ...r,
              replies: [
                ...r.replies,
                { name: replyName.trim(), time: "Vừa xong", comment: replyComment.trim() },
              ],
            }
          : r
      )
    );
    setReplyingIndex(null);
    setReplyName("");
    setReplyComment("");
    showToast("Đã gửi phản hồi!");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <MessageSquareText className="size-5 text-brand" />
        <h2 className="text-base font-bold text-brand uppercase">
          BÌNH LUẬN & ĐÁNH GIÁ
        </h2>
      </div>
      <div className="flex flex-col gap-8 rounded-xl border border-[#e5e7eb] bg-white p-[25px] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-8">
          {reviews.map((r, i) => (
            <div
              key={`${r.name}-${r.time}-${i}`}
              className={`flex gap-4 ${
                i < reviews.length - 1 ? "border-b border-[#f3f4f6] pb-[25px]" : ""
              }`}
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6]">
                <UserRound className="size-4 text-[#9ca3af]" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#1f2937]">{r.name}</span>
                  <span className="text-[11px] text-[#9ca3af]">{r.time}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className={`size-[11px] ${
                        starIndex < r.rating
                          ? "fill-brand text-brand"
                          : "fill-[#e5e7eb] text-[#e5e7eb]"
                      }`}
                    />
                  ))}
                </div>
                <p className="pt-1 text-sm text-[#4b5563]">{r.comment}</p>

                <button
                  type="button"
                  onClick={() => openReplyForm(i)}
                  className="mt-1 flex w-fit items-center gap-1 text-xs font-bold text-[#6b7280] hover:text-brand"
                >
                  <ReplyIcon className="size-3" />
                  Trả lời
                </button>

                {r.replies.length > 0 && (
                  <div className="mt-2 flex flex-col gap-3 border-l-2 border-[#f3f4f6] pl-4">
                    {r.replies.map((reply, ri) => (
                      <div key={`${reply.name}-${reply.time}-${ri}`} className="flex gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-[#f3f4f6]">
                          <UserRound className="size-3 text-[#9ca3af]" />
                        </div>
                        <div className="flex flex-1 flex-col gap-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#1f2937]">
                              {reply.name}
                            </span>
                            {reply.isAdmin && (
                              <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold text-brand">
                                Admin
                              </span>
                            )}
                            <span className="text-[10px] text-[#9ca3af]">{reply.time}</span>
                          </div>
                          <p className="text-xs text-[#4b5563]">{reply.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {replyingIndex === i && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, i)}
                    className="mt-2 flex flex-col gap-2 border-l-2 border-[#f3f4f6] pl-4"
                  >
                    <input
                      type="text"
                      value={replyName}
                      onChange={(e) => setReplyName(e.target.value)}
                      placeholder="Tên của bạn"
                      required
                      className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs outline-none focus:border-brand"
                    />
                    <textarea
                      value={replyComment}
                      onChange={(e) => setReplyComment(e.target.value)}
                      placeholder="Viết phản hồi..."
                      required
                      rows={2}
                      className="resize-none rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs outline-none focus:border-brand"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="rounded-lg bg-brand px-3 py-1.5 text-xs font-bold text-white"
                      >
                        Gửi phản hồi
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingIndex(null)}
                        className="rounded-lg border border-[#e5e7eb] px-3 py-1.5 text-xs font-bold text-[#4b5563]"
                      >
                        Hủy
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-[#f3f4f6] pt-[25px]">
          {formOpen ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
                required
                className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  const filled = (hoverRating || rating) >= starValue;
                  return (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${starValue} sao`}
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        className={`size-5 ${
                          filled
                            ? "fill-brand text-brand"
                            : "fill-[#e5e7eb] text-[#e5e7eb]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn..."
                required
                rows={3}
                className="resize-none rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm outline-none focus:border-brand"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-brand py-3 text-sm font-bold text-white"
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-lg border border-[#e5e7eb] px-4 py-3 text-sm font-bold text-[#4b5563]"
                >
                  Hủy
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className="w-full rounded-lg border-2 border-brand py-3.5 text-sm font-bold text-brand"
            >
              Viết đánh giá của bạn
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
