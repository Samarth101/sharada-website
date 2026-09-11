import { ChevronDown } from "lucide-react";
import { FAQS } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GoldDivider } from "../shared/GoldDivider";

export function FAQSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="premium-section">
      <div ref={ref} className="premium-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div
          className={`transition-all duration-1000 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <p className="section-eyebrow mb-3">FAQ</p>
          <h2 className="font-['Cinzel'] text-[#F0E8D5]">Clear answers before we begin</h2>
          <GoldDivider className="max-w-xs" />
          <p className="section-copy max-w-xl">
            A few practical answers for creators, founders, and teams exploring a
            Sharada collaboration.
          </p>
        </div>

        <div
          className={`space-y-4 transition-all duration-1000 delay-150 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {FAQS.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-[#C9A84C]/14 bg-[#0D0D0D]/86 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition-all duration-300 open:border-[#C9A84C]/35"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-['Raleway'] text-sm font-semibold uppercase tracking-[0.16em] text-[#F0E8D5]/78">
                {item.question}
                <ChevronDown className="h-5 w-5 shrink-0 text-[#C9A84C] transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 font-['EB_Garamond'] text-lg leading-[1.8] text-[#F0E8D5]/58">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
