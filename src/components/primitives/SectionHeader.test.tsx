import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SectionHeader } from './SectionHeader';
import { hasClassKey } from '@/test/utils';

describe('SectionHeader', () => {
  it('renders the title as a level-2 heading', () => {
    render(<SectionHeader title="How we work" />);
    expect(screen.getByRole('heading', { level: 2, name: 'How we work' })).toBeInTheDocument();
  });

  it('omits the eyebrow and lead when not given', () => {
    const { container } = render(<SectionHeader title="How we work" />);

    expect(container.querySelectorAll('p')).toHaveLength(0);
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('renders the eyebrow with its decorative rule', () => {
    const { container } = render(<SectionHeader eyebrow="Process" title="How we work" />);

    expect(screen.getByText('Process')).toBeInTheDocument();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('renders the lead', () => {
    render(<SectionHeader title="How we work" lead="Five steps, no mystery." />);
    expect(screen.getByText('Five steps, no mystery.')).toBeInTheDocument();
  });

  it('takes the id a section labels itself with', () => {
    render(<SectionHeader title="How we work" titleId="process-title" />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('id', 'process-title');
  });

  it('centres when asked', () => {
    const { container, rerender } = render(<SectionHeader title="How we work" />);
    expect(hasClassKey(container.firstElementChild!, 'center')).toBe(false);

    rerender(<SectionHeader title="How we work" align="center" />);
    expect(hasClassKey(container.firstElementChild!, 'center')).toBe(true);
  });

  it('switches every tone for a dark band', () => {
    render(<SectionHeader eyebrow="Process" title="How we work" lead="Five steps." inverse />);

    expect(hasClassKey(screen.getByText('Process'), 'toneInverseMuted')).toBe(true);
    expect(hasClassKey(screen.getByRole('heading', { level: 2 }), 'toneInverse')).toBe(true);
    expect(hasClassKey(screen.getByText('Five steps.'), 'toneInverseMuted')).toBe(true);
  });

  it('uses the light tones by default', () => {
    render(<SectionHeader eyebrow="Process" title="How we work" lead="Five steps." />);

    expect(hasClassKey(screen.getByText('Process'), 'toneFaint')).toBe(true);
    expect(hasClassKey(screen.getByText('Five steps.'), 'toneMuted')).toBe(true);
  });

  it('keeps caller classes', () => {
    const { container } = render(<SectionHeader title="How we work" className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
  });
});
