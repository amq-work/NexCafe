import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MenuIcon, XIcon, ShoppingBag } from 'lucide-react';
import { RESTAURANT } from '../../lib/data';
import { Button, IconButton } from '../ui/Button';
import { gsap } from 'gsap';
import { CompactNavbar } from './CompactNavbar';
import { useCart, useCartDrawer } from '../../lib/cart';

const LINKS = [
  { label: 'Home', href: '/#' },
  { label: 'Menu', href: '/#menu' },
  { label: 'Pre-Order', href: '/pre-order' },
  { label: 'Stories', href: '/#stories' },
];

export function Navbar() {
  const { count } = useCart();
  const { openCart } = useCartDrawer();
  const [heroCompleted, setHeroCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const headerRef = useRef<HTMLElement>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setHeroCompleted(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Initial GSAP position setting to avoid flash
    if (headerRef.current) {
      gsap.set(headerRef.current, { y: 0, opacity: 1 });
    }
    if (bottomNavRef.current) {
      gsap.set(bottomNavRef.current, { y: 100, xPercent: -50, opacity: 0 });
    }
  }, []);

  useEffect(() => {
    if (heroCompleted) {
      // Hide top header
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }
      // Slide in compact glassmorphic bottom navbar
      if (bottomNavRef.current) {
        gsap.to(bottomNavRef.current, {
          y: 0,
          xPercent: -50,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
          overwrite: 'auto',
        });
      }
    } else {
      // Slide back in top header
      if (headerRef.current) {
        gsap.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }
      // Slide out bottom navbar
      if (bottomNavRef.current) {
        gsap.to(bottomNavRef.current, {
          y: 100,
          xPercent: -50,
          opacity: 0,
          duration: 0.45,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }
    }
  }, [heroCompleted]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate(href);
        return;
      }
      const targetId = href.split('#')[1];
      
      // Dispatch custom navigation-click event so page scroll lock can be disengaged
      window.dispatchEvent(new CustomEvent('navigation-click', { detail: { targetId } }));
    } else {
      navigate(href);
    }
  };

  return (
    <>
      {/* 
        ============================================================
        1. ELEGANT TOP NAVBAR (Visible at scroll-top / on Hero)
        ============================================================
      */}
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-[#131B10]/70 to-transparent pointer-events-auto"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-16">
          {/* Logo */}
          <div
            onClick={() => handleLinkClick('/#')}
            className="font-island font-normal text-[36px] leading-[36px] text-[#DCFFE5] cursor-pointer hover:opacity-80 transition-opacity select-none"
          >
            {RESTAURANT.name}
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-12">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="group relative font-istok text-[17px] font-medium tracking-wide text-[#DFE7CF] hover:text-[#DCFFE5] transition-colors cursor-pointer select-none"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#DCFFE5] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA / Mobile Trigger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart Button */}
            <IconButton
              label="View Cart"
              onClick={openCart}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#AAD08D] text-[9px] font-bold text-forest-deep shadow-sm z-30"
                >
                  {count}
                </motion.span>
              )}
            </IconButton>

            <Button
              size="sm"
              variant="glass"
              onClick={() => handleLinkClick('/#book-your-table')}
              className="hidden md:flex"
            >
              Book Table
            </Button>

            <IconButton
              label="Open navigation menu"
              onClick={() => setIsOpen(true)}
              className="md:hidden"
            >
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </header>

      {/* 
        ============================================================
        2. COMPACT GLASSMORPHIC BOTTOM NAVBAR (Visible on Hero completed)
        ============================================================
      */}
      <CompactNavbar
        ref={bottomNavRef}
        restaurantName={RESTAURANT.name}
        onLogoClick={() => handleLinkClick('/#')}
        onMenuToggle={() => setIsOpen(true)}
      />

      {/* 
        ============================================================
        3. PREMIUM SLIDING SIDE DRAWER MENU (Unified Menu experience)
        ============================================================
      */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-[#121810]/60 backdrop-blur-md"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm z-50 bg-[#131b10]/95 backdrop-blur-xl p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.6)] border-l border-[#DCFFE5]/15 text-[#faf7ef]"
            >
              {/* Drawer Top Row */}
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                <span
                  onClick={() => handleLinkClick('/#')}
                  className="font-island text-4.5xl font-normal text-[#DCFFE5] cursor-pointer hover:opacity-85 transition-opacity"
                >
                  {RESTAURANT.name}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full hover:bg-white/10 active:scale-95 transition-all text-[#DFE7CF]"
                  aria-label="Close navigation menu"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Vertical Menu Links */}
              <nav className="flex flex-col gap-1 my-auto py-8">
                {LINKS.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="group flex items-baseline gap-4 py-4 border-b border-white/[0.04] transition-all duration-300"
                  >
                    <span className="font-mono text-xs font-bold tracking-widest text-[#AAD08D] opacity-60 group-hover:opacity-100 transition-opacity">
                      0{index + 1}
                    </span>
                    <span className="font-istok text-2xl sm:text-3xl font-medium text-[#DFE7CF] group-hover:text-[#DCFFE5] group-hover:translate-x-2 transition-all duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Drawer Bottom Area */}
              <div className="space-y-6 pt-6 border-t border-white/[0.06]">
                <div className="space-y-2 text-xs text-[#DFE7CF]/60 font-sans">
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#AAD08D]" />
                    Open Daily · 5:00pm – 11:00pm
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#AAD08D]" />
                    18 Orchard Lane, Garden District
                  </p>
                </div>
                <Button
                  fullWidth
                  onClick={() => {
                    setIsOpen(false);
                    handleLinkClick('/#book-your-table');
                  }}
                  className="py-4 shadow-lg bg-[#AAD08D] text-forest-deep font-semibold"
                >
                  Reserve a Table
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
