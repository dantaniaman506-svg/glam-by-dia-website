export function BlankImageSlot({
  label,
  className = "",
  tone = "white",
}: {
  label: string;
  className?: string;
  tone?: "white" | "lightGrey";
}) {
  const image =
    tone === "lightGrey"
      ? "/images/light-grey-image-placeholder.svg"
      : "/images/white-image-placeholder.svg";

  return (
    <div
      role="img"
      aria-label={label}
      className={`relative min-w-0 overflow-hidden rounded-2xl border border-primary/15 ${
        tone === "lightGrey" ? "bg-[#e3dfe1]" : "bg-white"
      } ${className}`}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
