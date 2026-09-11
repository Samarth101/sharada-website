import { Star } from "lucide-react";
import { TESTIMONIALS } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GoldDivider } from "../shared/GoldDivider";

export function TestimonialsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="premium-section overflow-hidden">
      <div className="absolute inset-0 ambient-grid opacity-35" aria-hidden="true" />
      <div ref={ref} className="premium-container relative z-10">
        <div
          className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
          }`}
        >
          <p className="section-eyebrow mb-3">Client Voices</p>
          <h2 className="font-['Cinzel'] text-[#F0E8D5]">Trusted by ambitious creators</h2>
          <GoldDivider className="mx-auto max-w-xs" />
          <p className="section-copy mx-auto max-w-2xl">
            Premium execution is felt in the details: clarity, responsiveness, creative
            judgment, and work that moves audiences.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item, index) => (
            <article
              key={item.name}
              className={`premium-card flex min-h-[360px] flex-col p-7 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-6 flex items-center gap-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-14 w-14 rounded-full border border-[#C9A84C]/30 object-cover"
                  loading="lazy"
                />
                <div>
                  <h3 className="font-['Cinzel'] text-lg text-[#F0E8D5]">{item.name}</h3>
                  <p className="font-['Raleway'] text-[11px] uppercase tracking-[0.18em] text-[#C9A84C]/58">
                    {item.position}
                  </p>
                </div>
              </div>
              <div className="mb-5 flex gap-1 text-[#C9A84C]" aria-label={`${item.rating} star rating`}>
                {Array.from({ length: item.rating }).map((_, starIndex) => (
                  <Star key={starIndex} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="flex-1 font-['EB_Garamond'] text-lg leading-[1.85] text-[#F0E8D5]/66">
                "{item.review}"
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
