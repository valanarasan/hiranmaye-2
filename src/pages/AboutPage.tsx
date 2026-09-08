import { PageHero, Story, Thinking, VisionMission, WhyUs } from '@/features/about/sections';
import { CtaBand } from '@/features/home/sections';
import { aboutHero } from '@/content/about';
import { seo } from '@/content/seo';
import { useSeo } from '@/hooks';

export default function AboutPage() {
  useSeo(seo.about);

  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        headline={aboutHero.headline}
        paragraphs={aboutHero.paragraphs}
        titleId="about-title"
      />
      <Thinking />
      <VisionMission />
      <Story />
      <WhyUs />
      <CtaBand
        title="Ambition deserves a partner that starts with the business."
        primaryLabel="Talk to us"
        secondaryLabel="See what we do"
      />
    </>
  );
}
