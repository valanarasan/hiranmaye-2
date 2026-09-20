import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SocialIcon } from './SocialIcon';
import type { SocialIconName } from './SocialIcon';
import { socialChannels } from '@/content/site';

const names = socialChannels.map((channel) => channel.id as SocialIconName);

function renderIcon(name: SocialIconName, className = 'icon'): SVGSVGElement {
  const { container } = render(<SocialIcon name={name} className={className} />);
  return container.querySelector('svg')!;
}

describe('SocialIcon', () => {
  it('covers every channel the site links to', () => {
    expect(names).toEqual(['whatsapp', 'linkedin', 'instagram', 'youtube', 'facebook']);
  });

  it.each(names)('draws %s on the shared 24x24 grid, decoratively', (name) => {
    const svg = renderIcon(name);

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('focusable', 'false');
    expect(svg).toHaveClass('icon');
    expect(svg.querySelectorAll('path').length).toBeGreaterThan(0);
  });

  it.each([
    ['whatsapp', '#25D366'],
    ['youtube', '#FF0000'],
    ['facebook', '#0866FF'],
  ] as const)('fills the %s glyph with its brand colour', (name, colour) => {
    const paths = renderIcon(name).querySelectorAll('path');

    expect(paths).toHaveLength(1);
    expect(paths[0]).toHaveAttribute('fill', colour);
  });

  it('knocks the i and the n out of the LinkedIn tile in white', () => {
    const paths = renderIcon('linkedin').querySelectorAll('path');

    expect(paths).toHaveLength(3);
    expect(paths[0]).toHaveAttribute('fill', '#0A66C2');
    expect(paths[1]).toHaveAttribute('fill', '#FFFFFF');
    expect(paths[2]).toHaveAttribute('fill', '#FFFFFF');
  });

  it('paints Instagram with the five-stop brand gradient', () => {
    const gradient = renderIcon('instagram').querySelector('radialGradient')!;
    const stops = gradient.querySelectorAll('stop');

    expect(stops).toHaveLength(5);
    expect([...stops].map((stop) => stop.getAttribute('stop-color'))).toEqual([
      '#FDF497',
      '#FDF497',
      '#FD5949',
      '#D6249F',
      '#285AEB',
    ]);
  });

  /** A fill pointing at a gradient id that does not exist renders as black. */
  it('points the Instagram fill at the gradient it actually defines', () => {
    const svg = renderIcon('instagram');
    const gradientId = svg.querySelector('radialGradient')!.id;

    expect(gradientId).not.toBe('');
    expect(svg.querySelector('path')).toHaveAttribute('fill', `url(#${gradientId})`);
  });

  /** Two icons on one page must not share a gradient id, or one would win. */
  it('gives each rendered Instagram mark its own gradient id', () => {
    const { container } = render(
      <>
        <SocialIcon name="instagram" />
        <SocialIcon name="instagram" />
      </>,
    );
    const [first, second] = container.querySelectorAll('radialGradient');

    expect(first.id).not.toBe(second.id);
  });

  it('omits the class attribute when no class is passed', () => {
    const { container } = render(<SocialIcon name="whatsapp" />);
    expect(container.querySelector('svg')).not.toHaveAttribute('class');
  });
});
