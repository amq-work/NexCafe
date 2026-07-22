import React from 'react';
import { motion } from 'motion/react';
import { Flame, Leaf, GlassWater, Sparkles, Compass } from 'lucide-react';

export function AboutRestaurant() {
  const pillars = [
    {
      icon: Flame,
      title: 'The Hearth',
      description: 'At the heart of our kitchen stands a custom wood-fired hearth. We use cherrywood and oak embers to impart a delicate smoke, unlocking complex caramelized depth in both organic vegetables and heirloom meats.',
    },
    {
      icon: Leaf,
      title: 'The Harvest',
      description: 'We partner exclusively with community micro-farms within a fifty-mile radius. Harvested at sunrise, our botanical greens, wild herbs, and heritage produce arrive at your plate at the absolute peak of flavor.',
    },
    {
      icon: GlassWater,
      title: 'The Cellar',
      description: 'Our house-crafted botanical infusions and custom non-alcoholic ferments are designed to mirror the structural complexity of fine wines. Each pairing is formulated to elevate the char and herbal nuances of our wood-fired dishes.',
    },
  ];

  return (
    <section 
      id="about-restaurant" 
      className="w-full scroll-mt-24 py-28 relative overflow-hidden"
      style={{ backgroundColor: '#F5F1E6' }}
    >
      {/* Decorative floral/botanical subtle design lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <div className="absolute top-12 left-10 w-96 h-96 rounded-full bg-forest blur-[120px]" />
        <div className="absolute bottom-12 right-10 w-96 h-96 rounded-full bg-sage blur-[120px]" />
      </div>

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 items-start">
          
          {/* Left Column: Storytelling & Editorial Copy */}
          <div className="lg:col-span-5 space-y-7 sm:space-y-9">
            <div className="space-y-3.5">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green flex items-center gap-2">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>About Our Restaurant</span>
              </p>
              <h2 className="font-serif text-5xl sm:text-6.2xl lg:text-7xl font-semibold text-forest-deep leading-[1.1] sm:leading-[1.03] tracking-[-0.025em] lg:tracking-[-0.035em]">
                A sanctuary of <br className="hidden sm:inline" />
                flame & flora
              </h2>
            </div>

            <div className="space-y-5.5 font-sans text-sm sm:text-base text-forest-deep/85 leading-relaxed">
              <p>
                Founded on the philosophy of culinary honesty, <strong className="font-semibold text-forest-deep">NexCafe'</strong> was born to reunite ancient cooking practices with vibrant botanical agriculture. We believe that true luxury lies in simplicity, patience, and absolute stewardship of the land.
              </p>
              <p>
                Every culinary creation is a dialogue between the untamed heat of our wood-fired hearth and the delicate, crisp sweetness of fresh soil. We do not mask flavors; we reveal them through heat, smoke, and pure botanical elements.
              </p>
            </div>
          </div>

          {/* Right Column: Culinary Pillars Grid */}
          <div className="lg:col-span-7 grid gap-4.5 sm:grid-cols-1">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative p-5 sm:p-5.5 rounded-2xl bg-[#FAF7EF]/85 hover:bg-[#FAF7EF] border border-[#ECE5D3]/70 hover:border-forest/20 shadow-[0_3px_18px_rgba(47,61,42,0.02)] hover:shadow-[0_12px_32px_rgba(47,61,42,0.05)] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4.5 items-start">
                    {/* Icon container with thick glass detail */}
                    <div className="h-11 w-11 rounded-xl bg-[#ECE5D3] group-hover:bg-forest/10 border border-black/5 group-hover:border-forest/10 flex items-center justify-center text-forest transition-colors duration-300 shrink-0">
                      <Icon className="h-5 w-5 stroke-[1.5]" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-deep tracking-tight group-hover:text-forest transition-colors duration-200">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13px] text-[#1A2E1A]/75 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Full-width elegant Quote banner */}
        <div className="mt-20 sm:mt-28 pt-12 border-t border-[#ECE5D3]/80 w-full">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <blockquote className="font-serif text-2xl sm:text-3.5xl lg:text-4xl text-forest-deep italic leading-relaxed tracking-tight">
              “We cook with embers because they have memory. <br className="hidden md:inline" /> We pair with botanicals because they are alive.”
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[1px] w-8 bg-[#C5A880]/40" />
              <cite className="not-italic font-sans text-xs tracking-[0.15em] uppercase font-bold text-forest">
                Chef de Cuisine, Marcus Vance
              </cite>
              <div className="h-[1px] w-8 bg-[#C5A880]/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
