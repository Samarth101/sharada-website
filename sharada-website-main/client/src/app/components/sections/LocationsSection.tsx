import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { CONTACT, LOCATIONS } from "../../data/siteContent";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { GoldDivider } from "../shared/GoldDivider";
import officeWorkspace from "../../../imports/phase-one/phase-one-office-workspace.jpg";

export function LocationsSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="locations" className="premium-section relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 75% 45% at 50% 45%, rgba(201,168,76,0.055), transparent 72%)",
        }}
      />

      <div ref={ref} className="premium-container relative z-10">
        <div
          className={`mx-auto mb-14 max-w-3xl text-center transition-all duration-1000 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-14"
          }`}
        >
          <p className="section-eyebrow mb-3">Where We Operate</p>
          <h2 className="font-['Cinzel'] text-[#F0E8D5]">Our Presence</h2>
          <GoldDivider className="mx-auto max-w-xs" />
          <p className="section-copy mx-auto max-w-2xl">
            Currently working from Pune, with active company presence across Pune,
            Hyderabad, Nanded, and Mumbai.
          </p>
        </div>

        <div
          className={`mb-6 grid overflow-hidden rounded-lg border border-[#C9A84C]/16 bg-[#0D0D0D] shadow-[0_30px_90px_rgba(0,0,0,0.3)] transition-all duration-1000 delay-100 lg:grid-cols-[1.05fr_0.95fr] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <div className="relative min-h-[320px] overflow-hidden">
            <img
              src={officeWorkspace}
              alt="Sharada office workspace"
              className="h-full w-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-transparent to-transparent" />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="section-eyebrow mb-3">Featured Office</p>
            <h3 className="mb-4 font-['Cinzel'] text-3xl text-[#F0E8D5]">Mauli Residency, Pune</h3>
            <p className="section-copy mb-6">
              The Pune workspace near Warje, Jakat Naka and Karvenagar anchors
              current operations, team-building, interviews, creative planning,
              and early collaboration.
            </p>
            <a href={CONTACT.maps} target="_blank" rel="noreferrer" className="premium-button premium-button-primary w-fit">
              Open Google Maps
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {LOCATIONS.map((location, index) => (
            <article
              key={location.city}
              className={`premium-card flex min-h-[390px] flex-col p-7 transition-all duration-700 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 90 + 180}ms` }}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="font-['Raleway'] text-[10px] uppercase tracking-[0.3em] text-[#C9A84C]/58">
                    {location.label}
                  </p>
                  <h3 className="mt-2 font-['Cinzel'] text-3xl text-[#F0E8D5]">{location.city}</h3>
                  <p className="font-['Raleway'] text-[10px] uppercase tracking-[0.24em] text-[#C9A84C]/48">
                    {location.state}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#C9A84C]/22 bg-[#C9A84C]/7">
                  <MapPin size={17} className="text-[#C9A84C]" />
                </div>
              </div>
              <p className="mb-6 flex-1 font-['EB_Garamond'] text-lg leading-[1.75] text-[#F0E8D5]/55">
                {location.desc}
              </p>
              <div className="space-y-3 border-t border-[#C9A84C]/12 pt-5">
                <p className="flex gap-3 font-['EB_Garamond'] text-base leading-relaxed text-[#F0E8D5]/58">
                  <MapPin size={16} className="mt-1 shrink-0 text-[#C9A84C]/75" />
                  {location.address}
                </p>
                <p className="flex gap-3 font-['Raleway'] text-xs uppercase tracking-[0.12em] text-[#F0E8D5]/52">
                  <Phone size={15} className="shrink-0 text-[#C9A84C]/75" />
                  {location.phone}
                </p>
                <p className="flex gap-3 font-['Raleway'] text-xs uppercase tracking-[0.12em] text-[#F0E8D5]/52">
                  <Clock size={15} className="shrink-0 text-[#C9A84C]/75" />
                  {location.hours}
                </p>
              </div>
              <a
                href={CONTACT.maps}
                target="_blank"
                rel="noreferrer"
                className="premium-button premium-button-secondary mt-6 w-full"
              >
                Google Maps
                <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
