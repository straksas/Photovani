import { Seo } from '@/components/Seo';
import { Reveal } from '@/components/Reveal';
import { SectionHeading, CTAButton } from '@/components/ui/Section';
import { services, type ServiceCategory } from '@/config/site';
import { siteConfig } from '@/config/site';

const heroImage = '/1920_short_edge-28.webp';

const eyebrowLabels: Record<string, string> = {
  maternity: 'Maternity',
  couples: 'Couples',
  family: 'Family',
};

function ServiceBlock({
  service,
  index,
}: {
  service: ServiceCategory;
  index: number;
}) {
  const imageRight = index % 2 === 1;
  const eyebrow = eyebrowLabels[service.slug] ?? service.title;

  const image = (
    <Reveal>
      <div className="relative mx-auto max-w-lg">
        <img
          src={service.image}
          alt={service.alt}
          className="aspect-[3/4] w-full rounded-2xl object-cover shadow-xl"
          loading="lazy"
          width={1200}
          height={1500}
        />
      </div>
    </Reveal>
  );

  const copy = (
    <Reveal delay={120}>
      <p className="section-eyebrow">{eyebrow}</p>
      <div className="flex items-baseline gap-3">
        <h2 className="text-3xl font-semibold sm:text-4xl">{service.title}</h2>
        <span className="text-base font-semibold text-accent-600">{service.price}</span>
      </div>
      <p className="mt-6 text-lg leading-relaxed text-stone-600">
        {service.shortDescription}
      </p>
      <p className="mt-4 leading-relaxed text-stone-600">{service.description}</p>
      <div className="mt-8">
        <CTAButton to="/contact">Plan your {eyebrow.toLowerCase()} session</CTAButton>
      </div>
    </Reveal>
  );

  return (
    <div
      className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
      style={{ direction: imageRight ? 'rtl' : 'ltr' }}
    >
      <div style={{ direction: 'ltr' }}>{image}</div>
      <div style={{ direction: 'ltr' }}>{copy}</div>
    </div>
  );
}

export function HomePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.businessName,
    description: `Professional photographer in ${siteConfig.primaryCity}, ${siteConfig.stateRegion} specializing in maternity, couples, family, and individual photography.`,
    url: siteConfig.productionDomain,
    email: siteConfig.email,
    areaServed: siteConfig.serviceAreas.map((a) => a),
  };

  return (
    <>
      <Seo
        title={`${siteConfig.businessName} — Maternity, Couples, Family & Individual Photography in ${siteConfig.primaryCity}`}
        description={`Professional photographer in ${siteConfig.primaryCity}, ${siteConfig.stateRegion} specializing in maternity, couples, family, and individual photography. Natural light, relaxed sessions, timeless images. Book your session today.`}
        path="/"
        ogImage={heroImage}
        structuredData={structuredData}
      />

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[100vh] items-center justify-center overflow-hidden">
        {/* Eager hero image — no lazy load on above-the-fold */}
        <img
          src={heroImage}
          alt="A couple embracing in a sunlit forest, sharing a tender moment together"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1280}
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/50 via-charcoal-900/30 to-charcoal-900/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="animate-fade-in text-sm font-medium uppercase tracking-[0.3em] text-cream-100/90">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-6 animate-fade-up font-serif text-4xl font-medium leading-tight text-cream-50 sm:text-6xl lg:text-7xl">
            {siteConfig.introHeading}
          </h1>
          <p className="mx-auto mt-6 max-w-xl animate-fade-up text-base text-cream-100/90 [animation-delay:0.15s] sm:text-lg">
            Professional photography in Washington, D.C., Falls Church.
            Genuine moments, beautiful light, and images you'll return to for years.
          </p>
          <div className="mt-10 flex animate-fade-up justify-center gap-4 [animation-delay:0.3s]">
            <CTAButton to="/contact">Book a session</CTAButton>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in [animation-delay:0.6s]">
          <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-cream-50/50 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-cream-50/70" />
          </div>
        </div>
      </section>

      {/* ===== Services ===== */}
      <section className="bg-cream-100 py-24 lg:py-32">
        <div className="container-px mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Photography sessions tailored to you"
            >
              From the quiet wonder of pregnancy to the joyful chaos of family life,
              each session is crafted around your story and held in beautiful natural light.
            </SectionHeading>
          </Reveal>

          <div className="mt-20 flex flex-col gap-24 lg:gap-32">
            {services.map((service, i) => (
              <ServiceBlock key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Individual Sessions ===== */}
      <section className="container-px mx-auto max-w-7xl py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal delay={120}>
            <p className="section-eyebrow">Individual portraits</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-3xl font-semibold sm:text-4xl">
                A session that is entirely yours
              </h2>
              <span className="text-base font-semibold text-accent-600">from $200</span>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              Step in front of the camera and make space for yourself. Individual portrait
              sessions are relaxed, guided, and designed to show your personality in a way
              that feels natural and beautifully honest.
            </p>
            <p className="mt-4 leading-relaxed text-stone-600">
              From a quiet beach morning to a meaningful outdoor location, we will create
              images that celebrate this season of your life. A professional individual
              portrait session is perfect for personal branding, a milestone birthday,
              a fresh start, or simply a moment to see yourself with new eyes. With gentle
              direction and flattering natural light, every portrait feels authentic and
              effortless. You'll leave with a curated gallery of timeless images you'll be
              proud to print, share, and look back on for years to come.
            </p>
            <div className="mt-8">
              <CTAButton to="/contact">Plan your portrait session</CTAButton>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto max-w-lg">
              <img
                src="/1920_short_edge_SC-3.webp"
                alt="Woman in a flowing white dress during an individual beach portrait session"
                className="aspect-[3/4] w-full rounded-2xl object-cover shadow-xl"
                loading="lazy"
                width={1920}
                height={2560}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA Banner ===== */}
      <section className="relative overflow-hidden">
        <img
          src="/1920_short_edge_SC-7_vertical.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-charcoal-900/70" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center lg:py-32">
          <Reveal>
            <h2 className="text-3xl font-semibold text-cream-50 sm:text-4xl">
              Let's create something you'll treasure
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-cream-100/90">
              Sessions are limited to ensure every client receives personal attention.
              Reach out to check availability and start planning your photography session in{' '}
              {siteConfig.primaryCity}.
            </p>
            <div className="mt-8">
              <CTAButton to="/contact" className="bg-cream-50 text-charcoal-900 hover:bg-accent-600 hover:text-cream-50">
                Start your inquiry
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
