import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[70] h-1 w-full bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-gradient-to-r from-[#8B6914] via-[#C9A84C] to-[#F0D87A] transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
