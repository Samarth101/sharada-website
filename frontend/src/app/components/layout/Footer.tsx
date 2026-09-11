import { Linkedin, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router";
import logo from "../../../imports/SHARADA_TECH_LOGO.jpeg";
import { CONTACT, NAV_LINKS, SERVICES } from "../../data/siteContent";
import { GoldDivider } from "../shared/GoldDivider";

const socials = [
  { label: "LinkedIn", Icon: Linkedin, href: CONTACT.linkedin },
  { label: "WhatsApp", Icon: MessageCircle, href: CONTACT.whatsapp },
];

export function Footer() {
  return (
    <footer className="border-t border-[#C9A84C]/12 bg-[#050505] px-6 pt-20 pb-10">
      <div className="premium-container">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.7fr_0.9fr_0.9fr]">
          <div>
            <Link to="/" className="mb-6 flex items-center gap-3" aria-label="Sharada home">
              <img
                src={logo}
                alt="Sharada"
                className="h-14 w-14 rounded-full object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgba(201,168,76,0.24))" }}
                loading="lazy"
              />
              <div className="leading-none">
                <div className="font-['Cinzel'] text-sm tracking-[0.25em] text-[#C9A84C]">
                  SHARADA
                </div>
                <div className="mt-1 font-['Raleway'] text-[9px] uppercase tracking-[0.2em] text-[#F0E8D5]/40">
                  Prod. & Media Mgmt.
                </div>
              </div>
            </Link>
            <p className="mb-5 max-w-sm font-['EB_Garamond'] text-lg leading-[1.8] text-[#F0E8D5]/54">
              A premium creative, media, marketing, and technology partner helping
              creators and brands turn ideas into visible, memorable experiences.
            </p>
            <div className="flex gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A84C]/18 text-[#C9A84C]/72 transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A84C]/55 hover:bg-[#C9A84C] hover:text-black"
                  aria-label={label}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-['Raleway'] text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]/62">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-['Raleway'] text-sm text-[#F0E8D5]/42 transition-colors duration-300 hover:text-[#C9A84C]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/contact"
                  className="font-['Raleway'] text-sm text-[#F0E8D5]/42 transition-colors duration-300 hover:text-[#C9A84C]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-['Raleway'] text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]/62">
              Services
            </h3>
            <ul className="grid gap-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="font-['Raleway'] text-sm text-[#F0E8D5]/42 transition-colors duration-300 hover:text-[#C9A84C]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 font-['Raleway'] text-[10px] uppercase tracking-[0.32em] text-[#C9A84C]/62">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3 font-['EB_Garamond'] text-base text-[#F0E8D5]/48">
                <Mail size={16} className="mt-1 shrink-0 text-[#C9A84C]/70" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-[#C9A84C]">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3 font-['EB_Garamond'] text-base text-[#F0E8D5]/48">
                <Phone size={16} className="mt-1 shrink-0 text-[#C9A84C]/70" />
                <a href={CONTACT.phoneHref} className="hover:text-[#C9A84C]">
                  {CONTACT.phoneLabel}
                </a>
              </li>
              <li className="flex gap-3 font-['EB_Garamond'] text-base leading-relaxed text-[#F0E8D5]/48">
                <MapPin size={16} className="mt-1 shrink-0 text-[#C9A84C]/70" />
                Currently working in Pune. Presence in Pune, Hyderabad, Nanded, and Mumbai.
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider className="mt-12" />

        <div className="mt-6 flex flex-col gap-4 font-['Raleway'] text-xs text-[#F0E8D5]/28 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Sharada Prod. & Media Mgmt. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-[#C9A84C]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[#C9A84C]">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
