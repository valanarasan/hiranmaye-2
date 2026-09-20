import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './ContactForm';
import { challengeOptions, contactAssurances } from '@/content/contact';
import { site } from '@/content/site';
import { renderWithRouter } from '@/test/utils';

const WA = 'https://wa.me/919900668383';

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Your name'), 'Valan');
  await user.type(screen.getByLabelText('Company'), 'Acme Foods');
  await user.type(screen.getByLabelText('Where is the business today?'), 'Enquiries have flattened.');
}

const submitButton = () => screen.getByRole('button', { name: /Continue on WhatsApp/ });

describe('ContactForm', () => {
  let open: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    open = vi.fn(() => ({}) as Window);
    vi.stubGlobal('open', open);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('offers every challenge option', () => {
    renderWithRouter(<ContactForm />);
    const select = screen.getByLabelText("What's holding growth back?");

    for (const option of challengeOptions) {
      expect(screen.getByRole('option', { name: option })).toBeInTheDocument();
    }
    expect(select).toHaveValue('');
  });

  it('pre-selects a challenge from the ?challenge= link', () => {
    renderWithRouter(<ContactForm />, { route: '/contact?challenge=High%20ad%20costs' });
    expect(screen.getByLabelText("What's holding growth back?")).toHaveValue('High ad costs');
  });

  it('shows errors and opens nothing when the form is invalid', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);

    await user.click(submitButton());

    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(2);
    expect(open).not.toHaveBeenCalled();
  });

  it('opens WhatsApp in a new tab with the message pre-written', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);
    await user.selectOptions(screen.getByLabelText("What's holding growth back?"), 'Not enough leads');

    await user.click(submitButton());

    expect(open).toHaveBeenCalledOnce();
    const [url, target, features] = open.mock.calls[0]!;
    expect(url).toMatch(new RegExp(`^${WA}\\?text=`));
    expect(target).toBe('_blank');
    expect(features).toContain('noopener');

    const text = new URL(url as string).searchParams.get('text')!;
    expect(text).toContain("I'm Valan from Acme Foods");
    expect(text).toContain('Enquiries have flattened.');
    expect(text).toContain('Not enough leads');
  });

  it('falls back to navigating this tab when the new tab is blocked', async () => {
    open.mockReturnValue(null);
    const assign = vi.fn();
    vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, assign });
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);

    await user.click(submitButton());

    expect(assign).toHaveBeenCalledWith(expect.stringMatching(new RegExp(`^${WA}\\?text=`)));
  });

  it('confirms honestly — nothing is sent until they press send in WhatsApp', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);

    await user.click(submitButton());

    expect(screen.getByRole('heading', { name: /ready in WhatsApp/ })).toBeInTheDocument();
    expect(screen.queryByText(/has reached us/)).toBeNull();
  });

  it('offers a manual link carrying the same message', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);
    await user.click(submitButton());

    const link = screen.getByRole('link', { name: /didn't open/ });
    expect(link).toHaveAttribute('href', open.mock.calls[0]![0]);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('returns to the filled form on "Edit my message"', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);
    await user.click(submitButton());

    await user.click(screen.getByRole('button', { name: 'Edit my message' }));

    expect(screen.getByLabelText('Your name')).toHaveValue('Valan');
  });

  it('keeps email and phone optional, validating them only when filled', async () => {
    const user = userEvent.setup();
    renderWithRouter(<ContactForm />);
    await fillValid(user);
    await user.type(screen.getByLabelText('Email'), 'not-an-email');
    await user.type(screen.getByLabelText('Phone'), '12');

    await user.click(submitButton());

    expect(screen.getByText('That email address looks incomplete.')).toBeInTheDocument();
    expect(screen.getByText('That phone number looks incomplete.')).toBeInTheDocument();
    expect(open).not.toHaveBeenCalled();
  });

  it('lists direct phone and email alongside the form, with the assurances', () => {
    renderWithRouter(<ContactForm />);

    expect(screen.getByRole('link', { name: site.phone })).toHaveAttribute('href', `tel:${site.phoneRaw}`);
    expect(screen.getByRole('link', { name: site.email })).toHaveAttribute('href', `mailto:${site.email}`);
    for (const line of contactAssurances) expect(screen.getByText(line)).toBeInTheDocument();
  });
});
