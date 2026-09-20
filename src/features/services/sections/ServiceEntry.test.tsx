import { describe, expect, it } from 'vitest';
import { screen, within } from '@testing-library/react';
import { services } from '@/content/services';
import { renderWithRouter } from '@/test/utils';
import type { Service } from '@/types/content';
import { ServiceEntry } from './ServiceEntry';

const byId = (id: string) => services.find((service) => service.id === id) as Service;

const withFacets = byId('search');
const withProblemAndOutcome = byId('strategy');
const withCloser = byId('outdoor');

/** Composed from real content so every optional block is present at once. */
const complete: Service = {
  ...withFacets,
  problem: withProblemAndOutcome.problem,
  outcome: withProblemAndOutcome.outcome,
  closer: withCloser.closer,
};

/** The other extreme: only the fields every service is required to have. */
const minimal = byId('ads');

describe('ServiceEntry', () => {
  it.each(services.map((service) => [service.title, service] as const))(
    'anchors %s to its own id with a heading, promise and approach',
    (_title, service) => {
      renderWithRouter(<ServiceEntry service={service} />);
      const entry = screen.getByRole('article');

      expect(entry).toHaveAttribute('id', service.id);
      expect(
        within(entry).getByRole('heading', { level: 2, name: service.title }),
      ).toBeInTheDocument();
      expect(within(entry).getByText(service.index)).toBeInTheDocument();
      expect(within(entry).getByText(service.promise)).toBeInTheDocument();
      expect(within(entry).getByText(service.approach)).toBeInTheDocument();
    },
  );

  it('renders every optional block when the service supplies one', () => {
    renderWithRouter(<ServiceEntry service={complete} />);

    expect(screen.getByText('What we solve')).toBeInTheDocument();
    expect(screen.getByText(complete.problem as string)).toBeInTheDocument();
    expect(screen.getByText('The outcome')).toBeInTheDocument();
    expect(screen.getByText(complete.outcome as string)).toBeInTheDocument();
    expect(screen.getByText(complete.closer as string)).toBeInTheDocument();
  });

  it('omits the optional blocks when the service has none of them', () => {
    renderWithRouter(<ServiceEntry service={minimal} />);

    expect(screen.queryByText('What we solve')).not.toBeInTheDocument();
    expect(screen.queryByText('The outcome')).not.toBeInTheDocument();
    expect(screen.getByText('What we do')).toBeInTheDocument();
  });

  it('lists each facet with its own title, promise and body', () => {
    renderWithRouter(<ServiceEntry service={withFacets} />);

    (withFacets.facets ?? []).forEach((facet) => {
      expect(screen.getByText(facet.title)).toBeInTheDocument();
      expect(screen.getByText(facet.promise)).toBeInTheDocument();
      expect(screen.getByText(facet.body)).toBeInTheDocument();
    });
  });

  it('sends the service call to action to the contact page', () => {
    renderWithRouter(<ServiceEntry service={withFacets} />);

    expect(screen.getByRole('link', { name: withFacets.ctaLabel })).toHaveAttribute(
      'href',
      '/contact',
    );
  });
});
