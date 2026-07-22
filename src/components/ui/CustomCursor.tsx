import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Detect touch devices to avoid rendering custom cursor or hiding default cursor
    const checkTouch = () => {
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;
      setIsTouch(isTouchDevice);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    return () => {
      window.removeEventListener('resize', checkTouch);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Set initial centered offset using percent translation
    gsap.set(outer, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });
    gsap.set(inner, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 });

    // Performance-optimized quickTo targets
    const outerXTo = gsap.quickTo(outer, 'x', { duration: 0.35, ease: 'power3.out' });
    const outerYTo = gsap.quickTo(outer, 'y', { duration: 0.35, ease: 'power3.out' });

    const innerXTo = gsap.quickTo(inner, 'x', { duration: 0.08, ease: 'power2.out' });
    const innerYTo = gsap.quickTo(inner, 'y', { duration: 0.08, ease: 'power2.out' });

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        hasMoved = true;
        setIsVisible(true);
        gsap.to([outer, inner], {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.05,
        });
      }

      outerXTo(e.clientX);
      outerYTo(e.clientY);
      innerXTo(e.clientX);
      innerYTo(e.clientY);
    };

    const onMouseLeaveWindow = () => {
      setIsVisible(false);
      gsap.to([outer, inner], {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    };

    const onMouseEnterWindow = () => {
      setIsVisible(true);
      gsap.to([outer, inner], {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    // Event delegation to capture any interactive element (buttons, links, inputs, and elements marked custom)
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, [role="button"], .cursor-pointer, input, textarea, select, [data-cursor="magnetic"]'
      );

      if (interactiveEl) {
        setIsHovered(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest(
        'button, a, [role="button"], .cursor-pointer, input, textarea, select, [data-cursor="magnetic"]'
      );

      if (interactiveEl) {
        const relatedTarget = e.relatedTarget as HTMLElement;
        if (relatedTarget && interactiveEl.contains(relatedTarget)) {
          return;
        }
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Apply global CSS class to body when custom cursor is visible
    const rootClass = 'custom-cursor-active';
    document.documentElement.classList.add(rootClass);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.classList.remove(rootClass);
    };
  }, [isTouch]);

  // Handle the hover transformation state using GSAP
  useEffect(() => {
    if (isTouch) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    if (isHovered) {
      // Elegant crystal focus style: expand, transparent background, radiant gold border
      gsap.to(outer, {
        width: 60,
        height: 60,
        backgroundColor: 'rgba(30, 48, 35, 0.15)', // elegant transparent emerald
        borderColor: 'rgba(234, 216, 192, 0.95)', // warm gold glow
        boxShadow: '0 0 16px rgba(122, 154, 94, 0.25)',
        duration: 0.35,
        ease: 'power3.out',
      });

      gsap.to(inner, {
        width: 4,
        height: 4,
        backgroundColor: '#EAD8C0', // soft golden glow center
        scale: 0.5,
        duration: 0.35,
        ease: 'power3.out',
      });
    } else {
      // Clean luxury baseline style
      gsap.to(outer, {
        width: 32,
        height: 32,
        backgroundColor: 'transparent',
        borderColor: 'rgba(197, 168, 128, 0.55)', // delicate warm gold border
        boxShadow: 'none',
        duration: 0.35,
        ease: 'power3.out',
      });

      gsap.to(inner, {
        width: 6,
        height: 6,
        backgroundColor: '#C5A880', // sharp gold focal point
        scale: 1,
        duration: 0.35,
        ease: 'power3.out',
      });
    }
  }, [isHovered, isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Outer Tracking Circle */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 rounded-full border border-solid pointer-events-none z-[9999] mix-blend-normal transition-[opacity] duration-300"
        style={{
          width: 32,
          height: 32,
          opacity: isVisible ? 1 : 0,
        }}
      />
      {/* Inner Pinpoint Dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-normal transition-[opacity] duration-300"
        style={{
          width: 6,
          height: 6,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
