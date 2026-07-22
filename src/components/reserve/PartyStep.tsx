import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MinusIcon, PlusIcon, UsersIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PartyStepProps {
  value: number;
  onChange: (guests: number) => void;
  max?: number;
}

export function PartyStep({ value, onChange, max = 20 }: PartyStepProps) {
  const dec = () => onChange(Math.max(1, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));
  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold text-forest-deep">
        Number of guests
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Parties larger than {max} — please call us directly.
      </p>

      <div className="mt-10 flex flex-col items-center gap-8 rounded-3xl border border-tan/40 bg-cream-soft p-10 shadow-soft">
        <div className="flex items-center gap-8">
          <CounterButton
            label="Remove guest"
            onClick={dec}
            disabled={value <= 1}
          >
            <MinusIcon className="h-6 w-6" />
          </CounterButton>

          <div className="flex min-w-[6rem] flex-col items-center">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{
                  scale: 0.6,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.6,
                  opacity: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 28,
                }}
                className="font-serif text-6xl font-semibold text-forest-deep"
              >
                {value}
              </motion.span>
            </AnimatePresence>
            <span className="mt-1 flex items-center gap-1 text-sm text-ink-muted">
              <UsersIcon className="h-4 w-4" aria-hidden />
              {value === 1 ? 'guest' : 'guests'}
            </span>
          </div>

          <CounterButton
            label="Add guest"
            onClick={inc}
            disabled={value >= max}
          >
            <PlusIcon className="h-6 w-6" />
          </CounterButton>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {[2, 4, 6, 8].map((n) => (
            <button
              key={n}
              onClick={() => onChange(n)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                value === n
                  ? 'border-forest bg-forest text-cream-soft'
                  : 'border-tan/50 text-ink-muted hover:border-forest hover:text-forest',
              )}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function CounterButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={{
        scale: 0.9,
      }}
      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-forest/40 text-forest transition-colors duration-200 hover:border-forest hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50"
    >
      {children}
    </motion.button>
  );
}
