import { beforeEach, describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSeo } from './useSeo';

const content = (selector: string) =>
  document.head.querySelector<HTMLMetaElement>(selector)?.getAttribute('content');

describe('useSeo', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
  });

  it('sets the document title', () => {
    renderHook(() => useSeo({ title: 'Contact — Hiranmaye', description: 'Talk to us.' }));
    expect(document.title).toBe('Contact — Hiranmaye');
  });

  it('creates the description and Open Graph tags when none exist', () => {
    renderHook(() => useSeo({ title: 'Contact', description: 'Talk to us.' }));

    expect(content('meta[name="description"]')).toBe('Talk to us.');
    expect(content('meta[property="og:title"]')).toBe('Contact');
    expect(content('meta[property="og:description"]')).toBe('Talk to us.');
    expect(content('meta[property="og:type"]')).toBe('website');
  });

  it('reuses an existing tag rather than appending a duplicate', () => {
    const existing = document.createElement('meta');
    existing.setAttribute('name', 'description');
    existing.setAttribute('content', 'stale');
    document.head.appendChild(existing);

    renderHook(() => useSeo({ title: 'Contact', description: 'fresh' }));

    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(existing.getAttribute('content')).toBe('fresh');
  });

  it('updates when the route changes', () => {
    const { rerender } = renderHook((props: { title: string; description: string }) => useSeo(props), {
      initialProps: { title: 'Home', description: 'One' },
    });

    rerender({ title: 'About', description: 'Two' });

    expect(document.title).toBe('About');
    expect(content('meta[property="og:title"]')).toBe('About');
    expect(content('meta[name="description"]')).toBe('Two');
  });
});
