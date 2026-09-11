import { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { type Service } from "../../data/siteContent";
import { GoldDivider } from "../shared/GoldDivider";

export function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-title"
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md overflow-hidden rounded-lg border border-[#C9A84C]/25 bg-[#0D0D0D] p-8 sm:p-10"
        style={{ boxShadow: "0 0 80px rgba(201,168,76,0.12), 0 25px 60px rgba(0,0,0,0.6)" }}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#C9A84C]/50" />
        <span className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#C9A84C]/50" />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#C9A84C]/50" />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#C9A84C]/50" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-2 text-[#F0E8D5]/35 transition-colors duration-300 hover:text-[#C9A84C]"
          aria-label="Close service details"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 border border-[#C9A84C]/30 flex items-center justify-center mb-6 bg-[#C9A84C]/5">
          <service.Icon size={22} className="text-[#C9A84C]" />
        </div>

        <h3 id="service-title" className="text-2xl mb-1" style={{ fontFamily: "'Cinzel', serif", color: "#C9A84C" }}>
          {service.title}
        </h3>
        <GoldDivider />
        <p className="text-[#F0E8D5]/70 leading-[1.9] text-base" style={{ fontFamily: "'EB Garamond', serif" }}>
          {service.detail}
        </p>
      </motion.div>
    </div>
  );
}
