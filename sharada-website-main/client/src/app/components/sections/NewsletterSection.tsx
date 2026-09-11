import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CONTACT } from "../../data/siteContent";

export function NewsletterSection() {
  const [emailDraftOpened, setEmailDraftOpened] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const subject = encodeURIComponent("Newsletter signup request");
    const body = encodeURIComponent(`Please add this email address to the Sharada newsletter:\n\n${email}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setEmailDraftOpened(true);
  };

  return (
    <section className="px-6 pb-24">
      <div className="premium-container">
        <div className="premium-card grid gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="section-eyebrow mb-3">Newsletter</p>
            <h2 className="mb-4 font-['Cinzel'] text-3xl text-[#F0E8D5] sm:text-4xl">
              Notes on launches, media, and digital growth
            </h2>
            <p className="section-copy max-w-2xl">
              Receive occasional insights from Sharada on brand building, creative
              promotion, and technology-led growth.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A84C]/60" />
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="h-14 w-full rounded-full border border-[#C9A84C]/18 bg-black/20 pl-11 pr-5 font-['Raleway'] text-sm text-[#F0E8D5] placeholder:text-[#F0E8D5]/30 focus:border-[#C9A84C]/55 focus:outline-none"
              />
            </div>
            <button type="submit" className="premium-button premium-button-primary whitespace-nowrap">
              {emailDraftOpened ? "Email Draft Opened" : "Join"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
