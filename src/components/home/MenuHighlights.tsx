import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Check } from 'lucide-react';
import { MENU_ITEMS } from '../../lib/data';
import { MenuItem } from '../../types';
import { cn } from '../../lib/utils';
import { addToCart } from '../../lib/cart';
import { IconButton } from '../ui/Button';

const CATEGORIES: (MenuItem['category'] | 'All')[] = [
  'All',
  'Starters',
  'Mains',
  'Desserts',
  'Drinks',
];

const signatureLabel: Record<
  NonNullable<MenuItem['signature']>,
  {
    label: string;
    className: string;
  }
> = {
  mayo: {
    label: 'Garlic Mayo',
    className: 'bg-mayo text-amber',
  },
  sriracha: {
    label: 'Sriracha',
    className: 'bg-sriracha/15 text-sriracha',
  },
  amber: {
    label: 'Halal Beer',
    className: 'bg-amber/15 text-amber',
  },
};

const ITEM_IMAGES: Record<string, string> = {
  m1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600',
  m2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
  m3: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=600',
  m4: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=600',
  m5: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
  m6: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600',
  m7: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600',
  m8: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=600',
  m9: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&q=80&w=600',
  m10: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
};

interface MenuItemCardProps {
  item: MenuItem;
  image: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, image }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(max-width: 768px)').matches ||
          'ontouchstart' in window ||
          navigator.maxTouchPoints > 0
      );
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    addToCart({ id: item.id, name: item.name, price: item.price, image });
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="flip-card h-[440px] select-none group"
    >
      <div className={cn('flip-card-inner', isFlipped && 'is-flipped')}>
        {/* FRONT CARD (Default image & title) */}
        <div className="flip-card-front overflow-hidden rounded-[28px] border border-[#DFE7CF]/40 bg-[#FDFCF7]/95 shadow-[0_12px_32px_rgba(47,61,42,0.04)] hover:shadow-[0_20px_40px_rgba(47,61,42,0.08)] transition-all duration-300 p-5 flex flex-col justify-between">
          <div className="flex-1 flex flex-col">
            {/* Cropped Food Photo Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#DFE7CF]/30 bg-tan/5">
              <img
                src={image}
                alt={item.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                referrerPolicy="no-referrer"
              />
              {/* Category badge overlay */}
              <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold text-forest border border-[#DFE7CF]/40 uppercase tracking-wider shadow-sm">
                {item.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-deep leading-tight mt-5 text-center px-2">
              {item.name}
            </h3>
          </div>

          {/* Footer details, visual tap/hover cue */}
          <div className="mt-4 flex items-center justify-between border-t border-[#DFE7CF]/30 pt-3">
            <span className="text-[10px] font-medium text-[#1A2E1A]/40 uppercase tracking-widest">
              {item.signature ? signatureLabel[item.signature].label : 'Seasonal'}
            </span>
            <span className="text-[10px] font-medium text-[#1A2E1A]/40 flex items-center gap-1">
              <span className="hidden md:inline">Hover for details</span>
              <span className="md:hidden">Tap for details</span>
              <span className="text-xs">→</span>
            </span>
          </div>
        </div>

        {/* BACK CARD (Flipped ingredients side) */}
        <div className="flip-card-back overflow-hidden rounded-[28px] border border-[#DFE7CF]/50 bg-[#F6FAF3] shadow-[0_12px_32px_rgba(47,61,42,0.04)] p-6 flex flex-col justify-between">
          <div className="flex-1 flex flex-col justify-center">
            {/* Heading */}
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7FB565] mb-2">
              Ingredients & Preparation
            </span>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-forest-deep leading-tight mb-3">
              {item.name}
            </h4>
            {/* Description / Ingredients */}
            <p className="text-sm text-[#1A2E1A]/80 leading-relaxed font-sans line-clamp-6">
              {item.description}
            </p>
          </div>

          {/* Footer details, price, action button */}
          <div className="mt-6 flex items-center justify-between border-t border-[#DFE7CF]/30 pt-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-[#1A2E1A]/50 uppercase tracking-wider mb-1">
                Price
              </span>
              <span className="font-serif text-2xl font-bold text-forest-deep tracking-tight">
                ${item.price}
              </span>
            </div>

            {/* Interactive action plus/check button */}
            <IconButton
              label={`Select ${item.name}`}
              onClick={handleAddClick}
              className="shrink-0"
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <Check className="h-5 w-5 stroke-[2.5] text-[#DCFFE5]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="plus"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <Plus className="h-5.5 w-5.5 stroke-[2.5] text-[#DCFFE5]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export function MenuHighlights() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>('All');
  
  const items = useMemo(
    () =>
      active === 'All'
        ? MENU_ITEMS
        : MENU_ITEMS.filter((m) => m.category === active),
    [active],
  );

  return (
    <section id="menu" className="w-full scroll-mt-24 bg-cream py-24">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center" data-reveal="header">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green">
            The menu
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-forest-deep sm:text-5xl">
            A taste of the table
          </h2>
        </div>

        {/* filter tabs */}
        <div
          className="mt-10 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Menu categories"
          data-reveal="slide-right"
        >
          {CATEGORIES.map((cat) => {
            const selected = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(cat)}
                className={cn(
                  'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/50 cursor-pointer',
                  selected
                    ? 'text-cream-soft'
                    : 'text-ink-muted hover:text-forest',
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-forest"
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 32,
                    }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          layout
          data-reveal="slide-left"
          className="mx-auto mt-12 grid max-w-content gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <MenuItemCard item={item} image={ITEM_IMAGES[item.id]} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
