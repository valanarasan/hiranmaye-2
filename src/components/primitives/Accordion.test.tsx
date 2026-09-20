import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Accordion } from './Accordion';
import { hasClassKey } from '@/test/utils';

function ThreeItems(props: React.ComponentProps<typeof Accordion>) {
  return (
    <Accordion {...props}>
      <Accordion.Item id="a" index="01" title="Strategy">
        Strategy body
      </Accordion.Item>
      <Accordion.Item id="b" title="Search">
        Search body
      </Accordion.Item>
    </Accordion>
  );
}

const trigger = (name: string) => screen.getByRole('button', { name: new RegExp(name) });

describe('Accordion', () => {
  it('starts with everything closed', () => {
    render(<ThreeItems />);

    expect(trigger('Strategy')).toHaveAttribute('aria-expanded', 'false');
    expect(trigger('Search')).toHaveAttribute('aria-expanded', 'false');
  });

  it('honours defaultOpenId', () => {
    render(<ThreeItems defaultOpenId="b" />);
    expect(trigger('Search')).toHaveAttribute('aria-expanded', 'true');
  });

  it('opens an item on click', async () => {
    render(<ThreeItems />);

    await userEvent.click(trigger('Strategy'));
    expect(trigger('Strategy')).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the previous item — only one is open at a time', async () => {
    render(<ThreeItems />);

    await userEvent.click(trigger('Strategy'));
    await userEvent.click(trigger('Search'));

    expect(trigger('Strategy')).toHaveAttribute('aria-expanded', 'false');
    expect(trigger('Search')).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an open item when clicked again', async () => {
    render(<ThreeItems />);

    await userEvent.click(trigger('Strategy'));
    await userEvent.click(trigger('Strategy'));

    expect(trigger('Strategy')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the item open on a second click when not collapsible', async () => {
    render(<ThreeItems collapsible={false} />);

    await userEvent.click(trigger('Strategy'));
    await userEvent.click(trigger('Strategy'));

    expect(trigger('Strategy')).toHaveAttribute('aria-expanded', 'true');
  });

  it('points each trigger at its own panel', () => {
    render(<ThreeItems />);

    const controls = trigger('Strategy').getAttribute('aria-controls')!;
    const panel = document.getElementById(controls);

    expect(panel).toHaveTextContent('Strategy body');
    expect(trigger('Search').getAttribute('aria-controls')).not.toBe(controls);
  });

  it('renders the index when given and an empty marker when not', () => {
    render(<ThreeItems />);

    expect(trigger('Strategy')).toHaveTextContent('01');
    expect(trigger('Search').textContent).toBe('Search');
  });

  it('marks the open item for styling', async () => {
    render(<ThreeItems />);
    const item = trigger('Strategy').parentElement!;

    expect(hasClassKey(item, 'open')).toBe(false);
    await userEvent.click(trigger('Strategy'));
    expect(hasClassKey(item, 'open')).toBe(true);
  });

  it('keeps caller classes on the root and on an item', () => {
    const { container } = render(
      <Accordion className="root-custom">
        <Accordion.Item id="a" title="Strategy" className="item-custom">
          Body
        </Accordion.Item>
      </Accordion>,
    );

    expect(container.firstElementChild).toHaveClass('root-custom');
    expect(container.querySelector('.item-custom')).not.toBeNull();
  });

  /** The compound contract is enforced, not just documented. */
  it('throws when an item is rendered outside an Accordion', () => {
    expect(() =>
      render(
        <Accordion.Item id="a" title="Orphan">
          Body
        </Accordion.Item>,
      ),
    ).toThrow(/must be rendered inside <Accordion>/);
  });
});
