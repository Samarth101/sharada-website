import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { CONTACT } from "../../data/siteContent";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noreferrer"
        className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#0D0D0D]/88 text-[#C9A84C] shadow-[0_18px_45px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/70 hover:bg-[#C9A84C] hover:text-black"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={20} className="transition-transform duration-300 group-hover:scale-110" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A84C]/30 bg-[#0D0D0D]/88 text-[#C9A84C] shadow-[0_18px_45px_rgba(0,0,0,0.4)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/70 hover:bg-[#C9A84C] hover:text-black ${
          showTop ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 translate-y-2"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={19} />
      </button>
    </div>
  );
}
