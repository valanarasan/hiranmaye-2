import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Chip } from './Chip';
import { hasClassKey } from '@/test/utils';

describe('Chip', () => {
  it('renders a button with a decorative dot by default', () => {
    render(<Chip>SEO</Chip>);
    const chip = screen.getByRole('button', { name: 'SEO' });

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.querySelector('[aria-hidden="true"]')).not.toBeNull();
  });

  it('drops the dot when asked', () => {
    render(<Chip withDot={false}>SEO</Chip>);
    expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('marks the selected state', () => {
    const { rerender } = render(<Chip>SEO</Chip>);
    expect(hasClassKey(screen.getByRole('button'), 'selected')).toBe(false);

    rerender(<Chip selected>SEO</Chip>);
    expect(hasClassKey(screen.getByRole('button'), 'selected')).toBe(true);
  });

  it('renders as another element', () => {
    render(
      <Chip as="a" href="#seo">
        SEO
      </Chip>,
    );
    expect(screen.getByRole('link', { name: 'SEO' })).toHaveAttribute('href', '#seo');
  });

  it('forwards events and caller classes', async () => {
    const onClick = vi.fn();
    render(
      <Chip className="custom" onClick={onClick}>
        SEO
      </Chip>,
    );

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('button')).toHaveClass('custom');
  });
});
