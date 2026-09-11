import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { FloatingActions } from "./components/layout/FloatingActions";
import { LoadingOverlay } from "./components/layout/LoadingOverlay";
import { HeroSection } from "./components/sections/HeroSection";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { LocationsSection } from "./components/sections/LocationsSection";
import { CTASection } from "./components/sections/CTASection";
import { StatsSection } from "./components/sections/StatsSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { FAQSection } from "./components/sections/FAQSection";
import { NewsletterSection } from "./components/sections/NewsletterSection";
import { ContactModal } from "./components/overlays/ContactModal";
import { CopilotChat } from "./components/chat/CopilotChat";

function HomePage({ onContact }: { onContact: () => void }) {
  return (
    <>
      <HeroSection onContact={onContact} />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <LocationsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection onContact={onContact} />
      <NewsletterSection />
    </>
  );
}

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <BrowserRouter>
      <div
        className="bg-[#080808] text-[#F0E8D5] overflow-x-hidden"
        style={{ fontFamily: "'EB Garamond', serif" }}
      >
        <style>{`
          html { scroll-behavior: smooth; }
          ::-webkit-scrollbar { width: 3px; }
          ::-webkit-scrollbar-track { background: #080808; }
          ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.6); }
          * { scrollbar-width: thin; scrollbar-color: rgba(201,168,76,0.3) #080808; }
          @keyframes goldShimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>

        <LoadingOverlay />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar onContact={() => setContactOpen(true)} />
        <Routes>
          <Route path="/" element={<HomePage onContact={() => setContactOpen(true)} />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/services" element={<ServicesSection />} />
          <Route path="/presence" element={<LocationsSection />} />
          <Route
            path="/contact"
            element={
              <>
                <CTASection onContact={() => setContactOpen(true)} />
                <FAQSection />
              </>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
        <FloatingActions />
        <CopilotChat />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
