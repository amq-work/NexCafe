import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { TESTIMONIALS } from '../../lib/data';
import { IconButton } from '../ui/Button';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(t);
  }, [index]);

  const current = TESTIMONIALS[index];

  return (
    <section id="stories" className="w-full scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8" data-reveal="header">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green">
          Guest stories
        </p>

        <div className="relative mt-10 min-h-[240px]" data-reveal="slide-right">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={current.id}
              custom={dir}
              initial={{
                opacity: 0,
                x: dir * 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: dir * -40,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <div
                className="flex justify-center gap-1"
                aria-label={`${current.rating} out of 5 stars`}
              >
                {Array.from({
                  length: current.rating,
                }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-5 w-5 fill-gold text-gold"
                    aria-hidden
                  />
                ))}
              </div>
              <p className="mt-6 font-serif text-2xl font-medium leading-snug text-forest-deep sm:text-3xl">
                "{current.quote}"
              </p>
              <footer className="mt-6">
                <p className="text-sm font-semibold text-forest">
                  {current.name}
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-ink-muted">
                  {current.role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <IconButton label="Previous story" onClick={() => go(index - 1)}>
            <ChevronLeftIcon className="h-5 w-5" />
          </IconButton>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                aria-label={`Go to story ${i + 1}`}
                aria-current={i === index}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === index ? 'w-6 bg-forest' : 'w-2 bg-tan hover:bg-green'}`}
              />
            ))}
          </div>
          <IconButton label="Next story" onClick={() => go(index + 1)}>
            <ChevronRightIcon className="h-5 w-5" />
          </IconButton>
        </div>
      </div>
    </section>
  );
}
