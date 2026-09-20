import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';
import { hasClassKey } from '@/test/utils';

describe('Stack', () => {
  it('defaults to a column with gap 4, stretched', () => {
    render(<Stack>Body</Stack>);
    const node = screen.getByText('Body');

    expect(node.tagName).toBe('DIV');
    expect(hasClassKey(node, 'stack')).toBe(true);
    expect(hasClassKey(node, 'gap4')).toBe(true);
    expect(hasClassKey(node, 'alignStretch')).toBe(true);
    expect(hasClassKey(node, 'row')).toBe(false);
  });

  it('switches to a row', () => {
    render(<Stack direction="row">Body</Stack>);
    expect(hasClassKey(screen.getByText('Body'), 'row')).toBe(true);
  });

  it.each([1, 2, 3, 4, 5, 6, 7, 8] as const)('applies gap %i', (gap) => {
    render(<Stack gap={gap}>Body</Stack>);
    expect(hasClassKey(screen.getByText('Body'), `gap${gap}`)).toBe(true);
  });

  it.each([
    ['start', 'alignStart'],
    ['center', 'alignCenter'],
    ['end', 'alignEnd'],
    ['stretch', 'alignStretch'],
  ] as const)('applies the %s alignment', (align, key) => {
    render(<Stack align={align}>Body</Stack>);
    expect(hasClassKey(screen.getByText('Body'), key)).toBe(true);
  });

  it('toggles wrapping', () => {
    const { rerender } = render(<Stack>Body</Stack>);
    expect(hasClassKey(screen.getByText('Body'), 'wrap')).toBe(false);

    rerender(<Stack wrap>Body</Stack>);
    expect(hasClassKey(screen.getByText('Body'), 'wrap')).toBe(true);
  });

  it('renders as another element and keeps caller classes', () => {
    render(
      <Stack as="ul" className="custom">
        Body
      </Stack>,
    );
    const node = screen.getByText('Body');

    expect(node.tagName).toBe('UL');
    expect(node).toHaveClass('custom');
  });
});
