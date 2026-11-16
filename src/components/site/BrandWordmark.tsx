import { Link } from "react-router-dom";

export function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="Glam by Dia home"
      className={`inline-flex flex-col items-center leading-none text-[#55423e] ${
        compact ? "gap-0" : "gap-0.5"
      }`}
    >
      <span
        className={`font-display font-semibold tracking-[-0.06em] ${
          compact ? "text-[1.7rem]" : "text-[2rem]"
        }`}
      >
        Glam
      </span>
      <span
        className={`font-display italic tracking-[0.04em] text-[#76554e] ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        by Dia
      </span>
    </Link>
  );
}
