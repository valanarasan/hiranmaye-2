import { describe, expect, it } from 'vitest';
import { cx } from './cx';

describe('cx', () => {
  it('joins truthy values with a single space', () => {
    expect(cx('a', 'b', 'c')).toBe('a b c');
  });

  it('drops every falsy value so callers can inline conditions', () => {
    expect(cx('a', false, null, undefined, 0, '', 'b')).toBe('a b');
  });

  it('returns an empty string when nothing survives', () => {
    expect(cx(false, null, undefined)).toBe('');
    expect(cx()).toBe('');
  });

  it('keeps non-zero numbers, which are legitimate class fragments', () => {
    expect(cx('col', 4)).toBe('col 4');
  });
});
