import React, { useRef, useEffect } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { Loader2Icon, CheckIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { gsap } from 'gsap';

export type Variant = 'primary' | 'secondary' | 'ghost' | 'glass';
export type Size = 'sm' | 'md' | 'lg';
export type Theme = 'light' | 'dark';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  theme?: Theme;
  children: React.ReactNode;
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 rounded-xl text-xs tracking-[0.15em] uppercase font-sans font-medium',
  md: 'h-11 px-6 rounded-2xl text-xs sm:text-sm tracking-[0.18em] uppercase font-sans font-semibold',
  lg: 'h-14 px-9 rounded-2xl text-sm sm:text-base tracking-[0.2em] uppercase font-sans font-semibold',
};

function EditorialButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  success = false,
  fullWidth = false,
  theme = 'dark',
  className,
  children,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    const glow = glowRef.current;

    if (!container || !button || disabled || loading) return;

    const onMouseEnter = () => {
      // Elegant interactive hover state with unified emerald look
      gsap.to(button, {
        scale: 1.025,
        borderColor: variant === 'ghost' ? 'rgba(197, 168, 128, 0.45)' : 'rgba(234, 216, 192, 0.95)',
        backgroundColor: variant === 'ghost' 
          ? 'rgba(197, 168, 128, 0.08)' 
          : variant === 'secondary'
            ? 'rgba(236, 229, 211, 0.22)'
            : variant === 'glass'
              ? 'rgba(20, 42, 28, 0.7)'
              : 'rgba(20, 42, 28, 0.92)', // Slightly lighter warm emerald focus
        boxShadow: variant === 'ghost' 
          ? 'none' 
          : '0 16px 40px -10px rgba(12, 20, 11, 0.55), inset 0 1px 0 0 rgba(234, 216, 192, 0.25)',
        duration: 0.35,
        ease: 'power3.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0.7,
          scale: 1.25,
          duration: 0.35,
          ease: 'power3.out',
        });
      }
    };

    const onMouseLeave = () => {
      // Soft spring reset back to base alignment and style
      gsap.to(button, {
        scale: 1,
        borderColor: variant === 'ghost' 
          ? 'rgba(197, 168, 128, 0)' 
          : variant === 'secondary'
            ? 'rgba(197, 168, 128, 0.25)'
            : variant === 'glass'
              ? 'rgba(197, 168, 128, 0.4)'
              : 'rgba(197, 168, 128, 0.55)',
        backgroundColor: variant === 'ghost'
          ? 'transparent'
          : variant === 'secondary'
            ? 'rgba(236, 229, 211, 0.12)'
            : variant === 'glass'
              ? 'rgba(14, 28, 17, 0.55)'
              : 'rgba(14, 28, 17, 0.85)', // Deep emerald glass base
        boxShadow: variant === 'ghost'
          ? 'none'
          : '0 8px 32px rgba(47, 61, 42, 0.12), inset 0 1px 0 0 rgba(197, 168, 128, 0.15)',
        duration: 0.5,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0.25,
          scale: 1.0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [disabled, loading, variant]);

  const handleMouseDown = () => {
    if (disabled || loading) return;
    gsap.to(buttonRef.current, {
      scale: 0.96,
      duration: 0.1,
    });
  };

  const handleMouseUp = () => {
    if (disabled || loading) return;
    gsap.to(buttonRef.current, {
      scale: 1.025,
      duration: 0.2,
    });
  };

  // Base configurations
  const radiusClass = size === 'sm' ? 'rounded-xl' : 'rounded-2xl';

  const baseBg = variant === 'ghost'
    ? 'transparent'
    : variant === 'secondary'
      ? 'rgba(236, 229, 211, 0.12)'
      : variant === 'glass'
        ? 'rgba(14, 28, 17, 0.55)'
        : 'rgba(14, 28, 17, 0.85)'; // Deep emerald glass

  const baseBorder = variant === 'ghost'
    ? 'border-transparent'
    : variant === 'secondary'
      ? 'rgba(197, 168, 128, 0.25)'
      : variant === 'glass'
        ? 'rgba(197, 168, 128, 0.4)'
        : 'rgba(197, 168, 128, 0.55)';

  const baseShadow = variant === 'ghost'
    ? 'none'
    : '0 8px 32px rgba(47, 61, 42, 0.12), inset 0 1px 0 0 rgba(197, 168, 128, 0.15)';

  const textColor = variant === 'secondary' 
    ? 'text-[#C5A880] hover:text-[#EAD8C0]' 
    : variant === 'ghost'
      ? 'text-sage-soft hover:text-[#C5A880]'
      : 'text-[#F5F1E6]';

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center justify-center select-none',
        fullWidth && 'w-full',
      )}
    >
      {/* Unified Emerald & Warm Gold Ambient Glow */}
      {variant !== 'ghost' && (
        <div
          ref={glowRef}
          className="absolute w-[80%] h-[35%] rounded-full bg-[#7a9a5e]/25 mix-blend-screen blur-[20px] pointer-events-none transition-all duration-300"
          style={{
            bottom: '-4px',
            left: '10%',
            transform: 'translateY(2px)',
            zIndex: 0,
          }}
        />
      )}

      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          'group relative overflow-hidden transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2.5 border border-solid backdrop-blur-md',
          radiusClass,
          sizes[size],
          textColor,
          fullWidth && 'w-full',
          className,
        )}
        style={{
          background: baseBg,
          borderColor: variant === 'ghost' ? 'transparent' : baseBorder,
          boxShadow: baseShadow,
          zIndex: 1,
        }}
        {...props}
      >
        {/* Exquisite edge border glow */}
        {variant === 'primary' && (
          <div className="absolute inset-[1px] border border-white/[0.04] rounded-[15px] pointer-events-none" />
        )}

        {/* Inner Content */}
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2.5 transition-all duration-300 relative z-10 font-medium',
            (loading || success) && 'opacity-0',
          )}
        >
          {children}
        </span>

        {/* Loading and Success states */}
        {loading && (
          <span className="absolute inset-0 inline-flex items-center justify-center z-20">
            <Loader2Icon className="h-5 w-5 animate-spin text-[#C5A880]" aria-hidden />
          </span>
        )}
        {!loading && success && (
          <span className="absolute inset-0 inline-flex items-center justify-center z-20">
            <CheckIcon className="h-5 w-5 text-[#C5A880]" aria-hidden />
          </span>
        )}
      </button>
    </div>
  );
}

