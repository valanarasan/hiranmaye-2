/**
 * The content ABSTRACTION. Sections depend on these interfaces only — never on
 * the concrete objects in `src/content`. Swapping the content layer for a CMS
 * fetcher is therefore a change of one module, not of every component.
 */

export interface CtaLink {
  readonly label: string;
  readonly to: string;
}

export interface NavItem {
  readonly label: string;
  readonly to: string;
}

export interface PainPoint {
  readonly id: string;
  readonly label: string;
  readonly to: string;
}

export interface HeroContent {
  readonly eyebrow: string;
  readonly headline: string;
  readonly subcopy: string;
  readonly primaryCta: CtaLink;
  readonly secondaryCta: CtaLink;
  readonly promptLabel: string;
  readonly painPoints: readonly PainPoint[];
}

export interface TrustContent {
  readonly headline: string;
  readonly stages: readonly string[];
  readonly industries: readonly string[];
}

export interface ProseBlock {
  readonly id: string;
  readonly lead?: string;
  readonly paragraphs: readonly string[];
}

export interface Pillar {
  readonly id: string;
  readonly label: string;
  readonly promise: string;
  readonly capabilities: readonly string[];
  /** Where this pillar sends the reader in the services page. */
  readonly to: string;
}

export interface ProcessStep {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly headline: string;
  readonly body: string;
}

export interface ServiceFacet {
  readonly id: string;
  readonly title: string;
  readonly promise: string;
  readonly body: string;
}

export interface Service {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly promise: string;
  readonly ctaLabel: string;
  readonly problem?: string;
  readonly approach: string;
  readonly outcome?: string;
  readonly facets?: readonly ServiceFacet[];
  readonly closer?: string;
}

export interface ValueProp {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export interface Post {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly readTime: string;
  readonly excerpt: string;
  readonly featured?: boolean;
}

export interface SeoMeta {
  readonly title: string;
  readonly description: string;
}

export interface SocialChannel {
  readonly id: string;
  /** Platform name as people know it. */
  readonly name: string;
  /** The handle or number shown under the name. */
  readonly handle: string;
  /** What this channel is actually for. */
  readonly purpose: string;
  /** Short label describing the kind of content. */
  readonly tag: string;
  readonly href: string;
  readonly cta: string;
}

export interface OpeningHours {
  readonly id: string;
  readonly label: string;
  /** Days this row covers, 0 = Sunday. */
  readonly days: readonly number[];
  /** Minutes from midnight, IST. Omit both for a closed day. */
  readonly opens?: number;
  readonly closes?: number;
  readonly display: string;
}

export interface OfficeLocation {
  readonly name: string;
  readonly street: string;
  readonly landmark: string;
  readonly locality: string;
  readonly city: string;
  readonly state: string;
  readonly postcode: string;
  readonly country: string;
  readonly latitude: number;
  readonly longitude: number;
  /** Canonical Google Maps listing. */
  readonly mapsUrl: string;
  /** Turn-by-turn directions to the exact pin. */
  readonly directionsUrl: string;
  /** Keyless embed of the same coordinates. */
  readonly embedUrl: string;
  readonly consultation: string;
}
