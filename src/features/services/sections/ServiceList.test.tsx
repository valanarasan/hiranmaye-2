import { act } from 'react';
import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { services } from '@/content/services';
import { latestIntersectionObserver } from '@/test/setup';
import { renderWithRouter } from '@/test/utils';
import { ServiceList } from './ServiceList';

describe('ServiceList', () => {
  it('pairs the index with one entry per service', () => {
    renderWithRouter(<ServiceList services={services} />);

    const nav = screen.getByRole('navigation', { name: 'Capabilities' });
    expect(within(nav).getAllByRole('link')).toHaveLength(services.length);
    expect(screen.getAllByRole('article')).toHaveLength(services.length);
  });

  it('starts with the first service current', () => {
    renderWithRouter(<ServiceList services={services} />);

    expect(screen.getByRole('link', { current: true })).toHaveAttribute(
      'href',
      `#${services[0].id}`,
    );
  });

  it('hands the scroll-spy result down to the index', () => {
    renderWithRouter(<ServiceList services={services} />);
    const target = document.getElementById(services[2].id) as HTMLElement;

    act(() => {
      latestIntersectionObserver().trigger(true, target);
    });

    expect(screen.getByRole('link', { current: true })).toHaveAttribute(
      'href',
      `#${services[2].id}`,
    );
  });
});
