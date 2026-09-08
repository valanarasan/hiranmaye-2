import { PageHero } from '@/features/about/sections';
import { ContactForm } from '@/features/contact/sections';
import { contactHero } from '@/content/contact';
import { seo } from '@/content/seo';
import { useSeo } from '@/hooks';

export default function ContactPage() {
  useSeo(seo.contact);

  return (
    <>
      <PageHero
        eyebrow={contactHero.eyebrow}
        headline={contactHero.headline}
        lead={contactHero.lead}
        titleId="contact-title"
      />
      <ContactForm />
    </>
  );
}
