import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2Icon, 
  SparklesIcon, 
  CalendarIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from 'lucide-react';
import { FloorMap } from '../FloorMap';
import { TABLES } from '../../lib/data';
import { DiningTable } from '../../types';
import { cn } from '../../lib/utils';
import { Button, IconButton } from '../ui/Button';
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

interface TableStepProps {
  guests: number;
  selectedId: number | null;
  onSelect: (table: DiningTable) => void;
  date?: Date | null;
  onChangeDate?: (date: Date) => void;
}

// Deterministic pseudo-random status for a table based on its ID and the selected date.
// This ensures table availability remains consistent for a given date, but differs across dates.
const getDynamicTables = (date: Date | null): DiningTable[] => {
  if (!date) return TABLES;
  const day = date.getDate();
  const monthVal = date.getMonth();
  return TABLES.map((table) => {
    // Generate a pseudo-random value based on table ID, day, and month
    const val = (table.id * 13 + day * 19 + monthVal * 7) % 100;
    let status: DiningTable['status'] = 'available';
    if (val < 18) {
      status = 'reserved';
    } else if (val < 25) {
      status = 'blocked';
    } else if (val < 30) {
      status = 'occupied';
    } else if (val < 34) {
      status = 'cleaning';
    }
    return {
      ...table,
      status,
    };
  });
};

