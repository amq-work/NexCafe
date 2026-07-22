import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CalendarIcon, UsersIcon, ClockIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import heroBgImg from '../../assets/hero-bg.jpg';

export function BookYourTable() {
  const navigate = useNavigate();

  return (
    <section
      id="book-your-table"
      className="w-full scroll-mt-24 py-28 text-cream-soft relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(19, 27, 16, 0.88), rgba(10, 15, 9, 0.94)), url(${heroBgImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Subtle overlay accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#131B10]/20 to-[#131B10]/40 pointer-events-none" />

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8 flex flex-col items-center">
          
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#AAD08D]">
              Reservations
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-cream-soft leading-tight tracking-tight">
              Book your table
            </h2>
          </div>

          <p className="text-sm sm:text-base text-sage-soft/80 leading-relaxed font-sans">
            Experience the artistry of flame-crafted delicacies and handcrafted pairings at NexCafe'. Whether it's a cozy evening by the window, a celebration in our private dining suite, or an open-air dinner on our outdoor patio, secure your perfect spot in advance.
          </p>

          {/* Subtle Selling points / Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full justify-items-center">
            <div className="flex items-center gap-2.5">
              <CalendarIcon className="h-5 w-5 text-[#AAD08D]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-soft/90">Instant Booking</span>
            </div>
            <div className="flex items-center gap-2.5">
              <UsersIcon className="h-5 w-5 text-[#AAD08D]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-soft/90">Select Your Table</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ClockIcon className="h-5 w-5 text-[#AAD08D]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sage-soft/90">Real-Time Seating</span>
            </div>
          </div>

          {/* Action Area */}
          <div className="pt-4">
            <Button
              variant="glass"
              size="lg"
              onClick={() => navigate('/reserve')}
              className="px-10"
            >
              <span>Book now</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2" />
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
