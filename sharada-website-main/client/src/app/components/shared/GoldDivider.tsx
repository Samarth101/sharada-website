export function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 my-5 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/35" />
      <div className="w-1 h-1 rotate-45 bg-[#C9A84C]" />
      <div className="w-2 h-2 rotate-45 border border-[#C9A84C]/70" />
      <div className="w-1 h-1 rotate-45 bg-[#C9A84C]" />
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/35" />
    </div>
  );
}