export function Button(props: ButtonProps) {
  return <EditorialButton {...props} />;
}

interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  label: string;
  children: React.ReactNode;
}

export function IconButton({
  label,
  className,
  children,
  onClick,
  disabled,
  ...props
}: IconButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const button = buttonRef.current;
    const glow = glowRef.current;

    if (!container || !button || disabled) return;

    const onMouseEnter = () => {
      gsap.to(button, {
        scale: 1.06,
        borderColor: 'rgba(234, 216, 192, 0.95)',
        backgroundColor: 'rgba(20, 42, 28, 0.85)',
        boxShadow: '0 12px 28px -6px rgba(12, 20, 11, 0.6), inset 0 1px 0 0 rgba(234, 216, 192, 0.25)',
        duration: 0.3,
        ease: 'power3.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0.6,
          scale: 1.3,
          duration: 0.3,
          ease: 'power3.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        borderColor: 'rgba(197, 168, 128, 0.45)',
        backgroundColor: 'rgba(14, 28, 17, 0.75)',
        boxShadow: '0 6px 18px -8px rgba(12, 20, 11, 0.35), inset 0 1px 0 0 rgba(197, 168, 128, 0.1)',
        duration: 0.4,
        ease: 'power2.out',
      });

      if (glow) {
        gsap.to(glow, {
          opacity: 0.2,
          scale: 1.0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [disabled]);

  const handleMouseDown = () => {
    if (disabled) return;
    gsap.to(buttonRef.current, {
      scale: 0.94,
      duration: 0.1,
    });
  };

  const handleMouseUp = () => {
    if (disabled) return;
    gsap.to(buttonRef.current, {
      scale: 1.06,
      duration: 0.2,
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center justify-center select-none', className)}
    >
      {/* Soft Gold/Emerald Glow Layer */}
      <div
        ref={glowRef}
        className="absolute w-[75%] h-[40%] rounded-full bg-[#7a9a5e]/20 mix-blend-screen blur-[12px] pointer-events-none transition-all duration-300"
        style={{
          bottom: '-3px',
          left: '12.5%',
          transform: 'translateY(1px)',
          zIndex: 0,
        }}
      />

      <button
        ref={buttonRef}
        aria-label={label}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        disabled={disabled}
        onClick={onClick}
        className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-solid text-[#F5F1E6] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-pointer backdrop-blur-md"
        style={{
          background: 'rgba(14, 28, 17, 0.75)',
          borderColor: 'rgba(197, 168, 128, 0.45)',
          boxShadow: '0 6px 18px -8px rgba(12, 20, 11, 0.35), inset 0 1px 0 0 rgba(197, 168, 128, 0.1)',
          zIndex: 1,
        }}
        {...props}
      >
        <span className="relative z-10 transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
          {children}
        </span>
      </button>
    </div>
  );
}

