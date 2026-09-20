import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { classKeys, hasClassKey, renderWithRouter } from '@/test/utils';

describe('Button', () => {
  it('renders a button with the default variant and size', () => {
    render(<Button>Send the brief</Button>);
    const button = screen.getByRole('button', { name: 'Send the brief' });

    expect(button.tagName).toBe('BUTTON');
    expect(classKeys(button)).toEqual(expect.arrayContaining(['button', 'solid', 'md']));
  });

  it.each(['solid', 'accent', 'outline', 'ghost', 'inverse'] as const)(
    'applies the %s variant alongside the size',
    (variant) => {
      render(<Button variant={variant}>Go</Button>);
      const button = screen.getByRole('button');

      expect(hasClassKey(button, variant)).toBe(true);
      expect(hasClassKey(button, 'md')).toBe(true);
    },
  );

  /** A link-styled button is inline text, so a size class would fight the type scale. */
  it('omits the size class for the link variant', () => {
    render(<Button variant="link" size="lg">Read on</Button>);
    expect(hasClassKey(screen.getByRole('button'), 'lg')).toBe(false);
  });

  it.each(['sm', 'md', 'lg'] as const)('applies the %s size', (size) => {
    render(<Button size={size}>Go</Button>);
    expect(hasClassKey(screen.getByRole('button'), size)).toBe(true);
  });

  it('adds the block class only when asked', () => {
    const { rerender } = render(<Button>Go</Button>);
    expect(hasClassKey(screen.getByRole('button'), 'block')).toBe(false);

    rerender(<Button block>Go</Button>);
    expect(hasClassKey(screen.getByRole('button'), 'block')).toBe(true);
  });

  it('renders the arrow decoratively, hidden from assistive tech', () => {
    render(<Button withArrow>Go</Button>);
    const arrow = screen.getByRole('button').querySelector('[aria-hidden="true"]');

    expect(arrow).toHaveTextContent('→');
    // The accessible name stays clean.
    expect(screen.getByRole('button')).toHaveAccessibleName('Go');
  });

  it('omits the arrow by default', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('keeps caller classes alongside its own', () => {
    render(<Button className="custom">Go</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom');
  });

  it('renders as an anchor when asked, keeping the visual contract', () => {
    render(
      <Button as="a" href="https://example.test">
        Visit
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Visit' });

    expect(link).toHaveAttribute('href', 'https://example.test');
    expect(hasClassKey(link, 'button')).toBe(true);
  });

  it('renders as a router Link', () => {
    renderWithRouter(
      <Button as={Link} to="/contact">
        Contact
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('forwards native props and events', async () => {
    const onClick = vi.fn();
    render(
      <Button type="submit" disabled={false} onClick={onClick} data-testid="cta">
        Go
      </Button>,
    );

    await userEvent.click(screen.getByTestId('cta'));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByTestId('cta')).toHaveAttribute('type', 'submit');
  });

  it('does not fire when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
