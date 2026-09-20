import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import { hasClassKey } from '@/test/utils';

describe('Text', () => {
  it('defaults to a paragraph in the body variant', () => {
    render(<Text>Copy</Text>);
    const node = screen.getByText('Copy');

    expect(node.tagName).toBe('P');
    expect(hasClassKey(node, 'body')).toBe(true);
  });

  it.each([
    ['display', 'H1'],
    ['h1', 'H1'],
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
    ['eyebrow', 'SPAN'],
    ['lead', 'P'],
    ['body', 'P'],
    ['small', 'P'],
  ] as const)('maps the %s variant to <%s>', (variant, tag) => {
    render(<Text variant={variant}>Copy</Text>);

    const node = screen.getByText('Copy');
    expect(node.tagName).toBe(tag);
    expect(hasClassKey(node, variant)).toBe(true);
  });

  it('lets an explicit tag override the variant default', () => {
    render(
      <Text variant="h2" as="div">
        Heading
      </Text>,
    );
    expect(screen.getByText('Heading').tagName).toBe('DIV');
  });

  it('emits no tone class for the default tone', () => {
    render(<Text>Copy</Text>);
    expect(screen.getByText('Copy').className).not.toMatch(/tone/i);
  });

  it.each([
    ['muted', 'toneMuted'],
    ['faint', 'toneFaint'],
    ['accent', 'toneAccent'],
    ['inverse', 'toneInverse'],
    ['inverseMuted', 'toneInverseMuted'],
  ] as const)('applies the %s tone', (tone, key) => {
    render(<Text tone={tone}>Copy</Text>);
    expect(hasClassKey(screen.getByText('Copy'), key)).toBe(true);
  });

  it('toggles italic and balance independently', () => {
    const { rerender } = render(<Text>Copy</Text>);
    expect(hasClassKey(screen.getByText('Copy'), 'italic')).toBe(false);
    expect(hasClassKey(screen.getByText('Copy'), 'balance')).toBe(false);

    rerender(
      <Text italic balance>
        Copy
      </Text>,
    );
    expect(hasClassKey(screen.getByText('Copy'), 'italic')).toBe(true);
    expect(hasClassKey(screen.getByText('Copy'), 'balance')).toBe(true);
  });

  it('forwards arbitrary props, such as the id a section header labels with', () => {
    render(<Text id="contact-title">Contact</Text>);
    expect(screen.getByText('Contact')).toHaveAttribute('id', 'contact-title');
  });

  it('keeps caller classes', () => {
    render(<Text className="custom">Copy</Text>);
    expect(screen.getByText('Copy')).toHaveClass('custom');
  });
});
