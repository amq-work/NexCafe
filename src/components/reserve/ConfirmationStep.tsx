import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import {
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
  MailIcon,
  User,
  Sparkles,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { TABLES, TIME_SLOTS, RESTAURANT } from '../../lib/data';

interface ConfirmationStepProps {
  date: Date | null;
  time: string | null;
  guests: number;
  tableId: number | null;
  name: string;
  email: string;
  reservationId: string;
  customerId?: string;
}

export function ConfirmationStep({
  date,
  time,
  guests,
  tableId,
  name,
  email,
  reservationId,
  customerId,
}: ConfirmationStepProps) {
  const navigate = useNavigate();
  const table = TABLES.find((t) => t.id === tableId);
  const timeLabel = TIME_SLOTS.find((s) => s.time === time)?.label ?? time;

  return (
    <div className="text-center">
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
          delay: 0.1,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest text-cream-soft"
      >
        <motion.span
          initial={{
            scale: 0,
            rotate: -20,
          }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
            delay: 0.35,
          }}
        >
          <CheckIcon className="h-10 w-10" strokeWidth={2.5} />
        </motion.span>
      </motion.div>

      <motion.h2
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
        className="mt-6 font-serif text-4xl font-semibold text-forest-deep"
      >
        Table reserved
      </motion.h2>
      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.5,
        }}
        className="mt-2 text-sm text-ink-muted"
      >
        Thank you, {name.split(' ')[0] || 'guest'}. We can't wait to host you at{' '}
        {RESTAURANT.name}.
      </motion.p>

      <motion.div
        initial={{
          opacity: 0,
          y: 16,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.55,
        }}
        className="mx-auto mt-8 max-w-md rounded-3xl border border-tan/40 bg-cream-soft p-6 text-left shadow-soft"
      >
        <div className="flex items-center justify-between border-b border-tan/40 pb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Confirmation
          </span>
          <span className="font-mono text-sm font-semibold text-forest">
            {reservationId}
          </span>
        </div>
        <dl className="mt-4 space-y-3 text-sm">
          <Row
            icon={CalendarIcon}
            label="Date"
            value={date ? format(date, 'EEEE, MMMM d, yyyy') : '—'}
          />
          <Row icon={ClockIcon} label="Time" value={timeLabel ?? '—'} />
          <Row
            icon={UsersIcon}
            label="Party"
            value={`${guests} ${guests === 1 ? 'guest' : 'guests'}`}
          />
          <Row
            icon={MapPinIcon}
            label="Table"
            value={table ? `${table.number} (seats ${table.capacity})` : '—'}
          />
          {customerId && (
            <Row
              icon={User}
              label="Customer ID"
              value={customerId}
            />
          )}
        </dl>
        {customerId && (
          <div className="mt-5 rounded-2xl bg-forest/5 border border-[#AAD08D]/35 p-4 text-xs text-forest-deep flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#5C9A42] text-[10px]">
              <Sparkles className="h-3.5 w-3.5 text-forest shrink-0" />
              <span>Pre-order Meal Available</span>
            </div>
            <p className="text-[#1A2E1A]/80 leading-relaxed font-sans">
              Help our kitchen pre-prep for your table and prevent food wastage. Pre-order now and pay only a <strong>50% prep deposit</strong> today!
            </p>
            <div className="flex items-center justify-between bg-white border border-[#DFE7CF]/30 rounded-xl px-3 py-2 mt-1">
              <span className="font-mono text-sm font-bold text-forest tracking-wider select-all">
                {customerId}
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(customerId);
                }}
                className="text-[10px] font-bold uppercase tracking-wider text-forest hover:text-forest-deep underline underline-offset-2 cursor-pointer"
              >
                Copy ID
              </button>
            </div>
            <Button
              variant="glass"
              size="sm"
              onClick={() => navigate('/pre-order')}
              className="mt-1 text-xs py-2 w-full flex items-center justify-center gap-1.5"
            >
              <span>Go to Pre-Order Meal</span>
            </Button>
          </div>
        )}
        {email && (
          <p className="mt-4 flex items-center gap-2 rounded-xl bg-sage-soft/50 px-4 py-3 text-xs text-forest-deep">
            <MailIcon className="h-4 w-4 shrink-0 text-forest" aria-hidden />
            A confirmation has been sent to {email}. Our support team will contact you shortly for final reservation confirmation.
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.7,
        }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        <Button theme="light" onClick={() => navigate('/')}>Back to home</Button>
        <Button variant="secondary" theme="light" onClick={() => navigate(0)}>
          Make another booking
        </Button>
      </motion.div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof CalendarIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="flex items-center gap-2 text-ink-muted">
        <Icon className="h-4 w-4 text-green" aria-hidden />
        {label}
      </dt>
      <dd className="font-medium text-forest-deep">{value}</dd>
    </div>
  );
}
