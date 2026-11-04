export function ImagePageHero({
  image,
  alt,
  eyebrow,
  title,
  script,
  subtitle,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  script?: string;
  subtitle: string;
}) {
  return (
    <section className="px-3 pt-5 sm:px-6">
      <div className="relative mx-auto flex min-h-[340px] max-w-5xl items-end overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-30px_rgba(150,80,110,0.45)] ring-1 ring-white/70 sm:min-h-[440px]">
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/25 to-transparent" />
        <div className="relative max-w-2xl px-6 pb-8 pt-20 sm:px-12 sm:pb-12">
          <p className="eyebrow text-white/85">{eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-6xl">
            {title} {script ? <span className="text-script text-5xl text-white sm:text-7xl">{script}</span> : null}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/90 sm:text-base">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
