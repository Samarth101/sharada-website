import { useEffect, useState } from "react";

export function LoadingOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#080808]">
      <div className="text-center">
        <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border border-[#C9A84C]/18 border-t-[#C9A84C]" />
        <p className="font-['Raleway'] text-[10px] uppercase tracking-[0.42em] text-[#C9A84C]/72">
          Sharada
        </p>
      </div>
    </div>
  );
}
