import {
  Capabilities,
  ClientStrip,
  CtaBand,
  Hero,
  Process,
  TrustStrip,
  WhoWeAre,
} from '@/features/home/sections';
import { useSeo } from '@/hooks';
import { seo } from '@/content/seo';

export default function HomePage() {
  useSeo(seo.home);

  return (
    <>
      <Hero />
      <TrustStrip />
      <ClientStrip />
      <WhoWeAre />
      <Capabilities />
      <Process />
      <CtaBand />
    </>
  );
}
