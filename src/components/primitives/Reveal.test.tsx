import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import { Reveal } from './Reveal';
import { hasClassKey, } from '@/test/utils';
import { intersectionObservers, setMatchMedia, triggerIntersection } from '@/test/setup';

describe('Reveal', () => {
  it('renders hidden until the element enters the viewport', () => {
    render(<Reveal>Body</Reveal>);
    expect(hasClassKey(screen.getByText('Body'), 'visible')).toBe(false);
  });

  it('becomes visible on intersection', () => {
    render(<Reveal>Body</Reveal>);

    act(() => triggerIntersection(true));

    expect(hasClassKey(screen.getByText('Body'), 'visible')).toBe(true);
  });

  it('exposes delay and shift as custom properties for the stagger', () => {
    render(
      <Reveal delay={120} shift={40}>
        Body
      </Reveal>,
    );
    const node = screen.getByText('Body');

    expect(node.style.getPropertyValue('--_delay')).toBe('120ms');
    expect(node.style.getPropertyValue('--_shift')).toBe('40px');
  });

  it('defaults delay to none and shift to 18px', () => {
    render(<Reveal>Body</Reveal>);
    const node = screen.getByText('Body');

    expect(node.style.getPropertyValue('--_delay')).toBe('0ms');
    expect(node.style.getPropertyValue('--_shift')).toBe('18px');
  });

  it('merges a caller style with its own custom properties', () => {
    render(<Reveal style={{ color: 'red' }}>Body</Reveal>);
    const node = screen.getByText('Body');

    expect(node.style.color).toBe('red');
    expect(node.style.getPropertyValue('--_shift')).toBe('18px');
  });

  /**
   * With reduced motion the component renders its static form and never
   * observes at all — no animation to schedule, so no observer to pay for.
   */
  it('renders statically and observes nothing when motion is reduced', () => {
    setMatchMedia((query) => query === '(prefers-reduced-motion: reduce)');

    render(<Reveal>Body</Reveal>);
    const node = screen.getByText('Body');

    expect(hasClassKey(node, 'static')).toBe(true);
    expect(hasClassKey(node, 'visible')).toBe(false);
    expect(intersectionObservers).toHaveLength(0);
  });

  it('keeps the caller style in the reduced-motion branch', () => {
    setMatchMedia(true);

    render(<Reveal style={{ color: 'blue' }}>Body</Reveal>);
    expect(screen.getByText('Body').style.color).toBe('blue');
  });

  it('renders as another element in both branches', () => {
    const { unmount } = render(<Reveal as="li">Body</Reveal>);
    expect(screen.getByText('Body').tagName).toBe('LI');
    unmount();

    setMatchMedia(true);
    render(<Reveal as="li">Body</Reveal>);
    expect(screen.getByText('Body').tagName).toBe('LI');
  });

  it('forwards props and caller classes in both branches', () => {
    const { unmount } = render(
      <Reveal className="custom" data-testid="motion">
        Body
      </Reveal>,
    );
    expect(screen.getByTestId('motion')).toHaveClass('custom');
    unmount();

    setMatchMedia(true);
    render(
      <Reveal className="custom" data-testid="static">
        Body
      </Reveal>,
    );
    expect(screen.getByTestId('static')).toHaveClass('custom');
  });
});
