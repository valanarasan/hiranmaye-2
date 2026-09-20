import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Field } from './Field';
import { hasClassKey } from '@/test/utils';

describe('Field', () => {
  it('wires the label to the control it renders', () => {
    render(<Field label="Your name">{(props) => <input {...props} />}</Field>);

    const input = screen.getByLabelText('Your name');
    expect(input.tagName).toBe('INPUT');
    expect(input.id).toBeTruthy();
  });

  it('hands the control its own class so callers never style it', () => {
    render(<Field label="Your name">{(props) => <input {...props} />}</Field>);
    expect(hasClassKey(screen.getByLabelText('Your name'), 'control')).toBe(true);
  });

  it('is valid and undescribed with no error', () => {
    render(<Field label="Your name">{(props) => <input {...props} />}</Field>);

    const input = screen.getByLabelText('Your name');
    expect(input).toHaveAttribute('aria-invalid', 'false');
    expect(input).not.toHaveAttribute('aria-describedby');
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('announces an error and points the control at it', () => {
    render(
      <Field label="Your name" error="Please tell us your name.">
        {(props) => <input {...props} />}
      </Field>,
    );

    const input = screen.getByLabelText('Your name');
    const alert = screen.getByRole('alert');

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);
    expect(alert).toHaveTextContent('Please tell us your name.');
  });

  it('marks the wrapper invalid so the styling can respond', () => {
    const { container, rerender } = render(
      <Field label="Your name">{(props) => <input {...props} />}</Field>,
    );
    expect(hasClassKey(container.firstElementChild!, 'invalid')).toBe(false);

    rerender(
      <Field label="Your name" error="Required">
        {(props) => <input {...props} />}
      </Field>,
    );
    expect(hasClassKey(container.firstElementChild!, 'invalid')).toBe(true);
  });

  it('works with any control, not just inputs', () => {
    render(
      <Field label="Challenge">
        {(props) => (
          <select {...props}>
            <option value="leads">Not enough leads</option>
          </select>
        )}
      </Field>,
    );
    expect(screen.getByLabelText('Challenge').tagName).toBe('SELECT');

    render(
      <Field label="Message">{(props) => <textarea {...props} />}</Field>,
    );
    expect(screen.getByLabelText('Message').tagName).toBe('TEXTAREA');
  });

  it('gives each instance a distinct id', () => {
    render(
      <>
        <Field label="First">{(props) => <input {...props} />}</Field>
        <Field label="Second">{(props) => <input {...props} />}</Field>
      </>,
    );

    expect(screen.getByLabelText('First').id).not.toBe(screen.getByLabelText('Second').id);
  });

  it('keeps caller classes on the wrapper', () => {
    const { container } = render(
      <Field label="Your name" className="custom">
        {(props) => <input {...props} />}
      </Field>,
    );
    expect(container.firstElementChild).toHaveClass('custom');
  });
});
