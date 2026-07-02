"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, UserRound } from "lucide-react";
import { chatbotRules, chatbotFallback, chatbotGreeting } from "@/data/chatbot";

type Message = { from: "bot" | "user"; text: string };

function getReply(userText: string) {
  const text = userText.toLowerCase();
  let bestReply: string | null = null;
  let bestKeywordLength = 0;

  for (const rule of chatbotRules) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword) && keyword.length > bestKeywordLength) {
        bestKeywordLength = keyword.length;
        bestReply = rule.reply;
      }
    }
  }

  return bestReply ?? chatbotFallback;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: chatbotGreeting },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing, open]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getReply(text) }]);
      setTyping(false);
    }, 600);
  };

  return (
    <div className="fixed right-4 bottom-4 z-[90] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[420px] w-[320px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white shadow-xl">
          <div className="flex items-center justify-between bg-brand px-4 py-3">
            <div className="flex items-center gap-2">
              <Bot className="size-4 text-white" />
              <span className="text-sm font-bold text-white">Trợ lý Mã Giảm Giá</span>
            </div>
            <button
              type="button"
              aria-label="Đóng chat"
              onClick={() => setOpen(false)}
              className="text-white/90"
            >
              <X className="size-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3">
            <div className="flex flex-col gap-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${
                    m.from === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
                    {m.from === "bot" ? (
                      <Bot className="size-3.5 text-brand" />
                    ) : (
                      <UserRound className="size-3.5 text-[#6b7280]" />
                    )}
                  </div>
                  <p
                    className={`max-w-[220px] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                      m.from === "user"
                        ? "bg-brand text-white"
                        : "bg-[#f3f4f6] text-[#1c1b1b]"
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#f3f4f6]">
                    <Bot className="size-3.5 text-brand" />
                  </div>
                  <p className="rounded-lg bg-[#f3f4f6] px-3 py-2 text-xs text-[#9ca3af]">
                    Đang trả lời...
                  </p>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSend} className="flex gap-2 border-t border-[#f3f4f6] p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi..."
              className="min-w-0 flex-1 rounded-lg border border-[#e5e7eb] px-3 py-2 text-xs outline-none focus:border-brand"
            />
            <button
              type="submit"
              aria-label="Gửi"
              className="flex shrink-0 items-center justify-center rounded-lg bg-brand px-3 text-white"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Đóng trợ lý ảo" : "Mở trợ lý ảo"}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-transform hover:scale-105"
      >
        {open ? <X className="size-6" /> : <Bot className="size-6" />}
      </button>
    </div>
  );
}
