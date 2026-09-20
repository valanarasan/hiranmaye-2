import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { newsletter } from '@/content/insights';
import { hasClassKey } from '@/test/utils';
import { Newsletter } from './Newsletter';

const IDLE_NOTE = 'One email. No spam. Unsubscribe whenever you like.';
const DONE_NOTE = 'Thank you — you are on the list.';

describe('Newsletter', () => {
  it('announces itself with the headline from the content layer', () => {
    render(<Newsletter />);

    expect(
      screen.getByRole('region', { name: newsletter.headline }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: newsletter.headline })).toBeInTheDocument();
    expect(screen.getByText(newsletter.body)).toBeInTheDocument();
  });

  it('offers a labelled email field and the subscribe action', () => {
    render(<Newsletter />);

    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('type', 'email');
    expect(screen.getByRole('button', { name: newsletter.cta })).toHaveAttribute('type', 'submit');
    expect(screen.getByText(IDLE_NOTE)).toBeInTheDocument();
  });

  it('records what the visitor types', async () => {
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText('Email address'), 'reader@company.com');

    expect(screen.getByLabelText('Email address')).toHaveValue('reader@company.com');
  });

  it('confirms the subscription once a plausible address is submitted', async () => {
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText('Email address'), 'reader@company.com');
    await userEvent.click(screen.getByRole('button', { name: newsletter.cta }));

    const note = screen.getByText(DONE_NOTE);
    expect(note).toBeInTheDocument();
    expect(hasClassKey(note, 'done')).toBe(true);
    expect(screen.queryByText(IDLE_NOTE)).not.toBeInTheDocument();
  });

  it('ignores a submission with no at-sign in it', async () => {
    render(<Newsletter />);

    await userEvent.type(screen.getByLabelText('Email address'), 'not-an-address');
    await userEvent.click(screen.getByRole('button', { name: newsletter.cta }));

    expect(screen.getByText(IDLE_NOTE)).toBeInTheDocument();
    expect(screen.queryByText(DONE_NOTE)).not.toBeInTheDocument();
  });
});
