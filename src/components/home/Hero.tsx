import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ChevronDownIcon, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Import local transparent product images and background image
// @ts-ignore
import srirachaImg from '../../assets/Buffalo Sriracha.png';
// @ts-ignore
import beerImg from '../../assets/Halal Beer.png';
// @ts-ignore
import mozzarellaImg from '../../assets/Mozzarella Garlic Mayo.png';
// @ts-ignore
import heroBgImg from '../../assets/hero-bg.jpg';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export interface HeroProps {
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  transitionDuration?: number;
}

export function Hero({ activeIndex: propActiveIndex, onIndexChange, transitionDuration }: HeroProps = {}) {
  const navigate = useNavigate();
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Desktop layout scale factor for perfect responsiveness
  const [scale, setScale] = useState(1);

  // DOM Refs for GSAP animation
  const circleRef = useRef<HTMLDivElement>(null);
  const desktopBlobRef = useRef<HTMLDivElement>(null);
  const desktopStrokeRef = useRef<HTMLDivElement>(null);
  const desktopGlow0Ref = useRef<HTMLDivElement>(null);
  const desktopGlow1Ref = useRef<HTMLDivElement>(null);
  const desktopGlow2Ref = useRef<HTMLDivElement>(null);

  // Plate elements
  const plate0Ref = useRef<HTMLImageElement>(null);
  const plate1Ref = useRef<HTMLImageElement>(null);
  const plate2Ref = useRef<HTMLImageElement>(null);

  // Heading elements
  const head0Ref = useRef<HTMLDivElement>(null);
  const head1Ref = useRef<HTMLDivElement>(null);
  const head2Ref = useRef<HTMLDivElement>(null);

  // Subheading elements
  const sub0Ref = useRef<HTMLDivElement>(null);
  const sub1Ref = useRef<HTMLDivElement>(null);
  const sub2Ref = useRef<HTMLDivElement>(null);



  // Indicator dot elements
  const dot0Ref = useRef<HTMLButtonElement>(null);
  const dot1Ref = useRef<HTMLButtonElement>(null);
  const dot2Ref = useRef<HTMLButtonElement>(null);

  // Mobile elements refs for smooth GSAP transitions
  const mobileCircleRef = useRef<HTMLDivElement>(null);
  const mobileBlobRef = useRef<HTMLDivElement>(null);
  const mobileStrokeRef = useRef<HTMLDivElement>(null);
  const mobileGlow0Ref = useRef<HTMLDivElement>(null);
  const mobileGlow1Ref = useRef<HTMLDivElement>(null);
  const mobileGlow2Ref = useRef<HTMLDivElement>(null);
  
  const mobilePlate0Ref = useRef<HTMLImageElement>(null);
  const mobilePlate1Ref = useRef<HTMLImageElement>(null);
  const mobilePlate2Ref = useRef<HTMLImageElement>(null);

  const mobileHead0Ref = useRef<HTMLHeadingElement>(null);
  const mobileHead1Ref = useRef<HTMLHeadingElement>(null);
  const mobileHead2Ref = useRef<HTMLHeadingElement>(null);
  const mobileSub0Ref = useRef<HTMLParagraphElement>(null);
  const mobileSub1Ref = useRef<HTMLParagraphElement>(null);
  const mobileSub2Ref = useRef<HTMLParagraphElement>(null);

  // Active index states and refs for desktop panel locking
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const heroLockedRef = useRef(true);

  // Desktop scaling logic
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024 && width < 1440) {
        setScale(width / 1440);
      } else {
        setScale(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Continuous botanical breathing and idle floating animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop idle loops
      if (desktopBlobRef.current) {
        gsap.to(desktopBlobRef.current, {
          y: '+=12',
          duration: 5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        gsap.to(desktopBlobRef.current, {
          rotation: '+=10',
          duration: 12,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
      if (desktopStrokeRef.current) {
        gsap.to(desktopStrokeRef.current, {
          y: '-=8',
          scale: 1.04,
          duration: 4.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        gsap.to(desktopStrokeRef.current, {
          rotation: -360,
          duration: 45,
          repeat: -1,
          ease: 'none'
        });
      }

      // Mobile idle loops
      if (mobileBlobRef.current) {
        gsap.to(mobileBlobRef.current, {
          y: '+=8',
          duration: 4.5,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        gsap.to(mobileBlobRef.current, {
          rotation: '+=8',
          duration: 10,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }
      if (mobileStrokeRef.current) {
        gsap.to(mobileStrokeRef.current, {
          y: '-=6',
          scale: 1.03,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
        gsap.to(mobileStrokeRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: 'none'
        });
      }
    });

    return () => ctx.revert();
  }, []);

  // 3D product wheel animation handler using premium GSAP properties
  const animateToProduct = (targetIdx: number, durationOverride?: number) => {
    isAnimating.current = true;
    const duration = durationOverride !== undefined ? durationOverride : 1.0;
    const ease = 'power3.inOut';

    const plates = [plate0Ref, plate1Ref, plate2Ref];
    const headings = [head0Ref, head1Ref, head2Ref];
    const subheadings = [sub0Ref, sub1Ref, sub2Ref];
    const dots = [dot0Ref, dot1Ref, dot2Ref];

    // Kill existing tweens on these elements to ensure perfect synchronization
    plates.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    headings.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    subheadings.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    dots.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    
    if (circleRef.current) gsap.killTweensOf(circleRef.current);
    if (desktopBlobRef.current) gsap.killTweensOf(desktopBlobRef.current);
    if (desktopStrokeRef.current) gsap.killTweensOf(desktopStrokeRef.current);
    [desktopGlow0Ref, desktopGlow1Ref, desktopGlow2Ref].forEach(ref => ref.current && gsap.killTweensOf(ref.current));

    // 1. Plates: Rotate wheel exactly 120 degrees relative to the active slide index
    plates.forEach((ref, idx) => {
      if (!ref.current) return;

      const isActive = idx === targetIdx;
      // Formula rotates the inactive dishes -120 or +120 degrees relative to active -22.76
      const rotation = -22.76 + (idx - targetIdx) * 120;
      const scale = isActive ? 1.0 : 0.5;
      const opacity = isActive ? 1.0 : 0;
      const z = isActive ? 0 : -300; // depth movement using translateZ

      gsap.to(ref.current, {
        opacity,
        rotation,
        scale,
        z,
        force3D: true,
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });

    // 2. Headings & Subheadings
    headings.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      gsap.to(ref.current, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : (idx < targetIdx ? -30 : 30),
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });

    subheadings.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      gsap.to(ref.current, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : (idx < targetIdx ? -30 : 30),
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });



    // 3. Dot updates
    dots.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      gsap.to(ref.current, {
        width: isActive ? 44 : 26,
        opacity: isActive ? 0.85 : 0.26,
        duration,
        ease,
      });
    });

    // 4. Abstract Organic Background Morphing & Glow transition
    const blobRadii = [
      '42% 58% 70% 30% / 45% 45% 55% 55%', // Mozzarella
      '55% 45% 35% 65% / 40% 60% 40% 60%', // Sriracha
      '30% 70% 50% 50% / 65% 35% 65% 35%', // Halal Beer
    ];

    const strokeRadii = [
      '50% 40% 60% 50% / 50% 60% 40% 50%',
      '40% 60% 50% 50% / 60% 40% 60% 40%',
      '60% 40% 65% 35% / 45% 55% 50% 50%',
    ];

    const desktopGlows = [desktopGlow0Ref, desktopGlow1Ref, desktopGlow2Ref];
    desktopGlows.forEach((ref, idx) => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: idx === targetIdx ? 0.75 : 0,
          duration,
          ease,
        });
      }
    });

    if (desktopBlobRef.current) {
      gsap.to(desktopBlobRef.current, {
        borderRadius: blobRadii[targetIdx],
        scale: 1.06,
        yoyo: true,
        repeat: 1,
        duration: duration / 2,
        ease,
      });
    }

    if (desktopStrokeRef.current) {
      gsap.to(desktopStrokeRef.current, {
        borderRadius: strokeRadii[targetIdx],
        rotation: (targetIdx - activeIndexRef.current) * 45,
        duration,
        ease,
      });
    }

    // Release animation lock once done
    setTimeout(() => {
      isAnimating.current = false;
    }, duration * 1000);
  };

  // Mobile layout smooth GSAP animation handler with cached DOM nodes
  const animateMobileToProduct = (targetIdx: number, durationOverride?: number) => {
    isAnimating.current = true;
    const duration = durationOverride !== undefined ? durationOverride : 1.0;
    const ease = 'power2.out';

    const plates = [mobilePlate0Ref, mobilePlate1Ref, mobilePlate2Ref];
    const headings = [mobileHead0Ref, mobileHead1Ref, mobileHead2Ref];
    const subheadings = [mobileSub0Ref, mobileSub1Ref, mobileSub2Ref];

    // Kill existing tweens to prevent synchronization lag
    plates.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    headings.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    subheadings.forEach(ref => ref.current && gsap.killTweensOf(ref.current));
    
    if (mobileBlobRef.current) gsap.killTweensOf(mobileBlobRef.current);
    if (mobileStrokeRef.current) gsap.killTweensOf(mobileStrokeRef.current);
    [mobileGlow0Ref, mobileGlow1Ref, mobileGlow2Ref].forEach(ref => ref.current && gsap.killTweensOf(ref.current));

    // 1. Plates: Smooth rotation, scale, and cross-fade
    plates.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      
      const rotation = -22.76 + (idx - targetIdx) * 120;
      const scale = isActive ? 1.0 : 0.6;
      const opacity = isActive ? 1.0 : 0;

      gsap.to(ref.current, {
        opacity,
        rotation,
        scale,
        force3D: true,
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });



    // 3. Headings: Vertical slide-and-fade transition
    headings.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      gsap.to(ref.current, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : (idx < targetIdx ? -20 : 20),
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });

    // 4. Subheadings: Vertical slide-and-fade transition
    subheadings.forEach((ref, idx) => {
      if (!ref.current) return;
      const isActive = idx === targetIdx;
      gsap.to(ref.current, {
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : (idx < targetIdx ? -20 : 20),
        pointerEvents: isActive ? 'auto' : 'none',
        duration,
        ease,
      });
    });

    // 5. Mobile Abstract Organic Background Morphing & Glow transition
    const blobRadii = [
      '42% 58% 70% 30% / 45% 45% 55% 55%', // Mozzarella
      '55% 45% 35% 65% / 40% 60% 40% 60%', // Sriracha
      '30% 70% 50% 50% / 65% 35% 65% 35%', // Halal Beer
    ];

    const strokeRadii = [
      '50% 40% 60% 50% / 50% 60% 40% 50%',
      '40% 60% 50% 50% / 60% 40% 60% 40%',
      '60% 40% 65% 35% / 45% 55% 50% 50%',
    ];

    const mobileGlows = [mobileGlow0Ref, mobileGlow1Ref, mobileGlow2Ref];
    mobileGlows.forEach((ref, idx) => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: idx === targetIdx ? 0.75 : 0,
          duration,
          ease,
        });
      }
    });

    if (mobileBlobRef.current) {
      gsap.to(mobileBlobRef.current, {
        borderRadius: blobRadii[targetIdx],
        scale: 1.05,
        yoyo: true,
        repeat: 1,
        duration: duration / 2,
        ease,
      });
    }

    if (mobileStrokeRef.current) {
      gsap.to(mobileStrokeRef.current, {
        borderRadius: strokeRadii[targetIdx],
        rotation: (targetIdx - activeIndexRef.current) * 45,
        duration,
        ease,
      });
    }

    setTimeout(() => {
      isAnimating.current = false;
    }, duration * 1000);
  };

  // Synchronize both layout positions and states
  const syncActiveIndex = (index: number, durationOverride?: number) => {
    activeIndexRef.current = index;
    setActiveIndex(index);
    setMobileActiveIndex(index);
    animateToProduct(index, durationOverride);
    animateMobileToProduct(index, durationOverride);
    if (onIndexChange) {
      onIndexChange(index);
    }
  };

  useEffect(() => {
    if (propActiveIndex !== undefined && propActiveIndex !== activeIndexRef.current) {
      syncActiveIndex(propActiveIndex, transitionDuration);
      if (propActiveIndex === 2) {
        heroLockedRef.current = false;
      } else {
        heroLockedRef.current = true;
      }
    }
  }, [propActiveIndex, transitionDuration]);

  // Initialize the visual positions with 0 duration on mount
  useEffect(() => {
    animateToProduct(0, 0);
    animateMobileToProduct(0, 0);
  }, []);

  // Set up mouse-wheel scroll lock & touch gesture traps
  useEffect(() => {
    if (propActiveIndex !== undefined) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const atTop = scrollY <= 15;

      if (atTop && heroLockedRef.current) {
        if (isAnimating.current) {
          if (e.cancelable) e.preventDefault();
          return;
        }

        if (e.deltaY > 0) {
          if (activeIndexRef.current < 2) {
            if (e.cancelable) e.preventDefault();
            const nextIdx = activeIndexRef.current + 1;
            syncActiveIndex(nextIdx);
          } else {
            // Unlock scroll so the user can naturally scroll to the next sections
            heroLockedRef.current = false;
          }
        } else if (e.deltaY < 0) {
          if (activeIndexRef.current > 0) {
            if (e.cancelable) e.preventDefault();
            const prevIdx = activeIndexRef.current - 1;
            syncActiveIndex(prevIdx);
          }
        }
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (scrollY <= 15) {
        if (!heroLockedRef.current) {
          heroLockedRef.current = true;
          syncActiveIndex(2, 0.4); // fast snap back
        }
      } else {
        // If we scrolled past the hero section, unlock it so they can scroll freely
        if (heroLockedRef.current) {
          heroLockedRef.current = false;
        }
      }
    };

    // Touch gesture tracker
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const atTop = scrollY <= 15;
      if (!atTop || !heroLockedRef.current) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // If horizontal swipe is dominant (e.g. on mobile/tablet), prevent vertical scroll and slide!
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const atTop = scrollY <= 15;
      if (!atTop || !heroLockedRef.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const deltaTime = Date.now() - touchStartTime;

      // Swipe detection: swipe > 40px and within 500ms
      if (Math.abs(deltaX) > 40 && deltaTime < 500) {
        if (isAnimating.current) return;

        if (deltaX > 0) {
          if (activeIndexRef.current < 2) {
            syncActiveIndex(activeIndexRef.current + 1);
          }
        } else {
          if (activeIndexRef.current > 0) {
            syncActiveIndex(activeIndexRef.current - 1);
          }
        }
      }
      
      // Vertical touch scroll-locking for desktop view
      if (window.innerWidth >= 1024 && Math.abs(deltaY) > 40 && deltaTime < 500) {
        if (isAnimating.current) return;
        if (deltaY > 0) {
          if (activeIndexRef.current < 2) {
            syncActiveIndex(activeIndexRef.current + 1);
          } else {
            heroLockedRef.current = false;
          }
        } else {
          if (activeIndexRef.current > 0) {
            syncActiveIndex(activeIndexRef.current - 1);
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Dot clicking logic: smoothly transitions to selected index
  const handleDotClick = (index: number) => {
    if (isAnimating.current) return;
    syncActiveIndex(index);
  };

  const handleScrollTo = (id: string) => {
    // Dispatch custom navigation-click event so page scroll lock can be disengaged
    window.dispatchEvent(new CustomEvent('navigation-click', { detail: { targetId: id } }));
  };

  // Content helper for slides (used on mobile)
  const slidesData = [
    {
      heading: (
        <>
          A Symphony of<br />Melting <span className="font-bold">Artistry</span>.
        </>
      ),
      subheading: (
        <>
          Silky mozzarella meets rich garlic mayo.<br />A warm, aromatic blend crafted to awaken your senses.
        </>
      ),
      curvedText: "Mozzarella Garlic Mayo",
      image: mozzarellaImg,
      bgColor: 'rgba(179, 187, 130, 0.54)',
      textColor: '#DCFFE5',
    },
    {
      heading: (
        <>
          Bold Flavors,<br />Elevated <span className="font-bold">Heritage</span>.
        </>
      ),
      subheading: (
        <>
          Glazed succulent quail in fiery sriracha.<br />Crisped to perfection with smoky, sweet undertones.
        </>
      ),
      curvedText: "Buffalo Sriracha Quail",
      image: srirachaImg,
      bgColor: 'rgba(214, 72, 59, 0.54)',
      textColor: '#FFDCD3',
    },
    {
      heading: (
        <>
          Crisp & Golden,<br />Artisanal <span className="font-bold">Tradition</span>.
        </>
      ),
      subheading: (
        <>
          Gold standard cold-brewed halal draft.<br />Paired perfectly with crispy double-smoked rib toast.
        </>
      ),
      curvedText: "Signature Halal Beer",
      image: beerImg,
      bgColor: 'rgba(196, 151, 59, 0.54)',
      textColor: '#FFEED3',
    },
  ];

  return (
    <section ref={scrollWrapperRef} className="relative w-full bg-[#131B10] overflow-hidden">
      
      {/* 
        =========================================
        DESKTOP PIXEL-PERFECT FIGMA LAYOUT (>= 1024px)
        =========================================
      */}
      <div 
        ref={heroRef} 
        className="hidden lg:flex w-full h-[720px] bg-[#131B10] overflow-hidden justify-center items-center relative z-10"
      >
        {/* Full-width Hero Background Image */}
        <div 
          className="absolute inset-0 pointer-events-none w-full h-full"
          style={{
            backgroundImage: `url(${heroBgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.35,
          }}
        />
        {/* Full-width Gradient tint overlays for perfect seamless visual contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#131B10]/85 via-[#131B10]/45 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131B10] via-transparent to-[#131B10]/50 pointer-events-none" />

        <div 
          className="relative w-[1440px] h-[720px] shrink-0 select-none overflow-visible"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        >



          {/* 
            =========================================
            SLIDE TEXT & GRAPHICS (SCRUBBED BY GSAP)
            =========================================
          */}

          {/* Hero-Headings */}
          <div className="absolute left-[110px] top-[135px] w-[650px] h-[220px] z-20 pointer-events-none">
            <div ref={head0Ref} className="absolute inset-0 pointer-events-none">
              <span className="inline-block font-serif font-medium text-[76px] leading-[0.85] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'left top' }}>
                A Symphony of<br />Melting <span className="font-bold text-[#DCFFE5] drop-shadow-sm">Artistry</span>.
              </span>
            </div>
            <div ref={head1Ref} className="absolute inset-0 pointer-events-none">
              <span className="inline-block font-serif font-medium text-[76px] leading-[0.85] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'left top' }}>
                Bold Flavors,<br />Elevated <span className="font-bold text-[#FFDCD3] drop-shadow-sm">Heritage</span>.
              </span>
            </div>
            <div ref={head2Ref} className="absolute inset-0 pointer-events-none">
              <span className="inline-block font-serif font-medium text-[76px] leading-[0.85] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'left top' }}>
                Crisp & Golden,<br />Artisanal <span className="font-bold text-[#FFEED3] drop-shadow-sm">Tradition</span>.
              </span>
            </div>
          </div>

          {/* Hero-subheadings */}
          <div className="absolute left-[110px] top-[380px] w-[650px] h-[110px] z-20 pointer-events-none">
            <div ref={sub0Ref} className="absolute inset-0 font-sans font-light text-[22px] leading-[36px] text-cream-soft/90 tracking-wide">
              Silky mozzarella meets rich garlic mayonnaise.<br /><span className="font-normal text-[#DCFFE5]">A warm, aromatic blend crafted to awaken your senses.</span>
            </div>
            <div ref={sub1Ref} className="absolute inset-0 font-sans font-light text-[22px] leading-[36px] text-cream-soft/90 tracking-wide">
              Glazed succulent quail basted in sweet, fiery sriracha.<br /><span className="font-normal text-[#FFDCD3]">Crisped to absolute perfection with deep, smoky undertones.</span>
            </div>
            <div ref={sub2Ref} className="absolute inset-0 font-sans font-light text-[22px] leading-[36px] text-cream-soft/90 tracking-wide">
              Premium non-alcoholic draft cold-brewed to gold standard.<br /><span className="font-normal text-[#FFEED3]">Perfectly paired with our double-smoked, crispy rib toast.</span>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="absolute left-[110px] top-[515px] z-30 pointer-events-auto">
            <Button
              variant="glass"
              size="md"
              onClick={() => handleScrollTo('menu')}
              className="px-8"
            >
              <span>View Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2" />
            </Button>
          </div>

          {/* hero-shape 3 (Premium Abstract Organic Composition) */}
          <div 
            ref={circleRef}
            className="absolute z-10 pointer-events-none select-none overflow-visible"
            style={{
              width: '480px',
              height: '480px',
              left: '893px',
              top: '155px',
            }}
          >
            {/* Ambient Back Glows (overlapping colored shadows - cross-faded dynamically) */}
            <div 
              ref={desktopGlow0Ref}
              className="absolute inset-[-40px] rounded-full filter blur-[70px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
              style={{
                background: 'radial-gradient(circle, rgba(179, 187, 130, 0.6) 0%, transparent 70%)',
                opacity: 0.75,
              }}
            />
            <div 
              ref={desktopGlow1Ref}
              className="absolute inset-[-40px] rounded-full filter blur-[70px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
              style={{
                background: 'radial-gradient(circle, rgba(214, 72, 59, 0.5) 0%, transparent 70%)',
                opacity: 0,
              }}
            />
            <div 
              ref={desktopGlow2Ref}
              className="absolute inset-[-40px] rounded-full filter blur-[70px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
              style={{
                background: 'radial-gradient(circle, rgba(196, 151, 59, 0.5) 0%, transparent 70%)',
                opacity: 0,
              }}
            />

            {/* Asymmetric Organic Glassmorphic Blob with soft noise */}
            <div 
              ref={desktopBlobRef}
              className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,0.15),0_25px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl border border-white/15 overflow-hidden transition-all duration-700"
              style={{
                borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 100%)',
              }}
            >
              {/* Noise grain overlay */}
              <div 
                className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Botanical/Sculptural Curved Stroke Double-Ring Accent */}
            <div 
              ref={desktopStrokeRef}
              className="absolute inset-[-15px] border border-white/10 rounded-[50%_40%_60%_50%_/_50%_60%_40%_50%] pointer-events-none transition-all duration-1000"
              style={{
                borderWidth: '1.5px',
                borderStyle: 'dashed',
                borderDasharray: '4, 12',
              }}
            />
            <div 
              className="absolute inset-[-30px] border border-white/5 rounded-full opacity-40 pointer-events-none rotate-45 scale-95"
              style={{
                borderWidth: '1px',
              }}
            />
          </div>



          {/* Transparent Floating Plate Images (Mathematically centered in background circle) */}
          <img 
            ref={plate0Ref}
            src={mozzarellaImg}
            alt="Mozzarella Garlic Mayo cheese pulling appetizer"
            className="absolute pointer-events-none select-none z-20"
            referrerPolicy="no-referrer"
            style={{
              width: '694.8px',
              height: '378.7px',
              left: '785.5px',
              top: '205.5px',
              transform: 'rotate(-22.76deg)',
              transformOrigin: 'center center',
            }}
          />

          <img 
            ref={plate1Ref}
            src={srirachaImg}
            alt="Buffalo Sriracha Quail chef special"
            className="absolute pointer-events-none select-none z-20"
            referrerPolicy="no-referrer"
            style={{
              width: '694.8px',
              height: '378.7px',
              left: '785.5px',
              top: '205.5px',
              transform: 'rotate(-22.76deg)',
              transformOrigin: 'center center',
            }}
          />

          <img 
            ref={plate2Ref}
            src={beerImg}
            alt="Signature artisanal halal beer bottle selection"
            className="absolute pointer-events-none select-none z-20"
            referrerPolicy="no-referrer"
            style={{
              width: '694.8px',
              height: '378.7px',
              left: '785.5px',
              top: '205.5px',
              transform: 'rotate(-22.76deg)',
              transformOrigin: 'center center',
            }}
          />

          {/* Frame 4 (Indicator Dots Container) */}
          <div 
            className="absolute flex flex-row items-center justify-center z-30"
            style={{
              width: '136px',
              height: '29px',
              left: '652px',
              top: '666px',
              background: 'rgba(44, 61, 38, 0.5)',
              borderRadius: '18px',
              padding: '10px 15px 9px',
            }}
          >
            {/* Frame 3 (Auto layout row for indicators) */}
            <div 
              className="flex flex-row items-center gap-[5px]"
              style={{
                width: '106px',
                height: '10px',
              }}
            >
              <button 
                ref={dot0Ref}
                onClick={() => handleDotClick(0)}
                className="h-[10px] rounded-[18px] bg-[rgba(220,255,229,0.26)] transition-colors cursor-pointer border-none outline-none focus:ring-1 focus:ring-[#DCFFE5]"
                style={{ width: '44px' }}
                aria-label="View Slide 1"
              />
              <button 
                ref={dot1Ref}
                onClick={() => handleDotClick(1)}
                className="h-[10px] rounded-[18px] bg-[rgba(220,255,229,0.26)] transition-colors cursor-pointer border-none outline-none focus:ring-1 focus:ring-[#DCFFE5]"
                style={{ width: '26px' }}
                aria-label="View Slide 2"
              />
              <button 
                ref={dot2Ref}
                onClick={() => handleDotClick(2)}
                className="h-[10px] rounded-[18px] bg-[rgba(220,255,229,0.26)] transition-colors cursor-pointer border-none outline-none focus:ring-1 focus:ring-[#DCFFE5]"
                style={{ width: '26px' }}
                aria-label="View Slide 3"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 
        =========================================
        MOBILE & TABLET RESPONSIVE VIEW (< 1024px)
        =========================================
      */}
      <div 
        className="lg:hidden w-full min-h-screen flex flex-col justify-between relative py-12 px-4 sm:px-8 bg-[#131B10] overflow-hidden z-10"
      >
        {/* Ambient background for mobile */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${heroBgImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.18,
          }}
        />
        <div className="absolute inset-0 bg-[#131B10]/90 pointer-events-none" />

        {/* Product Showcase */}
        <div className="flex flex-col flex-1 justify-center py-6 gap-6 z-20 pt-16">
          
          {/* Headings Container (Stacked Absolutely to prevent layout shift and enable GSAP) */}
          <div className="relative w-full h-[115px] xs:h-[140px] sm:h-[160px] flex items-center justify-center">
            <h1 ref={mobileHead0Ref} className="absolute inset-0 text-center px-4">
              <span className="inline-block font-serif font-medium text-[26px] xs:text-[34px] sm:text-[44px] md:text-[50px] leading-[0.95] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'top center' }}>
                A Symphony of<br />Melting <span className="font-bold text-[#DCFFE5] drop-shadow-sm">Artistry</span>.
              </span>
            </h1>
            <h1 ref={mobileHead1Ref} className="absolute inset-0 text-center px-4">
              <span className="inline-block font-serif font-medium text-[26px] xs:text-[34px] sm:text-[44px] md:text-[50px] leading-[0.95] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'top center' }}>
                Bold Flavors,<br />Elevated <span className="font-bold text-[#FFDCD3] drop-shadow-sm">Heritage</span>.
              </span>
            </h1>
            <h1 ref={mobileHead2Ref} className="absolute inset-0 text-center px-4">
              <span className="inline-block font-serif font-medium text-[26px] xs:text-[34px] sm:text-[44px] md:text-[50px] leading-[0.95] text-cream-soft tracking-normal" style={{ transform: 'scaleY(1.35) scaleX(0.92)', transformOrigin: 'top center' }}>
                Crisp & Golden,<br />Artisanal <span className="font-bold text-[#FFEED3] drop-shadow-sm">Tradition</span>.
              </span>
            </h1>
          </div>

          {/* Subheadings Container (Stacked Absolutely to prevent layout shift and enable GSAP) */}
          <div className="relative w-full h-[120px] xs:h-[100px] sm:h-[80px] flex items-center justify-center mt-2">
            <p ref={mobileSub0Ref} className="absolute inset-0 font-sans font-light text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] leading-relaxed text-cream-soft/90 text-center max-w-lg mx-auto px-4 sm:px-6">
              Silky mozzarella meets rich garlic mayonnaise.<br /><span className="font-normal text-[#DCFFE5]">A warm, aromatic blend crafted to awaken your senses.</span>
            </p>
            <p ref={mobileSub1Ref} className="absolute inset-0 font-sans font-light text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] leading-relaxed text-cream-soft/90 text-center max-w-lg mx-auto px-4 sm:px-6">
              Glazed succulent quail basted in sweet, fiery sriracha.<br /><span className="font-normal text-[#FFDCD3]">Crisped to absolute perfection with deep, smoky undertones.</span>
            </p>
            <p ref={mobileSub2Ref} className="absolute inset-0 font-sans font-light text-[13px] xs:text-[15px] sm:text-[18px] md:text-[20px] leading-relaxed text-cream-soft/90 text-center max-w-lg mx-auto px-4 sm:px-6">
              Premium non-alcoholic draft cold-brewed to gold standard.<br /><span className="font-normal text-[#FFEED3]">Perfectly paired with our double-smoked, crispy rib toast.</span>
            </p>
          </div>

          {/* Mobile CTA Button */}
          <div className="relative z-30 flex justify-center mt-4 sm:mt-6">
            <Button
              variant="glass"
              size="sm"
              onClick={() => handleScrollTo('menu')}
              className="px-6"
            >
              <span>View Menu</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2" />
            </Button>
          </div>

          {/* Floating graphic container */}
          <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] mx-auto my-6 flex items-center justify-center">
            {/* Premium Abstract Organic Composition with glowing effects for mobile */}
            <div 
              ref={mobileCircleRef}
              className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] pointer-events-none select-none overflow-visible"
              style={{ zIndex: 1 }}
            >
              {/* Overlapping mobile color glow zones */}
              <div 
                ref={mobileGlow0Ref}
                className="absolute inset-[-20px] rounded-full filter blur-[40px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle, rgba(179, 187, 130, 0.6) 0%, transparent 70%)',
                  opacity: 0.75,
                }}
              />
              <div 
                ref={mobileGlow1Ref}
                className="absolute inset-[-20px] rounded-full filter blur-[40px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle, rgba(214, 72, 59, 0.5) 0%, transparent 70%)',
                  opacity: 0,
                }}
              />
              <div 
                ref={mobileGlow2Ref}
                className="absolute inset-[-20px] rounded-full filter blur-[40px] mix-blend-screen pointer-events-none transition-opacity duration-1000"
                style={{
                  background: 'radial-gradient(circle, rgba(196, 151, 59, 0.5) 0%, transparent 70%)',
                  opacity: 0,
                }}
              />

              {/* Asymmetric Glassmorphic Blob */}
              <div 
                ref={mobileBlobRef}
                className="absolute inset-0 shadow-[inset_0_0_30px_rgba(255,255,255,0.15),0_15px_35px_rgba(0,0,0,0.45)] backdrop-blur-xl border border-white/15 overflow-hidden transition-all duration-700"
                style={{
                  borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.03) 100%)',
                }}
              >
                {/* Noise texture overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>

              {/* Sculptural Double-Ring dashes */}
              <div 
                ref={mobileStrokeRef}
                className="absolute inset-[-8px] border border-white/10 rounded-[50%_40%_60%_50%_/_50%_60%_40%_50%] pointer-events-none transition-all duration-1000"
                style={{
                  borderWidth: '1.2px',
                  borderStyle: 'dashed',
                  borderDasharray: '3, 9',
                }}
              />
            </div>



            {/* Transparent Floating Plate Images (Concentric and floating with zIndex 5) */}
            <img 
              ref={mobilePlate0Ref}
              src={mozzarellaImg}
              alt="Mozzarella Garlic Mayo cheese pulling appetizer"
              className="absolute pointer-events-none select-none"
              referrerPolicy="no-referrer"
              style={{
                width: '180px',
                height: 'auto',
                transform: 'rotate(-22.76deg)',
                zIndex: 5
              }}
            />

            <img 
              ref={mobilePlate1Ref}
              src={srirachaImg}
              alt="Buffalo Sriracha Quail chef special"
              className="absolute pointer-events-none select-none"
              referrerPolicy="no-referrer"
              style={{
                width: '180px',
                height: 'auto',
                transform: 'rotate(-22.76deg)',
                zIndex: 5
              }}
            />

            <img 
              ref={mobilePlate2Ref}
              src={beerImg}
              alt="Signature halal beer selection"
              className="absolute pointer-events-none select-none"
              referrerPolicy="no-referrer"
              style={{
                width: '180px',
                height: 'auto',
                transform: 'rotate(-22.76deg)',
                zIndex: 5
              }}
            />
          </div>

        </div>

        {/* Indicators at the bottom */}
        <div className="w-[136px] bg-[#2c3d26]/50 rounded-[18px] py-[8px] px-[15px] mx-auto flex items-center justify-center z-25 mt-4">
          <div className="flex flex-row items-center gap-[5px] w-[106px] h-[10px] justify-center">
            {slidesData.map((_, i) => (
              <button 
                key={i}
                onClick={() => handleDotClick(i)}
                className="h-[10px] rounded-[18px] transition-all duration-300"
                style={{
                  width: mobileActiveIndex === i ? '44px' : '26px',
                  backgroundColor: mobileActiveIndex === i ? 'rgba(220, 255, 229, 0.85)' : 'rgba(220, 255, 229, 0.26)',
                }}
                aria-label={`View Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>



    </section>
  );
}
