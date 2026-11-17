export function BlankImageSlot({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative min-w-0 overflow-hidden rounded-2xl border border-primary/15 bg-white ${className}`}
    >
      <img
        src="/images/white-image-placeholder.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
