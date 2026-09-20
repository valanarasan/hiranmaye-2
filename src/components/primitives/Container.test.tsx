import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';
import { classKeys, hasClassKey } from '@/test/utils';

describe('Container', () => {
  it('renders a div at the default width', () => {
    render(<Container>Body</Container>);
    const node = screen.getByText('Body');

    expect(node.tagName).toBe('DIV');
    expect(classKeys(node)).toEqual(['container']);
  });

  it.each(['narrow', 'flush'] as const)('applies the %s width', (width) => {
    render(<Container width={width}>Body</Container>);
    expect(hasClassKey(screen.getByText('Body'), width)).toBe(true);
  });

  it('renders as another element when asked', () => {
    render(<Container as="main">Body</Container>);
    expect(screen.getByText('Body').tagName).toBe('MAIN');
  });

  it('forwards props and caller classes', () => {
    render(
      <Container className="custom" data-testid="wrap">
        Body
      </Container>,
    );
    expect(screen.getByTestId('wrap')).toHaveClass('custom');
  });
});
