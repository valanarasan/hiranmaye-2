import { PageHero } from '@/features/about/sections';
import { ServiceList } from '@/features/services/sections';
import { CtaBand } from '@/features/home/sections';
import { services, servicesHero } from '@/content/services';
import { seo } from '@/content/seo';
import { useSeo } from '@/hooks';

export default function ServicesPage() {
  useSeo(seo.services);

  return (
    <>
      <PageHero
        eyebrow={servicesHero.eyebrow}
        headline={servicesHero.headline}
        lead={servicesHero.lead}
        titleId="services-title"
      />
      <ServiceList services={services} />
      <CtaBand
        title="Not sure which lever moves your business first?"
        body="That is usually the right question to start with — and the one we answer before recommending anything."
        primaryLabel="Ask us"
      />
    </>
  );
}
