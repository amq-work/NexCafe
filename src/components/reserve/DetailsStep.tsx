import React from 'react';
import { motion } from 'motion/react';
import { CheckIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface GuestDetails {
  name: string;
  phone: string;
  email: string;
  requests: string;
}

export interface FieldErrors {
  name?: string;
  phone?: string;
  email?: string;
}

interface DetailsStepProps {
  details: GuestDetails;
  errors: FieldErrors;
  onChange: (patch: Partial<GuestDetails>) => void;
}

const PHONE_RE = /^\+?[0-9 ().-]{7,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateDetails(details: GuestDetails): FieldErrors {
  const errors: FieldErrors = {};
  if (!details.name.trim()) errors.name = 'Please enter your name';
  if (!details.phone.trim())
    errors.phone = 'A phone number lets us confirm your table';
  else if (!PHONE_RE.test(details.phone.trim()))
    errors.phone = 'That phone number looks incomplete';
  if (details.email.trim() && !EMAIL_RE.test(details.email.trim()))
    errors.email = 'Please enter a valid email';
  return errors;
}

export function DetailsStep({ details, errors, onChange }: DetailsStepProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold text-forest-deep">
        Your details
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Just the essentials — no account needed.
      </p>

      <div className="mt-8 space-y-5">
        <Field
          id="name"
          label="Full name"
          required
          placeholder="John Doe"
          value={details.name}
          error={errors.name}
          valid={!!details.name.trim() && !errors.name}
          onChange={(v) =>
            onChange({
              name: v,
            })
          }
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          required
          placeholder="+1 (555) 000-0000"
          value={details.phone}
          error={errors.phone}
          valid={!!details.phone.trim() && !errors.phone}
          onChange={(v) =>
            onChange({
              phone: v,
            })
          }
        />
        <Field
          id="email"
          label="Email"
          type="email"
          placeholder="you@example.com (optional)"
          value={details.email}
          error={errors.email}
          valid={!!details.email.trim() && !errors.email}
          onChange={(v) =>
            onChange({
              email: v,
            })
          }
        />
        <div>
          <label
            htmlFor="requests"
            className="mb-1.5 block text-sm font-medium text-forest-deep"
          >
            Special requests <span className="text-ink-muted">(optional)</span>
          </label>
          <textarea
            id="requests"
            rows={3}
            placeholder="Allergies, celebrations, seating preferences…"
            value={details.requests}
            onChange={(e) =>
              onChange({
                requests: e.target.value,
              })
            }
            className="w-full resize-none rounded-2xl border border-tan/50 bg-cream-soft px-4 py-3 text-sm text-forest-deep placeholder:text-ink-muted/50 transition-colors focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/30"
          />
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder: string;
  value: string;
  error?: string;
  valid: boolean;
  onChange: (value: string) => void;
}

function Field({
  id,
  label,
  type = 'text',
  required,
  placeholder,
  value,
  error,
  valid,
  onChange,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-forest-deep"
      >
        {label} {required && <span className="text-sriracha">*</span>}
      </label>
      <motion.div
        animate={
          error
            ? {
                x: [0, -6, 6, -4, 4, 0],
              }
            : {
                x: 0,
              }
        }
        transition={{
          duration: 0.35,
        }}
        className="relative"
      >
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full rounded-2xl border bg-cream-soft px-4 py-3 pr-10 text-sm text-forest-deep placeholder:text-ink-muted/50 transition-colors focus:outline-none focus:ring-2',
            error
              ? 'border-sriracha focus:border-sriracha focus:ring-sriracha/25'
              : 'border-tan/50 focus:border-forest focus:ring-forest/30',
          )}
        />
        {valid && (
          <CheckIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-forest" />
        )}
      </motion.div>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 flex items-center gap-1.5 text-xs text-sriracha"
          role="alert"
        >
          <AlertCircleIcon className="h-3.5 w-3.5" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
