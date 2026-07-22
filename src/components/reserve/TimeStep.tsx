import React from 'react';
import { motion } from 'motion/react';
import { TIME_SLOTS } from '../../lib/data';
import { cn } from '../../lib/utils';

interface TimeStepProps {
  value: string | null;
  onChange: (time: string) => void;
}

export function TimeStep({ value, onChange }: TimeStepProps) {
  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold text-forest-deep">
        Choose a time
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        Dinner service runs from 5:00pm to 11:00pm.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TIME_SLOTS.map((slot, i) => {
          const selected = value === slot.time;
          return (
            <motion.button
              key={slot.time}
              disabled={!slot.available}
              aria-pressed={selected}
              onClick={() => slot.available && onChange(slot.time)}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
                delay: i * 0.03,
              }}
              whileHover={
                slot.available
                  ? {
                      scale: 1.03,
                    }
                  : undefined
              }
              whileTap={
                slot.available
                  ? {
                      scale: 0.97,
                    }
                  : undefined
              }
              className={cn(
                'rounded-2xl border py-3.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50',
                !slot.available &&
                  'cursor-not-allowed border-tan/30 bg-cream text-ink-muted/40 line-through',
                slot.available &&
                  !selected &&
                  'border-tan/50 bg-cream-soft text-forest-deep hover:border-forest hover:bg-sage-soft',
                selected &&
                  'border-forest bg-forest text-cream-soft shadow-soft',
              )}
            >
              {slot.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
