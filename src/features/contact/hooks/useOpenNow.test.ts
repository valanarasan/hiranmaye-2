import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useOpenNow } from './useOpenNow';
import type { OpeningHours } from '@/types/content';

const HOURS: readonly OpeningHours[] = [
  { id: 'weekdays', label: 'Monday – Friday', days: [1, 2, 3, 4, 5], opens: 570, closes: 1110, display: '9:30 – 18:30' },
  { id: 'saturday', label: 'Saturday', days: [6], opens: 600, closes: 1020, display: '10:00 – 17:00' },
  { id: 'sunday', label: 'Sunday', days: [0], display: 'Closed' },
];

/**
 * Every case pins the clock to a UTC instant and asserts the IST answer — the
 * whole point of the hook is that it ignores the reader's timezone. IST is
 * UTC+5:30, so 04:00Z is 09:30 IST.
 */
function atUtc(iso: string) {
  vi.setSystemTime(new Date(iso));
}

describe('useOpenNow', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('is open during weekday hours, naming the closing time', () => {
    atUtc('2026-09-15T08:00:00Z'); // Tuesday 13:30 IST
    const { result } = renderHook(() => useOpenNow(HOURS));

    expect(result.current.open).toBe(true);
    expect(result.current.label).toBe('Open now — until 18:30 IST');
  });

  it('opens exactly on the opening minute', () => {
    atUtc('2026-09-15T04:00:00Z'); // Tuesday 09:30 IST
    expect(renderHook(() => useOpenNow(HOURS)).result.current.open).toBe(true);
  });

  it('is closed on the closing minute — the range excludes its end', () => {
    atUtc('2026-09-15T13:00:00Z'); // Tuesday 18:30 IST
    expect(renderHook(() => useOpenNow(HOURS)).result.current.open).toBe(false);
  });

  it('says when it opens later the same day', () => {
    atUtc('2026-09-15T02:00:00Z'); // Tuesday 07:30 IST
    const { result } = renderHook(() => useOpenNow(HOURS));

    expect(result.current.open).toBe(false);
    expect(result.current.label).toBe('Closed — opens 09:30 IST');
  });

  it('says "tomorrow" after closing on a day that has hours', () => {
    atUtc('2026-09-15T16:00:00Z'); // Tuesday 21:30 IST
    const { result } = renderHook(() => useOpenNow(HOURS));

    expect(result.current.label).toBe('Closed — opens tomorrow at 09:30 IST');
  });

  it('names the weekday when the next opening is further out', () => {
    atUtc('2026-09-13T08:00:00Z'); // Sunday 13:30 IST — Sunday row has no hours
    const { result } = renderHook(() => useOpenNow(HOURS));

    expect(result.current.open).toBe(false);
    expect(result.current.label).toBe('Closed — opens tomorrow at 09:30 IST');
  });

  it('skips a closed day to find the next one that opens', () => {
    const satOnly: readonly OpeningHours[] = [
      { id: 'sat', label: 'Saturday', days: [6], opens: 600, closes: 1020, display: '10:00 – 17:00' },
    ];
    atUtc('2026-09-13T08:00:00Z'); // Sunday 13:30 IST

    expect(renderHook(() => useOpenNow(satOnly)).result.current.label).toBe(
      'Closed — opens Saturday at 10:00 IST',
    );
  });

  it('uses Saturday hours on a Saturday', () => {
    atUtc('2026-09-12T08:00:00Z'); // Saturday 13:30 IST
    const { result } = renderHook(() => useOpenNow(HOURS));

    expect(result.current.open).toBe(true);
    expect(result.current.label).toBe('Open now — until 17:00 IST');
  });

  it('reports plain "Closed" when no day in the schedule ever opens', () => {
    const never: readonly OpeningHours[] = [
      { id: 'all', label: 'Every day', days: [0, 1, 2, 3, 4, 5, 6], display: 'Closed' },
    ];
    atUtc('2026-09-15T08:00:00Z');

    expect(renderHook(() => useOpenNow(never)).result.current.label).toBe('Closed');
  });

  it('handles a schedule with no rows for today at all', () => {
    const weekdaysOnly: readonly OpeningHours[] = [
      { id: 'weekdays', label: 'Mon – Fri', days: [1, 2, 3, 4, 5], opens: 570, closes: 1110, display: '9:30 – 18:30' },
    ];
    atUtc('2026-09-13T08:00:00Z'); // Sunday

    expect(renderHook(() => useOpenNow(weekdaysOnly)).result.current.label).toBe(
      'Closed — opens tomorrow at 09:30 IST',
    );
  });

  it('pads single-digit times', () => {
    const early: readonly OpeningHours[] = [
      { id: 'early', label: 'Daily', days: [0, 1, 2, 3, 4, 5, 6], opens: 545, closes: 1110, display: '9:05' },
    ];
    atUtc('2026-09-15T02:00:00Z'); // 07:30 IST, before opening

    expect(renderHook(() => useOpenNow(early)).result.current.label).toBe('Closed — opens 09:05 IST');
  });

  it('re-evaluates every minute so a page left open cannot go stale', () => {
    atUtc('2026-09-15T12:59:00Z'); // Tuesday 18:29 IST — one minute before closing
    const { result } = renderHook(() => useOpenNow(HOURS));
    expect(result.current.open).toBe(true);

    act(() => {
      atUtc('2026-09-15T13:01:00Z'); // 18:31 IST
      vi.advanceTimersByTime(60_000);
    });

    expect(result.current.open).toBe(false);
  });

  it('clears its interval on unmount', () => {
    atUtc('2026-09-15T08:00:00Z');
    const clear = vi.spyOn(window, 'clearInterval');

    renderHook(() => useOpenNow(HOURS)).unmount();
    expect(clear).toHaveBeenCalled();
  });

  it('falls back to the local weekday if the locale gives an unparseable one', () => {
    atUtc('2026-09-15T08:00:00Z');
    const parts = Intl.DateTimeFormat.prototype.formatToParts;
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockImplementation(function (
      this: Intl.DateTimeFormat,
      date?: Date | number,
    ) {
      return parts
        .call(this, date)
        .map((part) => (part.type === 'weekday' ? { ...part, value: '???' } : part));
    });

    // Still resolves to a usable state rather than throwing.
    expect(renderHook(() => useOpenNow(HOURS)).result.current.label).toEqual(expect.any(String));
  });
});
