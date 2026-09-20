import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './Section';
import { classKeys, hasClassKey } from '@/test/utils';

describe('Section', () => {
  it('renders a <section> with the default tone and spacing', () => {
    render(<Section>Body</Section>);
    const node = screen.getByText('Body');

    expect(node.tagName).toBe('SECTION');
    expect(classKeys(node)).toEqual(['section']);
  });

  it.each(['none', 'sm', 'lg'] as const)('applies the %s spacing', (space) => {
    render(<Section space={space}>Body</Section>);
    expect(hasClassKey(screen.getByText('Body'), space)).toBe(true);
  });

  it('emits no spacing class for the md default', () => {
    render(<Section space="md">Body</Section>);
    expect(hasClassKey(screen.getByText('Body'), 'md')).toBe(false);
  });

  it('applies a non-default tone', () => {
    render(<Section tone="ink">Body</Section>);
    expect(hasClassKey(screen.getByText('Body'), 'ink')).toBe(true);
  });

  it('toggles the divider', () => {
    const { rerender } = render(<Section>Body</Section>);
    expect(hasClassKey(screen.getByText('Body'), 'divided')).toBe(false);

    rerender(<Section divided>Body</Section>);
    expect(hasClassKey(screen.getByText('Body'), 'divided')).toBe(true);
  });

  it('renders as another element when asked', () => {
    render(<Section as="footer">Body</Section>);
    expect(screen.getByText('Body').tagName).toBe('FOOTER');
  });

  it('carries the labelling id through for the accessible name', () => {
    render(
      <Section aria-labelledby="title">
        <h2 id="title">Our process</h2>
      </Section>,
    );
    expect(screen.getByRole('region', { name: 'Our process' })).toBeInTheDocument();
  });

  it('keeps caller classes', () => {
    render(<Section className="custom">Body</Section>);
    expect(screen.getByText('Body')).toHaveClass('custom');
  });
});
