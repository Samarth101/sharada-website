import { useEffect, useState } from "react";
import { STATS } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";

function Counter({ value, active }: { value: number; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let frame = 0;
    const totalFrames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(value * progress));
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 22);

    return () => window.clearInterval(timer);
  }, [active, value]);

  return <>{count}</>;
}

export function StatsSection() {
  const { ref, visible } = useScrollReveal(0.18);

  return (
    <section className="premium-section py-20">
      <div ref={ref} className="premium-container">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <article
              key={stat.label}
              className={`premium-card min-h-[190px] p-7 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <div className="mb-5 h-px w-12 bg-[#C9A84C]/45" />
              <div className="mb-2 font-['Cinzel'] text-5xl font-semibold text-[#C9A84C]">
                <Counter value={stat.value} active={visible} />
                {stat.suffix}
              </div>
              <h3 className="mb-3 font-['Raleway'] text-xs uppercase tracking-[0.24em] text-[#F0E8D5]/78">
                {stat.label}
              </h3>
              <p className="font-['EB_Garamond'] text-base leading-relaxed text-[#F0E8D5]/48">
                {stat.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
