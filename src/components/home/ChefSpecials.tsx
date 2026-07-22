import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Plus, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { SPECIALS } from '../../lib/data';
import { cn } from '../../lib/utils';
import { IconButton } from '../ui/Button';
import { addToCart } from '../../lib/cart';
import bgImage from '../../assets/IMG_5669.JPG.jpeg';

interface ChefSpecialCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  onAdd: (name: string) => void;
}

export function ChefSpecialCard({
  id,
  name,
  description,
  price,
  image,
  rating,
  onAdd,
}: ChefSpecialCardProps) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdded(true);
    addToCart({ id, name, price, image });
    onAdd(name);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative flex flex-col justify-between w-full min-w-[280px] max-w-[340px] md:max-w-full sm:min-w-[300px] h-[480px] rounded-[32px] bg-[#F6FAF3]/75 backdrop-blur-md border border-[#DFE7CF]/40 p-8 pt-0 shadow-[0_15px_35px_rgba(19,27,16,0.04)] hover:shadow-[0_25px_50px_rgba(19,27,16,0.1)] transition-all duration-300 cursor-pointer snap-start mt-20"
    >
      {/* Circle Image Wrapper with Overlapping Effect */}
      <div className="relative -mt-20 flex justify-center w-full">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-[0_12px_30px_rgba(0,0,0,0.15)] group-hover:shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-shadow duration-300">
          <img
            src={image}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>
      </div>

      {/* Card Content Details */}
      <div className="flex-1 flex flex-col pt-6 pb-2">
        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <Star className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />
          <span className="text-sm font-semibold text-[#1A2E1A] tracking-wide">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Dish Name */}
        <h3 className="font-serif text-2xl font-bold text-[#1A2E1A] leading-tight tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-forest transition-colors duration-200">
          {name}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm leading-relaxed text-[#1A2E1A]/70 line-clamp-3">
          {description}
        </p>
      </div>

      {/* Bottom Action Row */}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#DFE7CF]/30">
        <div className="flex items-baseline">
          <span className="text-xs font-semibold text-[#1A2E1A]/60 mr-0.5">$</span>
          <span className="text-2xl font-bold text-[#1A2E1A] tracking-tight">{price}</span>
        </div>

        {/* Floating Action Circle Plus Button */}
        <IconButton
          label={`Request ${name}`}
          onClick={handleAddClick}
        >
          <AnimatePresence mode="wait">
            {isAdded ? (
              <motion.div
                key="check"
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
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
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                <Plus className="h-6 w-6 stroke-[2.5] text-[#DCFFE5]" />
              </motion.div>
            )}
          </AnimatePresence>
        </IconButton>
      </div>
    </motion.div>
  );
}

export function ChefSpecials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dragging scroll state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Monitor scroll position to show/hide arrows
  const checkScrollArrows = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    // Check if scrollable
    const canScrollLeft = el.scrollLeft > 5;
    const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 5;
    
    setShowLeftArrow(canScrollLeft);
    setShowRightArrow(canScrollRight);
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollArrows);
    // Initial check
    checkScrollArrows();

    // Resize observer to recheck on window resize
    const resizeObserver = new ResizeObserver(() => checkScrollArrows());
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', checkScrollArrows);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollAmount = el.clientWidth * 0.75;
    const targetScroll = direction === 'left' 
      ? el.scrollLeft - scrollAmount 
      : el.scrollLeft + scrollAmount;

    el.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  // Mouse drag implementation
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    
    isDown.current = true;
    el.classList.add('active');
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    const el = scrollContainerRef.current;
    if (el) el.classList.remove('active');
  };

  const handleMouseUp = () => {
    isDown.current = false;
    const el = scrollContainerRef.current;
    if (el) el.classList.remove('active');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown.current) return;
    e.preventDefault();
    
    const el = scrollContainerRef.current;
    if (!el) return;

    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    el.scrollLeft = scrollLeft.current - walk;
  };

  const handleAddSpecial = (dishName: string) => {
    setToastMessage(`Excellent choice! Note: You can request "${dishName}" when you arrive!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <section 
      id="specials" 
      className="relative w-full py-24 sm:py-32 overflow-hidden border-t border-[#DFE7CF]/30 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(19, 27, 16, 0.88), rgba(26, 46, 26, 0.93)), url(${bgImage})`,
      }}
    >
      {/* Decorative Light Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-[#AAD08D]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 rounded-full bg-[#AAD08D]/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24" data-reveal="header">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#AAD08D]">
            Curated Creations
          </span>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl font-semibold text-[#FCFDFB] tracking-tight">
            Chef's Specials
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#DFE7CF]/85 font-sans">
            Handcrafted signature dishes prepared by our chef using the freshest premium ingredients. Explore seasonal highlights refined to perfection.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group/carousel w-full">
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
            <IconButton
              label="Scroll left"
              onClick={() => scroll('left')}
              disabled={!showLeftArrow}
              className="pointer-events-auto"
            >
              <ChevronLeft className="h-5 w-5 text-[#DCFFE5]" />
            </IconButton>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
            <IconButton
              label="Scroll right"
              onClick={() => scroll('right')}
              disabled={!showRightArrow}
              className="pointer-events-auto"
            >
              <ChevronRight className="h-5 w-5 text-[#DCFFE5]" />
            </IconButton>
          </div>

          {/* Horizontal Scrolling Items */}
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-8 pt-4 px-4 sm:px-2 scroll-smooth select-none cursor-grab active:cursor-grabbing"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Cards Container with Responsive Grid Column widths on large screen if carousel is short, or standard list */}
            {SPECIALS.map((item, index) => (
              <div 
                key={item.id} 
                className="snap-start w-full sm:w-[calc(50%-12px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 flex justify-center"
                data-reveal="item"
              >
                <ChefSpecialCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  rating={item.rating || 9.0}
                  onAdd={handleAddSpecial}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Swipe Hint indicator for Mobile/Tablet */}
        <div className="flex justify-center items-center gap-1.5 mt-2 lg:hidden text-xs text-[#DFE7CF]/60">
          <span>Swipe or drag to explore more</span>
        </div>
      </div>

      {/* Premium Toast Popup Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#131B10] text-[#DFE7CF] px-6 py-4 rounded-2xl border border-[#DFE7CF]/20 shadow-2xl max-w-sm sm:max-w-md w-[calc(100%-2rem)]"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#AAD08D]/20 text-[#AAD08D]">
              <Check className="h-5 w-5 stroke-[2.5]" />
            </div>
            <p className="text-sm font-medium font-sans leading-snug">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
