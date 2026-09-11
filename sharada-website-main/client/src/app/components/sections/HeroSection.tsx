import { Link } from "react-router";
import { ArrowRight, ChevronDown, MapPin, PlayCircle } from "lucide-react";
import { motion } from "motion/react";
import { STARTUP_FEATURES } from "../../data/siteContent";
import { GoldDivider } from "../shared/GoldDivider";
import { ParticleCanvas } from "../shared/ParticleCanvas";

export function HeroSection({ onContact }: { onContact: () => void }) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-32"
    >
      <ParticleCanvas count={130} />
      <div className="absolute inset-0 ambient-grid opacity-45" aria-hidden="true" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 48% at 50% 34%, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.045) 38%, transparent 72%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mx-auto mb-6 inline-flex rounded-full border border-[#C9A84C]/18 bg-[#C9A84C]/6 px-4 py-2 font-['Raleway'] text-[10px] uppercase tracking-[0.36em] text-[#C9A84C]/76 backdrop-blur-md">
            Production - Media - Marketing - Technology
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="gold-text mb-7 font-['Cinzel'] font-bold tracking-normal"
        >
          SHARADA
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.56 }}
          className="mb-4"
        >
          <p className="font-['EB_Garamond'] text-lg italic text-[#C9A84C]/76 sm:text-xl">
            Where art, creativity, and technology unite.
          </p>
          <p className="mt-2 font-['Raleway'] text-[11px] uppercase tracking-[0.24em] text-[#F0E8D5]/42">
            "When art creativity and technology unites brilliance emerges"
          </p>
        </motion.div>

        <GoldDivider className="mx-auto my-7 max-w-xs" />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.72 }}
          className="mx-auto mb-9 max-w-3xl font-['EB_Garamond'] text-lg leading-[1.85] text-[#F0E8D5]/70 sm:text-xl md:text-2xl"
        >
          A premium creative, media, marketing, and technology partner for artists,
          filmmakers, authors, musicians, startups, and growth-minded brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mx-auto mb-10 grid max-w-4xl gap-3 sm:grid-cols-3"
        >
          {STARTUP_FEATURES.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-2 rounded-full border border-[#C9A84C]/14 bg-black/28 px-4 py-3 text-[#F0E8D5]/64 backdrop-blur-md"
            >
              <Icon size={15} className="text-[#C9A84C]" />
              <span className="font-['Raleway'] text-[10px] uppercase tracking-[0.16em]">
                {label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.04 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button onClick={onContact} className="premium-button premium-button-primary group">
            Begin Your Journey
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
          <Link to="/services" className="premium-button premium-button-secondary group">
            <PlayCircle size={16} className="transition-transform duration-300 group-hover:scale-110" />
            Explore Services
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25 }}
          className="mt-10 flex items-center justify-center gap-2 text-[#F0E8D5]/34"
        >
          <MapPin size={11} className="text-[#C9A84C]/50" />
          <span className="font-['Raleway'] text-[10px] uppercase tracking-[0.28em]">
            Nanded - Pune - Hyderabad
          </span>
        </motion.div>
      </div>

      <Link
        to="/about"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[#C9A84C]/42 transition-colors duration-300 hover:text-[#C9A84C]/72"
        aria-label="Go to about page"
      >
        <span className="font-['Raleway'] text-[9px] uppercase tracking-[0.4em]">Scroll</span>
        <ChevronDown size={14} className="animate-bounce" />
      </Link>
    </section>
  );
}
