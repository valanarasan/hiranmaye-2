import { useEffect, useState } from 'react';
import type { OpeningHours } from '@/types/content';

export interface OpenState {
  open: boolean;
  /** Short human summary, e.g. "Open until 18:30" or "Closed — opens Monday". */
  label: string;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Current weekday and minutes-from-midnight in India Standard Time. */
function nowInIndia(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const get = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const weekday = get('weekday').slice(0, 3).toLowerCase();
  const day = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].indexOf(weekday);
  const hour = Number(get('hour'));
  const minute = Number(get('minute'));

  return { day: day < 0 ? new Date().getDay() : day, minutes: hour * 60 + minute };
}

function format(minutes: number): string {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

function resolve(hours: readonly OpeningHours[]): OpenState {
  const { day, minutes } = nowInIndia();
  const today = hours.find((row) => row.days.includes(day));

  if (today?.opens !== undefined && today.closes !== undefined) {
    if (minutes >= today.opens && minutes < today.closes) {
      return { open: true, label: `Open now — until ${format(today.closes)} IST` };
    }
    if (minutes < today.opens) {
      return { open: false, label: `Closed — opens ${format(today.opens)} IST` };
    }
  }

  // Walk forward to the next day that has hours.
  for (let step = 1; step <= 7; step += 1) {
    const next = (day + step) % 7;
    const row = hours.find((item) => item.days.includes(next));
    if (row?.opens !== undefined) {
      const when = step === 1 ? 'tomorrow' : DAY_NAMES[next];
      return { open: false, label: `Closed — opens ${when} at ${format(row.opens)} IST` };
    }
  }

  return { open: false, label: 'Closed' };
}

/**
 * Whether the studio is open right now, in its own timezone rather than the
 * reader's — a visitor in London should see Bengaluru's clock, not their own.
 * Re-checks every minute so the badge cannot go stale on a page left open.
 */
export function useOpenNow(hours: readonly OpeningHours[]): OpenState {
  const [state, setState] = useState<OpenState>(() => resolve(hours));

  useEffect(() => {
    setState(resolve(hours));
    const timer = window.setInterval(() => setState(resolve(hours)), 60_000);
    return () => window.clearInterval(timer);
  }, [hours]);

  return state;
}
