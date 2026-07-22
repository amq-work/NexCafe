import React from 'react';
import { motion } from 'motion/react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <nav aria-label="Reservation progress" className="w-full">
      <ol className="flex items-start justify-between w-full">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <React.Fragment key={label}>
              {/* Step Column */}
              <div className="flex flex-col items-center text-center relative z-10 shrink-0">
                <span
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-300',
                    done && 'border-forest bg-forest text-cream-soft',
                    active && 'border-forest bg-cream-soft text-forest ring-4 ring-forest/10',
                    !done &&
                      !active &&
                      'border-tan/60 bg-cream-soft text-ink-muted',
                  )}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'mt-2 text-[10px] font-bold uppercase tracking-wider hidden sm:block',
                    active ? 'text-forest' : 'text-ink-muted',
                  )}
                >
                  {label}
                </span>
              </div>
              
              {/* Perfectly Centered Connecting Line */}
              {i < steps.length - 1 && (
                <div className="mt-[17px] h-0.5 flex-1 mx-2 bg-tan/40 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full bg-forest"
                    initial={false}
                    animate={{
                      width: done ? '100%' : '0%',
                    }}
                    transition={{
                      duration: 0.4,
                      ease: 'easeInOut',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
