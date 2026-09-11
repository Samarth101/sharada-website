import { useEffect, useState, type FormEvent } from "react";
import { Mail, Phone, Star, X } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT, SERVICES } from "../../data/siteContent";
import { GoldDivider } from "../shared/GoldDivider";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    
    const fullMessage = `Service: ${service}\n\nProject details:\n${message}`;

    try {
      const backendUrl = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8080").replace(/\/$/, "");
      const response = await fetch(`${backendUrl}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: "Not provided",
          message: fullMessage,
          source: "contact_form"
        })
      });
      
      if (response.ok) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          onClose();
        }, 4000);
      } else {
        alert("Failed to send message. Please try again or use the email link below.");
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again or use the email link below.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 32 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-lg border border-[#C9A84C]/25 bg-[#0A0A0A] p-7 sm:p-10"
        style={{
          boxShadow: "0 0 100px rgba(201,168,76,0.18), 0 30px 80px rgba(0,0,0,0.7)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <span className="absolute top-0 left-0 w-7 h-7 border-t-2 border-l-2 border-[#C9A84C]/55" />
        <span className="absolute top-0 right-0 w-7 h-7 border-t-2 border-r-2 border-[#C9A84C]/55" />
        <span className="absolute bottom-0 left-0 w-7 h-7 border-b-2 border-l-2 border-[#C9A84C]/55" />
        <span className="absolute bottom-0 right-0 w-7 h-7 border-b-2 border-r-2 border-[#C9A84C]/55" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 rounded-full p-2 text-[#F0E8D5]/35 transition-colors duration-300 hover:text-[#C9A84C]"
          aria-label="Close contact form"
        >
          <X size={18} />
        </button>

        {sent ? (
          <div className="text-center py-10">
            <Star size={30} className="mx-auto mb-5 text-[#C9A84C]" />
            <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cinzel', serif", color: "#C9A84C" }}>
              Message Received
            </h3>
            <GoldDivider />
            <p className="text-[#F0E8D5]/55 leading-relaxed" style={{ fontFamily: "'EB Garamond', serif" }}>
              Thank you! Your message has been received. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div
                className="text-[#C9A84C]/55 text-[10px] tracking-[0.4em] uppercase mb-2"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                Get in Touch
              </div>
              <h3 id="contact-title" className="text-3xl text-[#F0E8D5]" style={{ fontFamily: "'Cinzel', serif" }}>
                Connect With Us
              </h3>
              <GoldDivider />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: "name", placeholder: "Your Name", type: "text" },
                { name: "email", placeholder: "Email Address", type: "email" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  aria-label={field.placeholder}
                  required
                  className="w-full rounded-lg border border-[#C9A84C]/18 bg-transparent px-4 py-3 text-sm text-[#F0E8D5] placeholder-[#F0E8D5]/28 transition-colors duration-300 focus:border-[#C9A84C]/50 focus:outline-none"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                />
              ))}

              <select
                name="service"
                required
                defaultValue=""
                aria-label="Select service"
                className="w-full appearance-none rounded-lg border border-[#C9A84C]/18 bg-[#080808] px-4 py-3 text-sm text-[#F0E8D5]/70 transition-colors duration-300 focus:border-[#C9A84C]/50 focus:outline-none"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <option value="" disabled>
                  Select Service
                </option>
                {SERVICES.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows={4}
                aria-label="Project details"
                className="w-full resize-none rounded-lg border border-[#C9A84C]/18 bg-transparent px-4 py-3 text-sm text-[#F0E8D5] placeholder-[#F0E8D5]/28 transition-colors duration-300 focus:border-[#C9A84C]/50 focus:outline-none"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              />

              <button
                type="submit"
                className="premium-button premium-button-primary mt-2 w-full"
              >
                Send Message
              </button>
            </form>

            <div className="mt-7 pt-6 border-t border-[#C9A84C]/10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 text-[#F0E8D5]/35 hover:text-[#C9A84C] text-xs transition-colors"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <Mail size={12} />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.phoneHref}
                className="flex items-center gap-2 text-[#F0E8D5]/35 hover:text-[#C9A84C] text-xs transition-colors"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                <Phone size={12} />
                {CONTACT.phoneLabel}
              </a>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
