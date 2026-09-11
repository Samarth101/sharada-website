import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../../../imports/SHARADA_TECH_LOGO.jpeg";
import { NAV_LINKS } from "../../data/siteContent";

export function Navbar({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#080808]/82 backdrop-blur-xl shadow-[0_1px_0_rgba(201,168,76,0.16),0_18px_60px_rgba(0,0,0,0.26)]"
          : "bg-[#080808]/24 backdrop-blur-[2px]"
      }`}
    >
      <nav className="premium-container px-6 h-24 flex items-center justify-between" aria-label="Primary navigation">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Sharada home">
          <img
            src={logo}
            alt="Sharada"
            className="h-12 w-12 rounded-full object-contain transition-all duration-500 group-hover:drop-shadow-[0_0_14px_rgba(201,168,76,0.55)]"
          />
          <div className="hidden sm:block leading-none">
            <div
              className="text-[#C9A84C] text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Sharada
            </div>
            <div
              className="text-[#F0E8D5]/40 text-[9px] tracking-[0.22em] uppercase mt-0.5"
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              Prod. & Media Mgmt.
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 rounded-full border border-[#C9A84C]/10 bg-black/18 p-1.5">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2.5 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ${
                  isActive
                    ? "text-[#080808] bg-[#C9A84C]"
                    : "text-[#F0E8D5]/62 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8"
                }`
              }
              style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <button
            onClick={onContact}
            className="premium-button premium-button-primary min-h-0 px-5 py-3"
            aria-label="Open contact form"
          >
            Connect
            <ArrowUpRight size={14} />
          </button>
        </div>

        <button
          className="md:hidden rounded-full border border-[#C9A84C]/20 p-3 text-[#C9A84C]"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-[#080808]/96 backdrop-blur-xl border-t border-[#C9A84C]/10 px-6 pb-6 pt-2 shadow-[0_30px_80px_rgba(0,0,0,0.42)]">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block py-3.5 text-[11px] tracking-[0.22em] uppercase border-b border-[#C9A84C]/10 transition-colors ${
                  isActive ? "text-[#C9A84C]" : "text-[#F0E8D5]/55 hover:text-[#C9A84C]"
                }`
              }
              style={{ fontFamily: "'Raleway', sans-serif" }}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              onContact();
              setMenuOpen(false);
            }}
            className="premium-button premium-button-primary mt-5 w-full"
          >
            Connect
          </button>
        </div>
      )}
    </header>
  );
}
