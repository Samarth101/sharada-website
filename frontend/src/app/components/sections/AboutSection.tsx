import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GoldDivider } from "../shared/GoldDivider";

const timeline = [
  { year: "01", title: "Creative foundation", text: "A vision to unite art, storytelling, marketing, and modern technology." },
  { year: "02", title: "Studio expansion", text: "Growing operations, creative production, and partnerships across Pune and Maharashtra." },
  { year: "03", title: "Integrated growth", text: "A multidisciplinary studio model for creators, founders, and brands." },
];

const principles = ["Story-first strategy", "Premium execution", "Technology-enabled growth"];

export function AboutSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="premium-section overflow-hidden">
      <div className="absolute inset-0 ambient-grid opacity-25" aria-hidden="true" />
      <div ref={ref} className="premium-container relative z-10">
        <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <p className="section-eyebrow mb-3">Our Story</p>
            <h2 className="font-['Cinzel'] text-[#F0E8D5]">A creative company built for modern visibility</h2>
            <GoldDivider className="max-w-sm" />
            <p className="section-copy mb-8">
              Sharada Prod. & Media Mgmt. helps artists, authors, filmmakers,
              musicians, businesses, and brands build meaningful audience connections
              through creative storytelling, strategic marketing, and technology.
            </p>
            <Link to="/services" className="premium-button premium-button-secondary group">
              Explore Services
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div
            className={`grid gap-5 transition-all duration-1000 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <article className="premium-card p-7 sm:p-9">
              <p className="font-['EB_Garamond'] text-xl leading-[1.85] text-[#F0E8D5]/76">
                Founded with the belief that great ideas deserve great visibility,
                Sharada works across content production, digital promotion, artist
                development, brand building, websites, apps, and AI-powered solutions.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {principles.map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-full border border-[#C9A84C]/14 bg-[#C9A84C]/5 px-4 py-3">
                    <CheckCircle2 size={15} className="shrink-0 text-[#C9A84C]" />
                    <span className="font-['Raleway'] text-[10px] uppercase tracking-[0.14em] text-[#F0E8D5]/64">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <div className="grid gap-5 md:grid-cols-3">
              {timeline.map((item, index) => (
                <article
                  key={item.title}
                  className="premium-card min-h-[230px] p-6"
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="mb-6 font-['Cinzel'] text-4xl text-[#C9A84C]/82">{item.year}</div>
                  <h3 className="mb-3 font-['Cinzel'] text-xl text-[#F0E8D5]">{item.title}</h3>
                  <p className="font-['EB_Garamond'] text-base leading-[1.75] text-[#F0E8D5]/52">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`mt-12 rounded-lg border border-[#C9A84C]/14 bg-[#C9A84C]/[0.035] p-7 text-center transition-all duration-1000 delay-300 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="mx-auto max-w-4xl font-['EB_Garamond'] text-lg leading-[1.85] text-[#F0E8D5]/64">
            Operating from Maharashtra with expanding activities in Pune, Hyderabad,
            and other creative hubs, Sharada is evolving into a multidisciplinary
            organization where media, marketing, and technology work together to
            create measurable results.
          </p>
        </div>
      </div>
    </section>
  );
}
