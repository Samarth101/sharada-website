import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICES, type Service } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { ServiceModal } from "../overlays/ServiceModal";
import { GoldDivider } from "../shared/GoldDivider";

function ServiceCard({
  service,
  index,
  visible,
  onClick,
}: {
  service: Service;
  index: number;
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`premium-card group flex min-h-[330px] flex-col p-7 text-left transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
      aria-label={`Learn more about ${service.title}`}
    >
      <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A84C]/24 bg-[#C9A84C]/7 transition-all duration-300 group-hover:border-[#C9A84C]/58 group-hover:bg-[#C9A84C]/14">
        <service.Icon size={22} className="text-[#C9A84C] transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="mb-4 font-['Cinzel'] text-xl text-[#F0E8D5] transition-colors duration-300 group-hover:text-[#C9A84C]">
        {service.title}
      </h3>
      <p className="flex-1 font-['EB_Garamond'] text-lg leading-[1.75] text-[#F0E8D5]/55">
        {service.short}
      </p>
      <div className="mt-7 inline-flex items-center gap-2 font-['Raleway'] text-[10px] uppercase tracking-[0.24em] text-[#C9A84C]/72">
        Learn More
        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </button>
  );
}

export function ServicesSection() {
  const { ref, visible } = useScrollReveal();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="premium-section relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 78% 45% at 50% 5%, rgba(201,168,76,0.06), transparent 70%)",
        }}
      />

      <div ref={ref} className="premium-container relative z-10">
        <div
          className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
          }`}
        >
          <p className="section-eyebrow mb-3">What We Do</p>
          <h2 className="font-['Cinzel'] text-[#F0E8D5]">Integrated services for modern growth</h2>
          <GoldDivider className="mx-auto max-w-xs" />
          <p className="section-copy mx-auto max-w-2xl">
            From creative vision to measurable impact, Sharada brings media,
            marketing, technology, and brand execution into one polished system.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              visible={visible}
              onClick={() => setSelected(service)}
            />
          ))}
        </div>
      </div>

      {selected && <ServiceModal service={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