const ZONE_METADATA: Record<string, {
  name: string;
  ambiance: string;
  seating: string;
  vibe: string;
  features: string[];
  emoji: string;
}> = {
  main_hall: {
    name: 'Main Dining Hall',
    ambiance: 'A grand, airy space with soaring ceilings, custom warm plaster wall finishes, and gorgeous minimalist brass lighting.',
    seating: 'Handcrafted white-oak chairs with supportive leather cushions.',
    vibe: 'Ideal for dynamic dinner parties, long social evenings, and fine wine pairings.',
    features: ['Soaring Ceilings', 'Impeccable Acoustics', 'Warm Ambient Lighting'],
    emoji: '🏛️',
  },
  window_seating: {
    name: 'Window Promenade',
    ambiance: 'Nestled alongside our massive floor-to-ceiling glass panel windows, enjoying natural streetscape views.',
    seating: 'Elegant upholstered velvet club chairs and banquettes.',
    vibe: 'Perfect for couples, quiet conversations, and bright afternoon lunches.',
    features: ['Panoramic Glass', 'Sunlit Atmosphere', 'Streetscape Views'],
    emoji: '🪟',
  },
  outdoor_patio: {
    name: 'Heated Outdoor Patio',
    ambiance: 'Al fresco dining on polished concrete terrace tile, surrounded by climbing jasmine and steel pergolas.',
    seating: 'Woven rattan tub chairs with deep weather-sealed linen cushions.',
    vibe: 'Excellent for sunset cocktails, breezy summer nights, and casual gatherings.',
    features: ['Fresh Air Decking', 'Overhead Heaters', 'Lush Accent Plants'],
    emoji: '🌿',
  },
  vip_room: {
    name: 'The VIP Conservatory',
    ambiance: 'An ultra-exclusive, private room behind thin black-metal and glass-paneled double doors for supreme discretion.',
    seating: 'Plush full-grain leather armchairs.',
    vibe: 'Designed for high-profile hosts, business banquets, and absolute acoustic privacy.',
    features: ['Discreet Side Entry', 'Private Dedicated Host', 'Acoustically Isolated'],
    emoji: '✨',
  },
  private_dining: {
    name: 'Private Oak Dining Room',
    ambiance: 'A rich, moody space crafted in dark walnut cladding, featuring a hand-selected monochrome photography gallery.',
    seating: 'Premium highback leather dining chairs around solid oak slab tables.',
    vibe: 'Tailored for family celebrations, private board meetings, and intimate gatherings.',
    features: ['Full Privacy Screen', 'Acoustic Wall Panels', 'Sommelier Wine Cabinets'],
    emoji: '🍷',
  },
  bar_area: {
    name: 'The Brass Bar & Lounge',
    ambiance: 'A high-energy, sophisticated bar zone built with a solid hand-polished brass counter under low warm pendants.',
    seating: 'Sleek custom leather highbar stools and wrap-around booths.',
    vibe: 'Great for craft cocktail aficionados, interactive raw-bar dining, and quick bites.',
    features: ['Custom Brass Counter', 'Active Mixologist Bar', 'Interactive Dining'],
    emoji: '🍸',
  },
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function TableStep({ 
  guests, 
  selectedId, 
  onSelect, 
  date = null, 
  onChangeDate 
}: TableStepProps) {
  const today = startOfDay(new Date());
  const activeDate = date ?? today;
  const [showCalendar, setShowCalendar] = useState(false);
  const [month, setMonth] = useState(startOfMonth(activeDate));

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  });

  const dynamicTables = React.useMemo(() => {
    return getDynamicTables(activeDate);
  }, [activeDate]);

  const selected = dynamicTables.find((t) => t.id === selectedId) ?? null;

  const autoPick = () => {
    // Find available tables with at least the guest capacity, sorted by closest capacity match
    const best = dynamicTables.filter(
      (t) => t.status === 'available' && t.capacity >= guests,
    ).sort((a, b) => a.capacity - b.capacity)[0];
    if (best) onSelect(best);
  };

  return (
    <div>
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-serif text-3xl font-semibold text-forest-deep">
            Choose a table
          </h2>
          <p className="mt-2 text-sm text-ink-muted">
            Showing tables that seat {guests}{' '}
            {guests === 1 ? 'guest' : 'guests'} or more.
          </p>
        </div>
        <Button
          variant="glass"
          size="sm"
          onClick={autoPick}
          className="gap-1.5"
        >
          <SparklesIcon className="h-4 w-4" aria-hidden />
          Best available
        </Button>
      </div>

      {/* Elegant Calendar-based Date Picker Box */}
      <div className="mt-6 mb-8 rounded-2xl border border-tan/30 bg-cream-soft p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/5 text-forest">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-ink-muted/70">
                Dining Date
              </p>
              <p className="font-serif text-base font-medium text-forest-deep">
                {format(activeDate, 'EEEE, MMMM d, yyyy')}
              </p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setShowCalendar(!showCalendar);
              setMonth(startOfMonth(activeDate));
            }}
          >
            {showCalendar ? 'Close Calendar' : 'Change Date'}
          </Button>
        </div>

        <AnimatePresence>
          {showCalendar && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-tan/20 pt-4">
                <div className="flex items-center justify-between px-1">
                  <button
                    onClick={() => setMonth(addMonths(month, -1))}
                    className="p-1.5 rounded-lg hover:bg-forest/5 text-forest transition-colors cursor-pointer"
                    aria-label="Previous month"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                  <p className="font-serif text-sm font-semibold text-forest-deep">
                    {format(month, 'MMMM yyyy')}
                  </p>
                  <button
                    onClick={() => setMonth(addMonths(month, 1))}
                    className="p-1.5 rounded-lg hover:bg-forest/5 text-forest transition-colors cursor-pointer"
                    aria-label="Next month"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-7 gap-0.5 text-center">
                  {WEEKDAYS.map((d, i) => (
                    <span
                      key={i}
                      className="py-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted/50"
                    >
                      {d}
                    </span>
                  ))}
                  {days.map((day) => {
                    const disabled = isBefore(day, today);
                    const outside = !isSameMonth(day, month);
                    const selected = isSameDay(day, activeDate);
                    const isToday = isSameDay(day, today);
                    return (
                      <button
                        key={day.toISOString()}
                        disabled={disabled}
                        onClick={() => {
                          onChangeDate?.(day);
                          setShowCalendar(false);
                        }}
                        className={cn(
                          'relative aspect-square rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none cursor-pointer',
                          disabled && 'cursor-not-allowed text-ink-muted/20',
                          !disabled &&
                            !selected &&
                            'text-forest-deep hover:bg-forest/5',
                          outside && !selected && 'text-ink-muted/30',
                          selected && 'bg-forest text-cream-soft shadow-sm',
                        )}
                      >
                        {format(day, 'd')}
                        {isToday && !selected && (
                          <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        <FloorMap
          selectedId={selectedId}
          onSelect={onSelect}
          minCapacity={guests}
          tables={dynamicTables}
        />
      </div>

      <AnimatePresence>
        {selected && (() => {
          const zoneInfo = ZONE_METADATA[selected.area] || ZONE_METADATA.garden;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden rounded-2xl border border-forest/20 bg-cream-soft shadow-sm"
            >
              {/* Card Banner Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-forest/10 bg-[#EAF4E4]/40 px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-cream-soft font-mono text-lg font-bold shadow-xs">
                    {selected.number}
                  </span>
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-forest-deep flex items-center gap-2">
                      Table {selected.number} Selected
                      <span className="inline-flex items-center gap-1 rounded-md bg-forest/10 px-2 py-0.5 text-[10px] font-bold text-forest uppercase tracking-wider">
                        {zoneInfo.emoji} {zoneInfo.name}
                      </span>
                    </h4>
                    <p className="text-xs text-ink-muted">
                      Configured for up to {selected.capacity} guests
                    </p>
                  </div>
                </div>
                
                <span className="inline-flex items-center gap-1 rounded-full bg-forest px-3.5 py-1 text-xs font-semibold text-cream-soft shadow-xs">
                  <CheckCircle2Icon className="h-3.5 w-3.5" />
                  Table Reserved
                </span>
              </div>

              {/* Card Detail Content */}
              <div className="grid gap-6 p-6 md:grid-cols-3">
                <div className="space-y-1 md:col-span-2">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-forest">Ambiance & Atmosphere</h5>
                  <p className="text-sm leading-relaxed text-forest-deep/90">{zoneInfo.ambiance}</p>
                  
                  <div className="pt-4 grid gap-3 sm:grid-cols-2">
                    <div>
                      <h6 className="text-[9px] font-bold uppercase tracking-widest text-ink-muted">Seating Design</h6>
                      <p className="text-xs text-forest-deep/85 mt-0.5">{zoneInfo.seating}</p>
                    </div>
                    <div>
                      <h6 className="text-[9px] font-bold uppercase tracking-widest text-ink-muted">Best Suited For</h6>
                      <p className="text-xs text-forest-deep/85 mt-0.5">{zoneInfo.vibe}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-forest/10 bg-white/50 p-4 flex flex-col justify-between">
                  <div>
                    <h5 className="text-[10px] font-bold uppercase tracking-widest text-forest">Zone Features</h5>
                    <ul className="mt-3 space-y-2">
                      {zoneInfo.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs font-medium text-forest-deep">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-[10px] text-ink-muted italic mt-4 border-t border-forest/10 pt-2.5">
                    * The table you choose is exactly where you will be seated.
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
