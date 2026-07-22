import React from 'react';
import { motion } from 'motion/react';
import { 
  UsersIcon, 
  Info,
  Layers,
  Sparkles,
  Lock,
  Calendar,
  Check,
  Clock,
  RotateCcw
} from 'lucide-react';
import { TABLES } from '../lib/data';
import { DiningTable } from '../types';
import { cn } from '../lib/utils';

interface FloorMapProps {
  selectedId?: number | null;
  onSelect?: (table: DiningTable) => void;
  /** minimum capacity a table must have to be selectable */
  minCapacity?: number;
  /** disables interaction — used for the teaser / read-only views */
  interactive?: boolean;
  className?: string;
  variant?: 'light' | 'glass';
  tables?: DiningTable[];
}

export function FloorMap({
  selectedId,
  onSelect,
  minCapacity = 1,
  interactive = true,
  className,
  tables = TABLES,
}: FloorMapProps) {
  
  // Calculate comprehensive statistics for the SaaS operational dashboard
  const stats = React.useMemo(() => {
    let available = 0;
    let reserved = 0;
    let blocked = 0;
    let occupied = 0;
    let cleaning = 0;
    
    tables.forEach((t) => {
      if (t.status === 'available') {
        if (t.capacity >= minCapacity) available++;
      } else if (t.status === 'reserved') {
        reserved++;
      } else if (t.status === 'blocked') {
        blocked++;
      } else if (t.status === 'occupied') {
        occupied++;
      } else if (t.status === 'cleaning') {
        cleaning++;
      }
    });
    
    return { available, reserved, blocked, occupied, cleaning, total: tables.length };
  }, [tables, minCapacity]);

  return (
    <div className={cn("w-full flex flex-col select-none", className)}>
      
      {/* ==================== 1. SaaS PREMIUM SEATING METRICS BOARD ==================== */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:flex md:items-center md:justify-between rounded-2xl bg-[#FCFDFB] border border-[#EAF4E4] p-3.5 shadow-xs">
        <div className="flex items-center gap-3 px-1 col-span-2 md:col-span-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF4E4] text-[#5C9A42]">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A2E1A]/50 font-sans">Operational Map</p>
            <p className="text-sm font-bold text-[#1A2E1A] font-sans">Live Floor & Seating Status</p>
          </div>
        </div>
        
        {/* Responsive, scannable state counters */}
        <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 sm:flex-nowrap sm:gap-6 w-full md:w-auto mt-2 md:mt-0 col-span-2 md:col-span-1">
          <div className="text-left border-r border-[#EAF4E4] pr-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#5C9A42]">
              <span className="h-2 w-2 rounded-full bg-[#AAD08D]" />
              {stats.available} Available
            </span>
            <p className="text-[9px] text-[#1A2E1A]/50 font-semibold font-sans uppercase tracking-wider mt-0.5">Ready to Seat</p>
          </div>

          <div className="text-left border-r border-[#EAF4E4] pr-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A2E1A]/70">
              <span className="h-2 w-2 rounded-full bg-neutral-300" />
              {stats.reserved} Reserved
            </span>
            <p className="text-[9px] text-[#1A2E1A]/50 font-semibold font-sans uppercase tracking-wider mt-0.5">Held Slots</p>
          </div>

          <div className="text-left border-r border-[#EAF4E4] pr-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7FB565]">
              <span className="h-2 w-2 rounded-full bg-[#5C9A42] animate-pulse" />
              {stats.occupied} Seated
            </span>
            <p className="text-[9px] text-[#1A2E1A]/50 font-semibold font-sans uppercase tracking-wider mt-0.5">Dining Live</p>
          </div>

          <div className="text-left border-r border-[#EAF4E4] pr-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              {stats.cleaning} Cleaning
            </span>
            <p className="text-[9px] text-[#1A2E1A]/50 font-semibold font-sans uppercase tracking-wider mt-0.5">Turnover</p>
          </div>

          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-neutral-200" />
              {stats.blocked} Blocked
            </span>
            <p className="text-[9px] text-[#1A2E1A]/50 font-semibold font-sans uppercase tracking-wider mt-0.5">Out of Order</p>
          </div>
        </div>
      </div>

      {/* ==================== 2. 2D MINIMAL OPERATIONAL FLOOR PLAN CONTAINER ==================== */}
      <div className="w-full overflow-x-auto scrollbar-none pb-3">
        <div 
          className="relative min-w-[760px] md:min-w-0 w-[760px] md:w-full aspect-[1000/680] overflow-hidden rounded-3xl border border-[#EAF4E4] bg-[#FFFFFF] shadow-xs transition-all duration-300 shrink-0"
        >
        {/* ==================== 3. SVG ARCHITECTURAL BACKGROUND ==================== */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-0" 
          viewBox="0 0 1000 680" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background definitions for patterns */}
          <defs>
            {/* Elegant faint grid dots */}
            <pattern id="seating-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.75" fill="#EAF4E4" opacity="0.45" />
            </pattern>
            {/* Minimal cross-hatching pattern for Blocked tables */}
            <pattern id="blocked-cross" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 10 10 M 10 0 L 0 10" fill="none" stroke="#E6EAE2" strokeWidth="1" />
            </pattern>
            {/* Al Fresco wood plank decking pattern for Patio */}
            <pattern id="deck-lines" width="14" height="14" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="14" stroke="#EAF4E4" strokeWidth="0.8" opacity="0.6" />
            </pattern>
          </defs>

          {/* Canvas Grid Fill */}
          <rect width="1000" height="680" fill="url(#seating-grid)" />

          {/* ==================== SVG GROUP: ZONE BACKGROUNDS ==================== */}
          {/* Low-opacity background panels to identify the 8 distinct zones without visual clutter */}
          <g id="zone-backgrounds" opacity="0.035" className="text-[#1A2E1A]">
            {/* 1. Open Kitchen */}
            <rect x="15" y="15" width="305" height="215" rx="12" fill="currentColor" />
            {/* 2. Cocktail Bar Area */}
            <rect x="15" y="445" width="280" height="220" rx="12" fill="currentColor" />
            {/* 3. Waiting Lounge */}
            <rect x="310" y="530" width="140" height="135" rx="12" fill="currentColor" />
            {/* 4. Reception */}
            <rect x="450" y="500" width="130" height="165" rx="12" fill="currentColor" />
            {/* 5. Window Seating */}
            <rect x="320" y="15" width="460" height="115" rx="12" fill="currentColor" />
            {/* 6. Main Dining Hall */}
            <rect x="320" y="130" width="460" height="370" rx="12" fill="currentColor" />
            {/* 7. VIP Area (The Conservatory) */}
            <rect x="780" y="15" width="205" height="225" rx="12" fill="currentColor" />
            {/* 8. Outdoor Patio (Deck line pattern applied below in distinct group) */}
          </g>

          {/* Detailed background deck lines fill for Patio */}
          <g id="patio-decking">
            <rect x="750" y="500" width="235" height="165" rx="12" fill="url(#deck-lines)" stroke="#AAD08D" strokeWidth="0.75" strokeDasharray="3,3" />
          </g>

          {/* ==================== SVG GROUP: ARCHITECTURAL WALLS ==================== */}
          {/* Clean, thin architectural linework framing room bounds with subtle radii */}
          <g id="architectural-walls" stroke="#DCE2D9" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* Outer perimeter bounds */}
            <rect x="15" y="15" width="970" height="650" rx="16" />
            
            {/* Kitchen division */}
            <path d="M 320 15 L 320 230 L 15 230" />
            
            {/* Washrooms enclosure */}
            <path d="M 200 230 L 200 370 L 15 370" />
            <line x1="110" y1="230" x2="110" y2="370" strokeWidth="0.8" />

            {/* Staff corridor enclosure */}
            <path d="M 200 370 L 200 430 L 15 430" />

            {/* VIP Conservatory room enclosure */}
            <path d="M 780 15 L 780 240 L 985 240" />

            {/* Private Oak Room enclosure */}
            <path d="M 780 240 L 780 480 L 985 480" />
          </g>

          {/* ==================== SVG GROUP: WINDOW PROMENADE ==================== */}
          {/* Glass lines along the top-central wall */}
          <g id="window-promenade-glass" stroke="#7FB565" strokeWidth="0.75" opacity="0.4">
            <line x1="320" y1="15" x2="780" y2="15" strokeWidth="2.5" stroke="#90A4AE" />
            <line x1="320" y1="18" x2="780" y2="18" strokeWidth="0.8" stroke="#CFD8DC" />
            <line x1="400" y1="13" x2="410" y2="19" />
            <line x1="500" y1="13" x2="510" y2="19" />
            <line x1="600" y1="13" x2="610" y2="19" />
            <line x1="700" y1="13" x2="710" y2="19" />
          </g>

          {/* ==================== SVG GROUP: DOOR SWING ARCS ==================== */}
          {/* Precise CAD-like door symbols and motion swings */}
          <g id="door-swings" stroke="#9CA39F" strokeWidth="0.8" fill="none" strokeDasharray="2.5,2.5" opacity="0.55">
            {/* Double entrance doors at bottom-center */}
            <path d="M 450 615 A 50 50 0 0 0 400 665" />
            <path d="M 550 615 A 50 50 0 0 1 600 665" />
            {/* Solid door leafs */}
            <line x1="450" y1="665" x2="450" y2="615" strokeWidth="1" stroke="#737373" strokeDasharray="none" />
            <line x1="550" y1="665" x2="550" y2="615" strokeWidth="1" stroke="#737373" strokeDasharray="none" />

            {/* VIP Conservatory single door swing */}
            <path d="M 820 160 A 40 40 0 0 0 780 120" />
            <line x1="780" y1="160" x2="820" y2="160" strokeWidth="1" stroke="#737373" strokeDasharray="none" />

            {/* Private Oak Room single door swing */}
            <path d="M 820 360 A 40 40 0 0 0 780 320" />
            <line x1="780" y1="360" x2="820" y2="360" strokeWidth="1" stroke="#737373" strokeDasharray="none" />

            {/* Kitchen double-swing service doors */}
            <path d="M 290 130 A 30 30 0 0 0 320 100" />
            <line x1="320" y1="130" x2="290" y2="130" strokeWidth="1" stroke="#737373" strokeDasharray="none" />

            {/* Washroom main door swing */}
            <path d="M 170 350 A 30 30 0 0 0 200 320" />
            <line x1="200" y1="350" x2="170" y2="350" strokeWidth="1" stroke="#737373" strokeDasharray="none" />
          </g>

          {/* ==================== SVG GROUP: FIXED FURNITURE & EQUIPMENT ==================== */}
          {/* Pristine architectural line work for custom interior furniture fixtures */}
          <g id="fixed-furniture" stroke="#DCE2D9" strokeWidth="1.2" fill="#FFFFFF" strokeLinejoin="round">
            {/* --- KITCHEN EQUIPMENT --- */}
            {/* Dual preparation island counters */}
            <rect x="40" y="45" width="160" height="30" rx="3" />
            <line x1="120" y1="45" x2="120" y2="75" strokeWidth="0.8" stroke="#E6EAE2" />
            {/* Stainless steel sinks */}
            <rect x="220" y="45" width="50" height="30" rx="2" />
            <circle cx="232" cy="60" r="6" strokeWidth="0.8" fill="none" />
            <circle cx="258" cy="60" r="6" strokeWidth="0.8" fill="none" />
            {/* Chef stove ranges with burners */}
            <rect x="40" y="105" width="230" height="40" rx="3" />
            {[68, 122, 178, 232].map((cx) => (
              <g key={`burner-${cx}`}>
                <circle cx={cx} cy="125" r="9.5" fill="#FCFDFB" stroke="#AAD08D" strokeWidth="1" />
                <circle cx={cx} cy="125" r="4.5" fill="none" stroke="#5C9A42" strokeWidth="0.5" />
              </g>
            ))}
            {/* Culinary pass-through boundary table */}
            <rect x="140" y="212" width="160" height="12" rx="2" fill="#F6FAF3" />
            <line x1="140" y1="218" x2="300" y2="218" stroke="#AAD08D" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.6" />

            {/* --- SERVICE TOILETS --- */}
            <g strokeWidth="0.8">
              {/* Ladies WC cubicle */}
              <rect x="35" y="240" width="22" height="14" rx="1.5" />
              <ellipse cx="46" cy="265" rx="5.5" ry="7.5" />
              <ellipse cx="85" cy="245" rx="7.5" ry="5.5" />
              {/* Gents WC cubicle */}
              <rect x="120" y="240" width="22" height="14" rx="1.5" />
              <ellipse cx="131" cy="265" rx="5.5" ry="7.5" />
              <ellipse cx="170" cy="245" rx="7.5" ry="5.5" />
            </g>

            {/* --- L-SHAPED COCKTAIL BAR COUNTER --- */}
            {/* Multi-layer polished marble & wood texture profile curves */}
            <path d="M 40 480 L 230 480 A 30 30 0 0 1 260 510 L 260 650" fill="none" stroke="#EAF4E4" strokeWidth="11" strokeLinecap="round" />
            <path d="M 40 480 L 230 480 A 30 30 0 0 1 260 510 L 260 650" fill="none" stroke="#AAD08D" strokeWidth="1.8" strokeLinecap="round" opacity="0.45" />
            <path d="M 40 474 L 224 474 A 36 36 0 0 1 266 510 L 266 650" fill="none" stroke="#DCE2D9" strokeWidth="1" strokeLinecap="round" />

            {/* Bar stools positioned symmetrically around the marble counter arc */}
            <g id="stools" strokeWidth="0.85" stroke="#AAD08D">
              {[
                { cx: 75, cy: 512 },
                { cx: 110, cy: 512 },
                { cx: 145, cy: 512 },
                { cx: 180, cy: 512 },
                { cx: 215, cy: 512 },
                { cx: 236, cy: 532 },
                { cx: 236, cy: 567 },
                { cx: 236, cy: 602 },
                { cx: 236, cy: 637 },
              ].map((stool, idx) => (
                <g key={`bar-stool-${idx}`}>
                  <circle cx={stool.cx} cy={stool.cy} r="7" fill="#FFFFFF" />
                  <circle cx={stool.cx} cy={stool.cy} r="4" fill="none" stroke="#EAF4E4" strokeWidth="0.75" />
                  {/* Symmetrical crescent backrest */}
                  {stool.cy === 512 ? (
                    <path d={`M ${stool.cx - 7} ${stool.cy + 2.5} A 7 7 0 0 0 ${stool.cx + 7} ${stool.cy + 2.5}`} fill="none" stroke="#5C9A42" strokeWidth="1.2" />
                  ) : (
                    <path d={`M ${stool.cx - 2.5} ${stool.cy - 7} A 7 7 0 0 0 ${stool.cx - 2.5} ${stool.cy + 7}`} fill="none" stroke="#5C9A42" strokeWidth="1.2" />
                  )}
                </g>
              ))}
            </g>

            {/* --- WAITING LOUNGE SOFA & COFFEE TABLE --- */}
            <g strokeWidth="0.95" stroke="#DCE2D9">
              {/* Symmetrical waiting sofa cushions */}
              <rect x="330" y="565" width="85" height="19" rx="3" />
              <line x1="358" y1="565" x2="358" y2="584" stroke="#E6EAE2" strokeWidth="0.8" />
              <line x1="386" y1="565" x2="386" y2="584" stroke="#E6EAE2" strokeWidth="0.8" />
              {/* Sofa armrests */}
              <rect x="326" y="565" width="4" height="19" rx="1" fill="#F6FAF3" />
              <rect x="415" y="565" width="4" height="19" rx="1" fill="#F6FAF3" />
              {/* Oak Coffee table */}
              <rect x="340" y="596" width="65" height="13" rx="1.5" fill="#FCFDFB" strokeWidth="0.8" />
              {/* Sleek catalog on table */}
              <rect x="366" y="600" width="13" height="5" fill="#EAF4E4" stroke="#5C9A42" strokeWidth="0.5" />
            </g>

            {/* --- MODERN HOST RECEPTION DESK --- */}
            <g strokeWidth="1" stroke="#5C9A42">
              <rect x="460" y="535" width="80" height="22" rx="3" fill="#FFFFFF" />
              <rect x="460" y="535" width="80" height="7" rx="1" fill="#F6FAF3" />
              {/* High-end tablet screen */}
              <rect x="488" y="541" width="24" height="11" rx="1.2" fill="#EAF4E4" stroke="#AAD08D" strokeWidth="0.8" />
              <line x1="492" y1="546" x2="508" y2="546" strokeWidth="0.8" />
              {/* Ergonomic swivel chair */}
              <rect x="491" y="514" width="18" height="13" rx="1.5" fill="#FFFFFF" stroke="#DCE2D9" strokeWidth="0.8" />
              <path d="M 491 522 A 9 9 0 0 1 509 522" fill="none" stroke="#737373" strokeWidth="1.2" />
            </g>
          </g>

          {/* ==================== SVG GROUP: DECORATIONS ==================== */}
          {/* Sparse vector indoor plants styled in CAD-stamp layout to elevate the layout */}
          <g id="decorations">
            {[
              { cx: 345, cy: 45 },  /* Planter 1: Window promenade corridor */
              { cx: 605, cy: 555 }  /* Planter 2: Reception entrance lobby */
            ].map((plant, idx) => (
              <g key={`cad-planter-${idx}`} transform={`translate(${plant.cx}, ${plant.cy})`}>
                <circle cx="0" cy="0" r="10" fill="#FFFFFF" stroke="#DCE2D9" strokeWidth="1.2" />
                <circle cx="0" cy="0" r="7.5" fill="#F6FAF3" stroke="#AAD08D" strokeWidth="0.5" />
                {/* Clean CAD foliage leaf stems layout */}
                <g stroke="#5C9A42" strokeWidth="0.75" fill="#EAF4E4" opacity="0.85">
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(0)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(45)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(90)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(135)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(180)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(225)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(270)" />
                  <ellipse cx="0" cy="-11" rx="3" ry="8" transform="rotate(315)" />
                </g>
                <circle cx="0" cy="0" r="2" fill="#5C9A42" />
              </g>
            ))}
          </g>

          {/* ==================== SVG GROUP: TEXT LABELS ==================== */}
          {/* Clean, uppercase letter-spaced zone titles */}
          <g id="text-labels" className="font-sans text-[9px] font-extrabold tracking-[0.25em] fill-[#1A2E1A]/40 uppercase">
            <text x="160" y="180" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/55">OPEN KITCHEN</text>
            <text x="160" y="192" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Culinary Hearth</text>

            <text x="110" y="315" textAnchor="middle" className="text-[8px] tracking-[0.15em] font-bold fill-[#1A2E1A]/50">WASHROOMS</text>
            <text x="65" y="295" textAnchor="middle" className="text-[7px] font-bold fill-[#1A2E1A]/30">LADIES</text>
            <text x="155" y="295" textAnchor="middle" className="text-[7px] font-bold fill-[#1A2E1A]/30">GENTS</text>

            <text x="110" y="405" textAnchor="middle" className="text-[7.5px] font-bold tracking-[0.15em] fill-[#1A2E1A]/30">STAFF CORRIDOR</text>

            <text x="140" y="585" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/55">BAR AREA</text>
            <text x="140" y="597" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Brass Counter Lounge</text>
            
            <text x="515" y="582" textAnchor="middle" className="text-[9.5px] fill-[#1A2E1A]/55">RECEPTION</text>
            <text x="380" y="626" textAnchor="middle" className="text-[8px] fill-[#1A2E1A]/45">WAITING LOUNGE</text>
            
            {/* Main Dining Hall Center */}
            <text x="535" y="390" textAnchor="middle" className="text-[14px] font-black tracking-[0.35em] fill-[#1A2E1A]/80">MAIN HALL</text>
            <text x="535" y="406" textAnchor="middle" className="text-[8px] tracking-[0.15em] font-medium fill-[#1A2E1A]/40">Central Dining Commons</text>
            
            <text x="540" y="65" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/55">WINDOW SEATING</text>
            <text x="540" y="77" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Promenade Tables</text>
            
            <text x="882" y="85" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/60">VIP CONSERVATORY</text>
            <text x="882" y="97" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Discreet Dining</text>

            <text x="882" y="355" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/60">PRIVATE DINING</text>
            <text x="882" y="367" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Oak Board Room</text>

            <text x="860" y="615" textAnchor="middle" className="text-[10px] fill-[#1A2E1A]/55">OUTDOOR PATIO</text>
            <text x="860" y="627" textAnchor="middle" className="text-[7.5px] tracking-[0.1em] font-medium fill-[#1A2E1A]/35">Al Fresco Deck</text>
          </g>

          {/* ==================== SVG GROUP: METRIC SCALE BAR ==================== */}
          <g id="scale-bar" opacity="0.4" transform="translate(30, 650)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="#1A2E1A" strokeWidth="0.8" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="#1A2E1A" strokeWidth="0.8" />
            <line x1="20" y1="-3" x2="20" y2="3" stroke="#1A2E1A" strokeWidth="0.8" />
            <line x1="40" y1="-3" x2="40" y2="3" stroke="#1A2E1A" strokeWidth="0.8" />
            <line x1="60" y1="-3" x2="60" y2="3" stroke="#1A2E1A" strokeWidth="0.8" />
            <text x="0" y="-7" className="font-mono text-[6.5px] fill-[#1A2E1A] font-semibold">0M</text>
            <text x="20" y="-7" className="font-mono text-[6.5px] fill-[#1A2E1A] font-semibold">2M</text>
            <text x="40" y="-7" className="font-mono text-[6.5px] fill-[#1A2E1A] font-semibold">4M</text>
            <text x="60" y="-7" className="font-mono text-[6.5px] fill-[#1A2E1A] font-semibold">6M</text>
            <text x="70" y="3" className="font-mono text-[6.5px] fill-[#1A2E1A] font-semibold uppercase tracking-wider">CAD SCALE 1:40 (METRIC)</text>
          </g>
        </svg>

        {/* ==================== 4. INTERACTIVE TABLE COMPONENT OVERLAY ==================== */}
        {/* Absolute layer containing responsive HTML buttons on top of the vector CAD map */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto">
          {tables.map((table) => {
            const selected = selectedId === table.id;
            const capacityTooSmall = table.capacity < minCapacity;
            
            // Core Operational States
            const isReserved = table.status === 'reserved';
            const isBlocked = table.status === 'blocked';
            const isOccupied = table.status === 'occupied';
            const isCleaning = table.status === 'cleaning';
            const isAvailable = table.status === 'available';
            
            const unavailable = isReserved || isBlocked || isOccupied || isCleaning;
            const disabled = !interactive || unavailable || capacityTooSmall;

            // Shape classes supporting round and square tables with soft rounded-xl corners
            const isRound = table.shape === 'round';
            const shapeClass = isRound ? "rounded-full" : "rounded-xl";

            let sizeClass = "";
            if (table.capacity === 2) {
              sizeClass = "w-[44px] h-[44px] sm:w-[50px] sm:h-[50px]";
            } else if (table.capacity === 4) {
              sizeClass = "w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]";
            } else if (table.capacity === 6) {
              sizeClass = "w-[72px] h-[48px] sm:w-[84px] sm:h-[54px]";
            } else if (table.capacity === 8) {
              sizeClass = "w-[88px] h-[48px] sm:w-[104px] sm:h-[54px]";
            }

            // High-precision architectural tucked dining chairs matching the table's exact state
            const renderChairs = () => {
              const chairs = [];
              const cap = table.capacity;

              // Derive colors strictly from the project design system
              let chairBorder = "border-[#AAD08D]";
              let chairBg = "bg-[#FFFFFF]";
              
              if (selected) {
                chairBorder = "border-[#5C9A42]";
                chairBg = "bg-[#EAF4E4]";
              } else if (isOccupied) {
                chairBorder = "border-[#AAD08D]";
                chairBg = "bg-white";
              } else if (isCleaning) {
                chairBorder = "border-amber-300";
                chairBg = "bg-amber-50/50";
              } else if (isReserved) {
                chairBorder = "border-neutral-200";
                chairBg = "bg-neutral-50/20";
              } else if (isBlocked) {
                chairBorder = "border-neutral-300";
                chairBg = "bg-neutral-100/10";
              } else if (capacityTooSmall) {
                chairBorder = "border-[#E4E8E3]";
                chairBg = "bg-transparent opacity-15";
              }

              const baseChairClass = cn(
                "absolute border transition-all duration-200 shadow-2xs",
                chairBorder, 
                chairBg
              );

              if (!isRound) {
                if (cap === 2) {
                  // Symmetrical tucked chairs left & right
                  chairs.push(
                    <div key="c-l" className={cn(baseChairClass, "left-0 top-1/2 -translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md border-r-0")} />,
                    <div key="c-r" className={cn(baseChairClass, "right-0 top-1/2 translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md border-l-0")} />
                  );
                } else if (cap === 4) {
                  // Symmetrical tucked chairs on all 4 sides
                  chairs.push(
                    <div key="c-t" className={cn(baseChairClass, "top-0 left-1/2 -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-b" className={cn(baseChairClass, "bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-l" className={cn(baseChairClass, "left-0 top-1/2 -translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md border-r-0")} />,
                    <div key="c-r" className={cn(baseChairClass, "right-0 top-1/2 translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md border-l-0")} />
                  );
                } else if (cap === 6) {
                  // Rectangular layout chairs (2 top, 2 bottom, 1 left, 1 right)
                  chairs.push(
                    <div key="c-t1" className={cn(baseChairClass, "top-0 left-[30%] -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-t2" className={cn(baseChairClass, "top-0 left-[70%] -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-b1" className={cn(baseChairClass, "bottom-0 left-[30%] -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-b2" className={cn(baseChairClass, "bottom-0 left-[70%] -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-l" className={cn(baseChairClass, "left-0 top-1/2 -translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md border-r-0")} />,
                    <div key="c-r" className={cn(baseChairClass, "right-0 top-1/2 translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md border-l-0")} />
                  );
                } else if (cap === 8) {
                  // Large rectangular layout chairs (3 top, 3 bottom, 1 left, 1 right)
                  chairs.push(
                    <div key="c-t1" className={cn(baseChairClass, "top-0 left-[20%] -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-t2" className={cn(baseChairClass, "top-0 left-[50%] -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-t3" className={cn(baseChairClass, "top-0 left-[80%] -translate-x-1/2 -translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-b1" className={cn(baseChairClass, "bottom-0 left-[20%] -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-b2" className={cn(baseChairClass, "bottom-0 left-[50%] -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-b3" className={cn(baseChairClass, "bottom-0 left-[80%] -translate-x-1/2 translate-y-[70%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-l" className={cn(baseChairClass, "left-0 top-1/2 -translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md border-r-0")} />,
                    <div key="c-r" className={cn(baseChairClass, "right-0 top-1/2 translate-x-[70%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md border-l-0")} />
                  );
                }
              } else {
                // Round table seating positioning
                if (cap === 2) {
                  chairs.push(
                    <div key="c-l" className={cn(baseChairClass, "left-0 top-1/2 -translate-x-[75%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-l-md border-r-0")} />,
                    <div key="c-r" className={cn(baseChairClass, "right-0 top-1/2 translate-x-[75%] -translate-y-1/2 w-2.5 h-4 sm:w-3 sm:h-5 rounded-r-md border-l-0")} />
                  );
                } else {
                  // VIP tables (6 seats radially styled around circles)
                  chairs.push(
                    <div key="c-t" className={cn(baseChairClass, "top-0 left-1/2 -translate-x-1/2 -translate-y-[75%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-t-md border-b-0")} />,
                    <div key="c-b" className={cn(baseChairClass, "bottom-0 left-1/2 -translate-x-1/2 translate-y-[75%] w-4 h-2.5 sm:w-5 sm:h-3 rounded-b-md border-t-0")} />,
                    <div key="c-tl" className={cn(baseChairClass, "top-[15%] left-[15%] -translate-x-[65%] -translate-y-[65%] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-tl-md border-r-0 border-b-0 rotate-[-45deg]")} />,
                    <div key="c-tr" className={cn(baseChairClass, "top-[15%] right-[15%] translate-x-[65%] -translate-y-[65%] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-tr-md border-l-0 border-b-0 rotate-[45deg]")} />,
                    <div key="c-bl" className={cn(baseChairClass, "bottom-[15%] left-[15%] -translate-x-[65%] translate-y-[65%] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-bl-md border-r-0 border-t-0 rotate-[-135deg]")} />,
                    <div key="c-br" className={cn(baseChairClass, "bottom-[15%] right-[15%] translate-x-[65%] translate-y-[65%] w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-br-md border-l-0 border-t-0 rotate-[135deg]")} />
                  );
                }
              }
              return chairs;
            };

            return (
              <button
                key={table.id}
                onClick={() => !disabled && onSelect?.(table)}
                disabled={disabled}
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={cn(
                  "absolute flex flex-col items-center justify-center border transition-all duration-200 cursor-pointer select-none outline-none group",
                  shapeClass,
                  sizeClass,
                  
                  // Comprehensive premium styling matching each of the 6 explicit states:
                  selected
                    ? "bg-[#EAF4E4] border-[#5C9A42] border-2 ring-3 ring-[#5C9A42]/15 text-[#1A2E1A] font-bold z-30 shadow-md scale-105"
                    : isOccupied
                      ? "bg-neutral-50 border-[#AAD08D] text-[#1A2E1A] cursor-not-allowed opacity-95"
                      : isCleaning
                        ? "bg-amber-50/40 border-amber-400 border-[1.5px] text-amber-800 cursor-not-allowed opacity-95"
                        : isReserved
                          ? "bg-[#FAFBF9] border-neutral-200 border text-[#A0A69D] cursor-not-allowed opacity-80"
                          : isBlocked
                            ? "bg-[#F3F4F6] border-neutral-300 text-neutral-400 cursor-not-allowed opacity-85"
                            : capacityTooSmall
                              ? "bg-transparent border-[#E4E8E3] text-[#CBD5E1] cursor-not-allowed opacity-15"
                              : "bg-white border-[#AAD08D] border-[1.5px] text-[#1A2E1A] hover:bg-[#F6FAF3] hover:border-[#7FB565] hover:scale-105 hover:shadow-xs shadow-2xs"
                )}
              >
                {/* Visual clearance zone halo shown elegantly on hover for available tables */}
                {!disabled && (
                  <div 
                    className={cn(
                      "absolute -inset-3.5 border border-dashed rounded-inherit pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100",
                      selected ? "border-[#5C9A42]/50" : "border-[#7FB565]/40"
                    )}
                  />
                )}

                {/* Diagonal lines for Blocked state */}
                {isBlocked && (
                  <div className="absolute inset-0 opacity-10 pointer-events-none rounded-inherit" style={{ backgroundImage: 'url(#blocked-cross)' }} />
                )}

                {/* Symmetrical tucked chairs */}
                {renderChairs()}

                {/* Table ID Label */}
                <span className="text-xs sm:text-sm font-extrabold font-sans tracking-tight leading-none z-10 text-[#1A2E1A]">
                  {table.number}
                </span>

                {/* Capacity Label & Status Badges */}
                <span 
                  className={cn(
                    "text-[8px] sm:text-[9px] mt-0.5 font-bold leading-none z-10 flex items-center gap-0.5",
                    selected ? "text-[#5C9A42]" : "text-[#1A2E1A]/40"
                  )}
                >
                  {/* If available or occupied, render regular capacity layout */}
                  {isAvailable && (
                    <>
                      <UsersIcon className="h-2 w-2 stroke-[2.5px] text-[#1A2E1A]/40" />
                      {table.capacity}p
                    </>
                  )}
                  {selected && (
                    <>
                      <Check className="h-2.5 w-2.5 stroke-[3px] text-[#5C9A42]" />
                      Selected
                    </>
                  )}
                  {isOccupied && (
                    <span className="flex items-center gap-1 text-[#5C9A42] font-semibold">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#5C9A42] animate-pulse" />
                      {table.capacity}p
                    </span>
                  )}
                  {isCleaning && (
                    <span className="flex items-center gap-0.5 text-amber-600 font-extrabold animate-pulse">
                      <Sparkles className="h-2 w-2" />
                      Clean
                    </span>
                  )}
                  {isReserved && (
                    <span className="flex items-center gap-0.5 text-neutral-400 font-semibold">
                      <Clock className="h-2 w-2" />
                      Held
                    </span>
                  )}
                  {isBlocked && (
                    <span className="flex items-center gap-0.5 text-neutral-400 font-semibold">
                      <Lock className="h-2 w-2" />
                      Held
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      </div>

      {/* ==================== 5. SEATING PLAN LEGEND & INSTRUCTION FOOTER ==================== */}
      <FloorMapLegend />
    </div>
  );
}

export function FloorMapLegend() {
  const items = [
    {
      label: 'Available Table',
      className: 'bg-white border-[#AAD08D] border-[1.5px]',
    },
    {
      label: 'Selected Allocation',
      className: 'bg-[#EAF4E4] border-[#5C9A42] border-2 ring-2 ring-[#5C9A42]/15',
    },
    {
      label: 'Reserved Seating',
      className: 'bg-[#FAFBF9] border-neutral-200 border-[1px] opacity-80',
      inner: <Clock className="h-2 w-2 text-neutral-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    },
    {
      label: 'Seated (Occupied)',
      className: 'bg-neutral-50 border-[#AAD08D] border-[1px]',
      inner: <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-[#5C9A42] animate-pulse" />
    },
    {
      label: 'Table turnover (Cleaning)',
      className: 'bg-amber-50/40 border-amber-400 border-[1.5px]',
      inner: <Sparkles className="h-2 w-2 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    },
    {
      label: 'Admin Blocked',
      className: 'bg-[#F3F4F6] border-neutral-300 border-[1px] relative overflow-hidden',
      inner: <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(#blocked-cross)' }} />
    },
  ];

  return (
    <div className="mt-5 border-t border-dashed border-[#EAF4E4] pt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A2E1A]/50 flex flex-wrap items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-[#5C9A42]" /> 
        <span>Tap any active table block to assign reservations</span>
        <span className="md:hidden text-amber-600 font-semibold">(Swipe left/right to view full floor plan)</span>
      </span>
      
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5">
        {items.map((item) => (
          <span
            key={item.label}
            className="flex items-center gap-2 text-xs font-semibold font-sans text-[#1A2E1A]/80"
          >
            <span 
              className={cn('h-3.5 w-3.5 rounded-sm border transition-transform hover:scale-110 duration-200 relative overflow-hidden', item.className)}
            >
              {item.inner}
            </span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
