type Step = { title: string; description: string };
type Faq = { question: string; answer: string };

export default function GuideContent({
  steps,
  faqs,
}: {
  steps: Step[];
  faqs: Faq[];
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="flex gap-4 rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {i + 1}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1c1b1b]">{step.title}</h3>
              <p className="mt-1 text-sm text-[#6b7280]">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-base font-bold text-brand uppercase">
          Câu hỏi thường gặp
        </h2>
        <div className="flex flex-col divide-y divide-[#f3f4f6] rounded-lg border border-[#e5e7eb] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          {faqs.map((faq) => (
            <div key={faq.question} className="p-4">
              <h3 className="text-sm font-bold text-[#1c1b1b]">{faq.question}</h3>
              <p className="mt-1 text-sm text-[#6b7280]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
