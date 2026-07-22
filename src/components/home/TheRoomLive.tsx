import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  MapPinIcon, 
  VolumeXIcon, 
  CompassIcon, 
  UsersIcon,
  CheckCircle2Icon
} from 'lucide-react';
import { FloorMap } from '../FloorMap';
import { TABLES } from '../../lib/data';
import { DiningTable } from '../../types';
import { Button } from '../ui/Button';

// Let's craft highly curated ambiance data for each table prefix to make the live experience feel real and luxurious!
const TABLE_METADATA: Record<string, {
  ambiance: string;
  seating: string;
  noise: string;
  bestFor: string;
  image: string;
}> = {
  G: {
    ambiance: 'Positioned in our climate-controlled glass conservatory, surrounded by climbing jasmine and illuminated orchids with views of the evening sky.',
    seating: 'Plush velvet wrap-around banquet seating with white linen draping.',
    noise: 'Serene & tranquil (Perfect for intimate conversation)',
    bestFor: 'Anniversaries, romantic dates, and quiet celebrations.',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/906f5ebd-93e1-4428-bad6-02b05d0fee6f.jpg'
  },
  T: {
    ambiance: 'Set on our open-air heated teak deck, catching a gentle garden breeze with hanging lanterns and soft candlelight.',
    seating: 'Ergonomic woven rattan armchairs with deep linen cushions.',
    noise: 'Vibrant outdoor lounge ambiance with natural garden acoustics.',
    bestFor: 'Al fresco enthusiasts, lively wine pairings, and social evenings.',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/eaa923fe-3365-4e67-9015-e6d602b92559.jpg'
  },
  H: {
    ambiance: 'Nestled adjacent to our glowing open-hearth firewood kitchen, offering front-row sights of artisanal culinary preparation and a rich oak-wood aroma.',
    seating: 'Saddle-leather high-back chairs on polished slate floors.',
    noise: 'Rich, culinary theater with sound of crackling cherry wood.',
    bestFor: 'Culinary enthusiasts, whiskey tasting, and high-energy dining.',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/ad57b0db-fcad-490c-833e-8d959f676550.jpg'
  }
};

