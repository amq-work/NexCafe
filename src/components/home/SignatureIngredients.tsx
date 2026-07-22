import React from 'react';
import { motion } from 'motion/react';
import { DropletIcon, FlameIcon, BeerIcon } from 'lucide-react';

const INGREDIENTS = [
  {
    name: 'Mozzarella Garlic Mayo',
    description:
      'House-cultured mozzarella whipped into a slow-roasted garlic mayo. Our quiet signature.',
    Icon: DropletIcon,
    swatch: 'bg-mayo/10',
    ring: 'ring-amber/30',
    accent: 'text-amber',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/eaa923fe-3365-4e67-9015-e6d602b92559.jpg',
    tag: 'Silky & Rich',
  },
  {
    name: 'Buffalo Sriracha',
    description:
      'A bright, layered heat built from fermented chilli and buffalo butter. Balanced, never brash.',
    Icon: FlameIcon,
    swatch: 'bg-sriracha/10',
    ring: 'ring-sriracha/30',
    accent: 'text-sriracha',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/49a25d58-7688-47ec-b673-737dd4306ea4.jpg',
    tag: 'Fiery & Zesty',
  },
  {
    name: 'Halal Amber Beer',
    description:
      'Our own halal amber ale, brewed for braising and for sipping. Malt-forward and warm.',
    Icon: BeerIcon,
    swatch: 'bg-amber/10',
    ring: 'ring-amber/40',
    accent: 'text-amber',
    image: 'https://cdn.magicpatterns.com/patterns/generated-images/ad57b0db-fcad-490c-833e-8d959f676550.jpg',
    tag: 'Warm & Malty',
  },
];

export function SignatureIngredients() {
  return (
    <section id="signature-ingredients" className="w-full bg-white py-24 relative overflow-hidden border-b border-tan/30 scroll-mt-24">
      {/* Soft atmospheric glowing blur backdrops for light background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-green/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-content px-5 sm:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-stretch">
          
          {/* Left Column: Sourcing Showcase Image */}
          <div className="lg:col-span-5 relative group" data-reveal="slide-right">
            <div className="h-full min-h-[450px] lg:min-h-full w-full overflow-hidden rounded-3xl border border-tan/20 shadow-soft relative">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=1200"
                alt="Organic farm-to-table sourcing at NexCafe'"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlaid Badge */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-lg">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green">Culinary Sourcing</p>
                <h4 className="font-serif text-lg font-semibold text-forest-deep mt-1">100% Organic & Biodynamic</h4>
                <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                  Directly harvested from local family gardens and estates within 50 miles of our kitchen.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Philosophy & Signature Ingredients */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10" data-reveal="slide-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-green">
                Culinary Philosophy
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold text-forest-deep sm:text-5xl">
                Rooted in Warmth, Crafted with Purpose
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-ink-muted">
                At NexCafe', sourcing is an act of curation. Every ingredient is selected through direct partnerships with family-run biodynamic farms and independent coastal purveyors. We believe that fine dining should be rooted in warmth and respect for the earth. These three signature pillars guide every dish, broth, and pairing we craft.
              </p>
            </div>

            {/* Vertical list of the 3 signature ingredients */}
            <div className="space-y-6">
              {INGREDIENTS.map((item, i) => (
                <div
                  key={item.name}
                  className="flex flex-col sm:flex-row items-start gap-4 p-5 rounded-2xl border border-tan/20 bg-[#FDFCF7]/85 hover:border-tan/40 hover:bg-[#FDFCF7] hover:shadow-soft transition-all duration-300"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${item.swatch} ${item.ring} bg-white shadow-xs`}
                    >
                      <item.Icon className={`h-5 w-5 ${item.accent}`} aria-hidden />
                    </span>
                    <span className="sm:hidden text-[10px] font-bold uppercase tracking-wider text-forest-deep/60 bg-forest/5 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl font-semibold text-forest-deep">
                        {item.name}
                      </h3>
                      <span className="hidden sm:inline-flex text-[10px] font-bold uppercase tracking-wider text-forest bg-forest/5 px-2.5 py-1 rounded-md">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
