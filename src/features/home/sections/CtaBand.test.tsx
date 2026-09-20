import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import { CtaBand } from './CtaBand';
import { renderWithRouter } from '@/test/utils';

describe('CtaBand', () => {
  it('renders the default invitation when nothing is configured', () => {
    renderWithRouter(<CtaBand />);

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Let’s find out the potential of your business.',
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Tell us where your business is today/)).toBeInTheDocument();
  });

  it('points its default actions at contact and services', () => {
    renderWithRouter(<CtaBand />);

    expect(screen.getByRole('link', { name: 'Start the conversation' })).toHaveAttribute(
      'href',
      '/contact',
    );
    expect(screen.getByRole('link', { name: 'See our capabilities' })).toHaveAttribute(
      'href',
      '/services',
    );
  });

  /** Every prop is optional, so the overridden path is a separate branch from the default one. */
  it('takes every part of the band from props when they are given', () => {
    renderWithRouter(
      <CtaBand
        title="Ready when you are."
        body="One call is enough to start."
        primaryLabel="Book a call"
        primaryTo="/book"
        secondaryLabel="Read the work"
        secondaryTo="/insights"
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Ready when you are.' })).toBeInTheDocument();
    expect(screen.getByText('One call is enough to start.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Book a call' })).toHaveAttribute('href', '/book');
    expect(screen.getByRole('link', { name: 'Read the work' })).toHaveAttribute('href', '/insights');
  });

  it('gives only the primary action an arrow', () => {
    renderWithRouter(<CtaBand />);

    const primary = screen.getByRole('link', { name: 'Start the conversation' });
    const secondary = screen.getByRole('link', { name: 'See our capabilities' });

    expect(primary.querySelector('[aria-hidden="true"]')).toHaveTextContent('→');
    expect(secondary.querySelector('[aria-hidden="true"]')).toBeNull();
  });
});