export function TheRoomLive() {
  const navigate = useNavigate();
  // Start with G5 (a spacious, central, beautiful table in Garden Room) selected by default to invite interaction
  const [selectedTable, setSelectedTable] = useState<DiningTable | null>(
    TABLES.find(t => t.number === 'G5') || TABLES[0] || null
  );

  const prefix = selectedTable ? selectedTable.number[0] : 'G';
  const meta = TABLE_METADATA[prefix] || TABLE_METADATA['G'];

  const availableCount = TABLES.filter(t => t.status === 'available').length;

  const handleTableSelect = (table: DiningTable) => {
    setSelectedTable(table);
  };

  const handleBookTable = () => {
    if (selectedTable) {
      // Store selected table in sessionStorage so the reservation wizard can pre-select it
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selected_table_id', selectedTable.id.toString());
      }
      navigate('/reserve');
    }
  };

  return (
    <section
      id="room-live"
      className="relative w-full scroll-mt-24 overflow-hidden bg-[#0c120a] py-24 border-b border-white/5"
    >
      {/* Deep atmospheric glowing blur backdrops */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-green/5 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-amber/5 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-content px-5 sm:px-8 z-10">
        
        {/* Header Block */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end border-b border-white/5 pb-12" data-reveal="header">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green">
              The room
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-cream-soft sm:text-5xl tracking-tight leading-[1.1]">
              Pick your exact table, live
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-sage-soft/75">
              Explore real-time layout views across the Garden Room, Terrace, and Hearth. 
              Tap on any table below to inspect its unique view, seating style, and live status. 
              The table you choose is exactly where you will be seated.
            </p>
          </div>
          
          {/* Live Status Chip Container with Circular Occupancy Donut Chart */}
          <div className="flex flex-row items-center gap-5 bg-[#162113]/50 border border-white/10 rounded-2xl p-4 backdrop-blur-md shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            {/* SVG Circular Progress / Donut Indicator */}
            <div className="relative h-12 w-12 shrink-0">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 44 44">
                {/* Background Ring */}
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3.5"
                />
                {/* Occupied Arc */}
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  fill="none"
                  stroke="#5fff96"
                  strokeWidth="3.5"
                  strokeDasharray="113.1"
                  strokeDashoffset={113.1 - (113.1 * (TABLES.length - availableCount)) / TABLES.length}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Inner percentage display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[10px] font-bold text-cream-soft font-mono">
                  {Math.round(((TABLES.length - availableCount) / TABLES.length) * 100)}%
                </span>
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5fff96] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-sage-soft/60 font-bold">Tonight's Occupancy</p>
              </div>
              <p className="text-sm font-semibold text-cream-soft mt-0.5 font-mono">
                {TABLES.length - availableCount}/{TABLES.length} Filled
              </p>
              <p className="text-[10px] text-sage-soft/40 font-medium">
                {availableCount} tables available
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Layout Area */}
        <div className="mt-14 grid gap-10 lg:grid-cols-12 items-start">
          
          {/* Left Column: Interactive Floor Map Container */}
          <div className="lg:col-span-7 flex flex-col gap-4" data-reveal="slide-left">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-sage-soft/60 flex items-center gap-1.5">
                <CompassIcon className="h-4 w-4 text-green" /> Interactive Floor Plan
              </span>
              <span className="text-xs text-cream-soft/40 italic">
                Click a table to inspect
              </span>
            </div>
            
            {/* Dark glassmorphic map shell */}
            <div className="p-4 sm:p-6 bg-[#162113]/30 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
              <FloorMap 
                variant="glass"
                interactive={true}
                selectedId={selectedTable?.id}
                onSelect={handleTableSelect}
              />
            </div>
          </div>

          {/* Right Column: Deep Glassmorphic Detail Panel */}
          <div className="lg:col-span-5 h-full" data-reveal="slide-right">
            <div className="flex flex-col h-full justify-between">
              <AnimatePresence mode="wait">
                {selectedTable ? (
                  <motion.div
                    key={selectedTable.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#162113]/65 backdrop-blur-[24px] shadow-[0_24px_64px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    {/* Live View Table Photo */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={meta.image}
                        alt={`Table ${selectedTable.number} Ambiance`}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#162113] via-[#162113]/30 to-transparent" />
                      
                      {/* Live Area Badge */}
                      <span className="absolute left-4 top-4 rounded-full bg-[#11190d]/80 border border-white/10 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-amber uppercase tracking-wider">
                        {selectedTable.area === 'garden' ? 'Garden Room' : selectedTable.area === 'terrace' ? 'Outdoor Terrace' : 'Kitchen Hearth'}
                      </span>

                      {/* Live status floating badge */}
                      <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-semibold flex items-center gap-1.5 backdrop-blur-md ${
                        selectedTable.status === 'available'
                          ? 'bg-green/20 border-green/30 text-[#dcffe5]'
                          : 'bg-sriracha/20 border-sriracha/30 text-[#ff8e7a]'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${selectedTable.status === 'available' ? 'bg-green animate-pulse' : 'bg-sriracha'}`} />
                        {selectedTable.status === 'available' ? 'Available Live' : 'Reserved'}
                      </span>
                    </div>

                    {/* Ambiance Details Content */}
                    <div className="p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Table Name and Seats */}
                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-sage-soft/50 font-bold">Premium Reserve Spot</p>
                            <h3 className="font-serif text-3xl font-semibold text-cream-soft mt-0.5">
                              Table {selectedTable.number}
                            </h3>
                          </div>
                          
                          <div className="flex flex-row items-center gap-2 bg-white/5 border border-white/5 rounded-2xl px-4 py-2 font-mono">
                            <UsersIcon className="h-4 w-4 text-green" />
                            <span className="text-sm font-semibold text-cream-soft">{selectedTable.capacity} Seats</span>
                          </div>
                        </div>

                        {/* Description List */}
                        <div className="mt-5 space-y-4 text-sm leading-relaxed">
                          <div className="flex items-start gap-3">
                            <MapPinIcon className="h-5 w-5 text-amber shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-cream-soft/60 uppercase tracking-wider">Atmosphere</p>
                              <p className="text-sage-soft/85 mt-0.5 text-[13px]">{meta.ambiance}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <SparklesIcon className="h-5 w-5 text-amber shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-cream-soft/60 uppercase tracking-wider">Seating Style</p>
                              <p className="text-sage-soft/85 mt-0.5 text-[13px]">{meta.seating}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <VolumeXIcon className="h-5 w-5 text-amber shrink-0 mt-0.5" />
                            <div>
                              <p className="text-xs font-semibold text-cream-soft/60 uppercase tracking-wider">Acoustics</p>
                              <p className="text-sage-soft/85 mt-0.5 text-[13px]">{meta.noise}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-8">
                        <Button
                          variant="glass"
                          size="lg"
                          fullWidth
                          onClick={handleBookTable}
                          disabled={selectedTable.status !== 'available'}
                        >
                          {selectedTable.status === 'available' ? (
                            <>
                              Reserve Table {selectedTable.number}
                              <ArrowRightIcon className="h-4 w-4 text-[#DCFFE5] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2" />
                            </>
                          ) : (
                            'Table Fully Booked'
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-full min-h-[400px] border border-dashed border-white/10 rounded-3xl p-8 text-center bg-[#162113]/10 backdrop-blur-md">
                    <MapPinIcon className="h-10 w-10 text-white/20 animate-bounce mb-4" />
                    <h3 className="font-serif text-xl font-semibold text-cream-soft">No Table Selected</h3>
                    <p className="text-xs text-sage-soft/50 max-w-xs mt-2 leading-relaxed">
                      Please click any table on our interactive layout on the left to see details of its unique view, seats, and live bookings.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
