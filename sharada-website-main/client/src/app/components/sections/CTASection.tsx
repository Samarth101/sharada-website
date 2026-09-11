import { ArrowRight } from "lucide-react";
import { CONTACT, CONTACT_POINTS } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GoldDivider } from "../shared/GoldDivider";
import { ParticleCanvas } from "../shared/ParticleCanvas";

export function CTASection({ onContact }: { onContact: () => void }) {
  const { ref, visible } = useScrollReveal();

  return (
    <section className="premium-section relative overflow-hidden">
      <ParticleCanvas count={50} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 48%, rgba(201,168,76,0.08), transparent 70%)",
        }}
      />

      <div ref={ref} className="premium-container relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div
            className={`transition-all duration-1000 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="section-eyebrow mb-4">Ready to Begin?</p>
            <h2 className="gold-text mb-6 font-['Cinzel'] text-4xl sm:text-5xl md:text-6xl">
              Create something extraordinary
            </h2>
            <GoldDivider className="max-w-xs" />
            <p className="section-copy mb-8 max-w-2xl">
              Whether you are an artist seeking recognition, a business needing
              digital presence, or a visionary with a story to tell, Sharada is
              your creative and strategic partner.
            </p>
            <button onClick={onContact} className="premium-button premium-button-primary group">
              Start the Conversation
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>

          <div
            className={`grid gap-5 transition-all duration-1000 delay-150 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {CONTACT_POINTS.map(({ Icon, label, value, href }) => {
                const content = (
                  <div className="premium-card flex min-h-[145px] gap-4 p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/22 bg-[#C9A84C]/7">
                      <Icon size={17} className="text-[#C9A84C]" />
                    </div>
                    <div>
                      <p className="mb-2 font-['Raleway'] text-[10px] uppercase tracking-[0.24em] text-[#C9A84C]/58">
                        {label}
                      </p>
                      <p className="font-['EB_Garamond'] text-lg leading-relaxed text-[#F0E8D5]/62">
                        {value}
                      </p>
                    </div>
                  </div>
                );

                return href ? (
                  <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={label}>{content}</div>
                );
              })}
            </div>

            <div className="premium-card overflow-hidden p-0">
              <iframe
                title="Sharada office map"
                src="https://www.google.com/maps?q=503%20Trimurti%20Heights%20Ambegaon%20BK%20Pune%20411016&output=embed"
                className="h-[300px] w-full border-0 grayscale invert-[0.9] sepia"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-['Raleway'] text-[10px] uppercase tracking-[0.18em] text-[#F0E8D5]/48">
                  Featured office: Pune, Maharashtra
                </p>
                <a href={CONTACT.maps} target="_blank" rel="noreferrer" className="font-['Raleway'] text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
