export function BlankImageSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`min-w-0 rounded-2xl border border-primary/15 bg-[#fcdee3] ${className}`}
    />
  );
}
