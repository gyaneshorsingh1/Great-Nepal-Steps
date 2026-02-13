interface HeroBannerProps {
  image: string;
  title: string;
  subtitle?: string;
  compact?: boolean;
}

const HeroBanner = ({ image, title, subtitle, compact = false }: HeroBannerProps) => (
  <section
    className={`relative flex items-center justify-center overflow-hidden ${
      compact ? 'h-48 md:h-64' : 'h-[60vh] min-h-[400px] md:h-[70vh]'
    }`}
  >
    <img
      src={image}
      alt={title}
      className="absolute inset-0 h-full w-full object-cover"
      loading="eager"
    />
    <div className="hero-overlay" />
    <div className="relative z-10 px-4 text-center">
      <h1
        className={`font-display font-bold text-primary-foreground ${
          compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl lg:text-6xl'
        }`}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/80 md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default HeroBanner;
