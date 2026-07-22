import React, { useState } from 'react';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { IconButton } from '../ui/Button';
import { cn } from '../../lib/utils';

interface DateStepProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function DateStep({ value, onChange }: DateStepProps) {
  const today = startOfDay(new Date());
  const [month, setMonth] = useState(startOfMonth(value ?? today));
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold text-forest-deep">
        Choose a date
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        When would you like to join us?
      </p>

      <div className="mt-8 rounded-3xl border border-tan/40 bg-cream-soft p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <IconButton
            label="Previous month"
            onClick={() => setMonth(addMonths(month, -1))}
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </IconButton>
          <p className="font-serif text-lg font-medium text-forest-deep">
            {format(month, 'MMMM yyyy')}
          </p>
          <IconButton
            label="Next month"
            onClick={() => setMonth(addMonths(month, 1))}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center">
          {WEEKDAYS.map((d, i) => (
            <span
              key={i}
              className="py-2 text-xs font-semibold uppercase tracking-wide text-ink-muted"
            >
              {d}
            </span>
          ))}
          {days.map((day) => {
            const disabled = isBefore(day, today);
            const outside = !isSameMonth(day, month);
            const selected = value && isSameDay(day, value);
            const isToday = isSameDay(day, today);
            return (
              <button
                key={day.toISOString()}
                disabled={disabled}
                aria-pressed={!!selected}
                aria-label={format(day, 'EEEE, MMMM d')}
                onClick={() => onChange(day)}
                className={cn(
                  'relative aspect-square rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50',
                  disabled && 'cursor-not-allowed text-ink-muted/30',
                  !disabled &&
                    !selected &&
                    'text-forest-deep hover:bg-sage-soft',
                  outside && !selected && 'text-ink-muted/40',
                  selected && 'bg-forest text-cream-soft shadow-soft',
                )}
              >
                {format(day, 'd')}
                {isToday && !selected && (
                  <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
