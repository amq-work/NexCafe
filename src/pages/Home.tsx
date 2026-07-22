import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/home/Hero';
import { MenuHighlights } from '../components/home/MenuHighlights';
import { ChefSpecials } from '../components/home/ChefSpecials';
import { BookYourTable } from '../components/home/BookYourTable';
import { AboutRestaurant } from '../components/home/AboutRestaurant';
import { Testimonials } from '../components/home/Testimonials';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

export function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [heroTransitionDuration, setHeroTransitionDuration] = useState<number | undefined>(undefined);

  // Use refs to access latest state values in event listeners without re-registering
  const activeIndexRef = useRef(0);
  const isLockedRef = useRef(false);
  const isAnimatingRef = useRef(false);
  const extraScrollCountRef = useRef(0);
  const initTimersRef = useRef<number[]>([]);
  const isNavigatingRef = useRef(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const specialsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (activeIndex < 2) {
      extraScrollCountRef.current = 0;
    }
  }, [activeIndex]);

  useEffect(() => {
    isLockedRef.current = isLocked;
    // Control body overflow to freeze standard scrolling when locked
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Force ScrollTrigger position refresh when the scrolling lock changes after layout updates
    if (!isNavigatingRef.current) {
      ScrollTrigger.refresh();
      const t1 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
      const t2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
      const t3 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        document.body.style.overflow = '';
      };
    } else {
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isLocked]);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Listen to hash/navigation events to unlock scrolling
  useEffect(() => {
    const forceScrollToTop = () => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      document.body.scrollTop = 0;
    };

    const unlockAndScroll = (targetId?: string) => {
      // Clear any pending initialization or reset timers
      initTimersRef.current.forEach(t => window.clearTimeout(t));
      initTimersRef.current = [];

      if (targetId) {
        setIsLocked(false);
        isLockedRef.current = false;
        document.body.style.overflow = '';
        
        isNavigatingRef.current = true;
        const navTimeout = window.setTimeout(() => {
          isNavigatingRef.current = false;
          ScrollTrigger.refresh();
        }, 1500); // Allow ample time for smooth scrolling to complete without interruptions
        initTimersRef.current.push(navTimeout);

        // Pass 0 duration to sync activeIndex instantly so we bypass the 1s GSAP slide transition
        setHeroTransitionDuration(0);
        setActiveIndex(2);
        activeIndexRef.current = 2;
        extraScrollCountRef.current = 0;

        // Reset the transition duration after a short delay so subsequent wheel/touch scrolls are smooth
        const resetT = window.setTimeout(() => {
          setHeroTransitionDuration(undefined);
        }, 500);
        initTimersRef.current.push(resetT);

        // Schedule the smooth scroll to the target element
        const scrollT = window.setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120); // slightly longer delay to ensure DOM and browser style rendering catch up
        initTimersRef.current.push(scrollT);
      } else {
        // If navigating to home/top, lock the page and scroll to top
        forceScrollToTop();
        const lockT = window.setTimeout(() => {
          forceScrollToTop();
          setIsLocked(true);
          isLockedRef.current = true;
          setActiveIndex(0);
          activeIndexRef.current = 0;
          extraScrollCountRef.current = 0;
        }, 50);
        initTimersRef.current.push(lockT);
      }
    };

    const handleNavigationClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      const targetId = customEvent.detail?.targetId;
      unlockAndScroll(targetId);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#') {
        unlockAndScroll(hash.substring(1));
      } else {
        unlockAndScroll();
      }
    };

    // If loaded with a hash in URL, unlock immediately
    const initialHash = window.location.hash;
    if (initialHash && initialHash !== '#') {
      unlockAndScroll(initialHash.substring(1));
    } else {
      // Force scroll to top on fresh load/reload
      forceScrollToTop();
      
      const onScrollTopAndLock = () => {
        forceScrollToTop();
        setIsLocked(true);
        isLockedRef.current = true;
        setActiveIndex(0);
        activeIndexRef.current = 0;
        extraScrollCountRef.current = 0;
      };

      // Set timers to keep enforcing scroll position during paint ticks
      const t1 = window.setTimeout(onScrollTopAndLock, 20);
      const t2 = window.setTimeout(onScrollTopAndLock, 80);
      const t3 = window.setTimeout(onScrollTopAndLock, 150);
      const t4 = window.setTimeout(onScrollTopAndLock, 300);
      const t5 = window.setTimeout(onScrollTopAndLock, 600);
      initTimersRef.current = [t1, t2, t3, t4, t5];
    }

    window.addEventListener('navigation-click', handleNavigationClick);
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('navigation-click', handleNavigationClick);
      window.removeEventListener('hashchange', handleHashChange);
      initTimersRef.current.forEach(t => window.clearTimeout(t));
    };
  }, []);

  // Set up ScrollTrigger reveal animations for content sections
  useEffect(() => {
    const sections = [
      menuRef,
      specialsRef,
      aboutRef,
      bookRef,
      testimonialsRef,
    ];

    const ctx = gsap.context(() => {
      sections.forEach((ref) => {
        if (!ref.current) return;

        // 1. Animate Header
        const header = ref.current.querySelector('[data-reveal="header"]');
        if (header) {
          gsap.set(header, { opacity: 0, y: 35 });
          gsap.to(header, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 2. Animate Staggered Items (Signature Ingredients, Chef's Specials)
        const items = ref.current.querySelectorAll('[data-reveal="item"]');
        if (items.length > 0) {
          gsap.set(items, { opacity: 0, y: 35 });
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 3. Animate Tabs (Menu Highlights categories)
        const tabs = ref.current.querySelector('[data-reveal="tabs"]');
        if (tabs) {
          gsap.set(tabs, { opacity: 0, y: 20 });
          gsap.to(tabs, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 4. Animate Grid (Menu Highlights lists)
        const grid = ref.current.querySelector('[data-reveal="grid"]');
        if (grid) {
          gsap.set(grid, { opacity: 0, y: 30 });
          gsap.to(grid, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 5. Animate Two-Column Layout (Floor Map Teaser)
        const colText = ref.current.querySelector('[data-reveal="text"]');
        const colVisual = ref.current.querySelector('[data-reveal="visual"]');

        if (colText) {
          gsap.set(colText, { opacity: 0, x: -30 });
          gsap.to(colText, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }

        if (colVisual) {
          gsap.set(colVisual, { opacity: 0, x: 30 });
          gsap.to(colVisual, {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 6. Animate Slide-Left
        const slideLeftItems = ref.current.querySelectorAll('[data-reveal="slide-left"]');
        if (slideLeftItems.length > 0) {
          gsap.set(slideLeftItems, { opacity: 0, x: -60 });
          gsap.to(slideLeftItems, {
            opacity: 1,
            x: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }

        // 7. Animate Slide-Right
        const slideRightItems = ref.current.querySelectorAll('[data-reveal="slide-right"]');
        if (slideRightItems.length > 0) {
          gsap.set(slideRightItems, { opacity: 0, x: 60 });
          gsap.to(slideRightItems, {
            opacity: 1,
            x: 0,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Wheel event listener to handle exactly 120 degree transitions (slide changes)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isNavigatingRef.current) return;
      if (!isLockedRef.current) {
        // If scrolled back up to the very top, re-engage lock
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY <= 5 && e.deltaY < 0) {
          document.body.style.overflow = 'hidden';
          setIsLocked(true);
          isLockedRef.current = true;
          setActiveIndex(2);
          extraScrollCountRef.current = 0;
          window.scrollTo({ top: 0 });
        }
        return;
      }

      // If already playing transition, block all extraneous input
      if (isAnimatingRef.current) {
        if (e.cancelable) {
          e.preventDefault();
        }
        return;
      }

      if (e.deltaY > 0) {
        // Scroll down gesture
        if (activeIndexRef.current < 2) {
          if (e.cancelable) {
            e.preventDefault();
          }
          const nextIdx = activeIndexRef.current + 1;
          setActiveIndex(nextIdx);
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000); // 1s block transition
        } else {
          // Beyond the last step, wait for the 4th scroll to navigate to next section
          if (e.cancelable) {
            e.preventDefault();
          }

          if (extraScrollCountRef.current === 0) {
            // This is the 3rd scroll down (acknowledges last slide)
            extraScrollCountRef.current = 1;
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 600); // 600ms block transition
          } else {
            // This is the 4th scroll down! Smoothly transition to the next section
            extraScrollCountRef.current = 0;
            document.body.style.overflow = '';
            setIsLocked(false);
            isLockedRef.current = false;
            
            setTimeout(() => {
              menuRef.current?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }
        }
      } else if (e.deltaY < 0) {
        // Scroll up gesture
        if (extraScrollCountRef.current > 0) {
          if (e.cancelable) {
            e.preventDefault();
          }
          extraScrollCountRef.current = 0;
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 600);
        } else if (activeIndexRef.current > 0) {
          if (e.cancelable) {
            e.preventDefault();
          }
          const prevIdx = activeIndexRef.current - 1;
          setActiveIndex(prevIdx);
          setIsAnimating(true);
          setTimeout(() => {
            setIsAnimating(false);
          }, 1000); // 1s block transition
        }
      }
    };

    // Touch event gesture support for seamless mobile compatibility
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isNavigatingRef.current) return;
      if (isLockedRef.current) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isNavigatingRef.current) return;
      if (!isLockedRef.current) {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        if (scrollY <= 5) {
          document.body.style.overflow = 'hidden';
          setIsLocked(true);
          isLockedRef.current = true;
          setActiveIndex(2);
          extraScrollCountRef.current = 0;
        }
        return;
      }

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY; // positive is swiping up (scrolling down)

      if (isAnimatingRef.current) {
        return;
      }

      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0) {
          if (activeIndexRef.current < 2) {
            const nextIdx = activeIndexRef.current + 1;
            setActiveIndex(nextIdx);
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 1000);
          } else {
            if (extraScrollCountRef.current === 0) {
              extraScrollCountRef.current = 1;
              setIsAnimating(true);
              setTimeout(() => {
                setIsAnimating(false);
              }, 600);
            } else {
              extraScrollCountRef.current = 0;
              document.body.style.overflow = '';
              setIsLocked(false);
              isLockedRef.current = false;
              
              setTimeout(() => {
                menuRef.current?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }
          }
        } else {
          if (extraScrollCountRef.current > 0) {
            extraScrollCountRef.current = 0;
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 600);
          } else if (activeIndexRef.current > 0) {
            const prevIdx = activeIndexRef.current - 1;
            setActiveIndex(prevIdx);
            setIsAnimating(true);
            setTimeout(() => {
              setIsAnimating(false);
            }, 1000);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#131B10] text-cream selection:bg-green selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Pinned Hero Container */}
      <div className="fixed inset-0 w-full h-screen z-10 overflow-hidden">
        <Hero 
          activeIndex={activeIndex} 
          onIndexChange={setActiveIndex} 
          transitionDuration={heroTransitionDuration}
        />
      </div>

      {/* Scrollable Layout Content */}
      <main className="relative z-20 w-full pointer-events-none">
        {/* Transparent Spacer matching Viewport height to make the pinned Hero fully visible */}
        <div className="h-screen w-full pointer-events-none" />

        {/* Content sections layered with higher z-index and solid backgrounds to cover the pinned Hero section when scrolled */}
        <div className="relative bg-[#F9F6EE] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.35)] pointer-events-auto">
          <div ref={menuRef} className="will-change-transform">
            <MenuHighlights />
          </div>
          <div ref={specialsRef} className="will-change-transform">
            <ChefSpecials />
          </div>
          <div ref={aboutRef} className="will-change-transform">
            <AboutRestaurant />
          </div>
          <div ref={bookRef} className="will-change-transform">
            <BookYourTable />
          </div>
          <div ref={testimonialsRef} className="will-change-transform">
            <Testimonials />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
