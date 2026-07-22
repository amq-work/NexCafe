import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ArrowRight, ShieldCheck, Sparkles, Check, Info, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MENU_ITEMS, SPECIALS } from '../lib/data';
import { addToCart, useCart, useCartDrawer } from '../lib/cart';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';

const CATEGORIES = ['All', 'Specials', 'Starters', 'Mains', 'Desserts', 'Drinks'];

// Fallback images for menu items so they look absolutely stunning and editorial
const MENU_ITEM_IMAGES: Record<string, string> = {
  m1: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
  m2: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
  m3: 'https://images.unsplash.com/photo-1624462966581-bc6d768cbce5?auto=format&fit=crop&q=80&w=400',
  m4: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400',
  m5: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400',
  m6: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=400',
  m7: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
  m8: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&q=80&w=400',
  m9: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&q=80&w=400',
};

export function PreOrder() {
  const navigate = useNavigate();
  const { cart, count, total } = useCart();
  const { openCart } = useCartDrawer();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Combine specials & standard menu items for unified rendering
  const allItems = [
    ...SPECIALS.map(s => ({
      id: s.id,
      name: s.name,
      description: s.description,
      price: s.price,
      image: s.image,
      category: 'Specials' as const,
      isSpecial: true,
    })),
    ...MENU_ITEMS.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      price: m.price,
      image: MENU_ITEM_IMAGES[m.id] || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400',
      category: m.category,
      isSpecial: false,
    }))
  ];

  const filteredItems = selectedCategory === 'All'
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  const handleAddItem = (item: typeof allItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

    // Trigger visual feedback
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col justify-between text-[#1A2E1A]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#5C9A42]">
            Kitchen Optimization & Pre-Prep
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-deep mt-3 mb-6">
            Pre-Order Your Fine Dining Meal
          </h1>
          <p className="text-sm sm:text-base text-[#1A2E1A]/70 leading-relaxed font-sans">
            Reserve your organic dishes in advance. This helps our kitchen management to be perfectly prepared for your table, eliminating ingredient wastage and offering you an accelerated, tailored culinary experience.
          </p>

          {/* Kitchen Waste Mitigation Alert Box */}
          <div className="mt-8 p-4 bg-[#F6FAF3] border border-[#DFE7CF]/50 rounded-2xl flex items-start gap-3.5 text-left max-w-2xl mx-auto">
            <ShieldCheck className="h-5.5 w-5.5 text-[#5C9A42] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-forest-deep uppercase tracking-wider">
                Kitchen Prep & Waste Prevention Policy
              </p>
              <p className="text-xs text-[#1A2E1A]/65 mt-1 leading-relaxed font-sans">
                To prevent food wastage and secure the allocation of seasonal organic ingredients, pre-order checkouts require a <strong className="font-bold text-forest-deep">deposit of half (50%) payment</strong> of the selected food. The remaining balance will be settled at the restaurant.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? 'bg-forest text-[#DCFFE5] shadow-md scale-102'
                  : 'bg-white border border-[#DFE7CF]/30 text-[#1A2E1A]/60 hover:text-forest hover:border-[#DFE7CF]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => {
            const isAdded = addedItemIds[item.id];
            return (
              <motion.div
                layout
                key={item.id}
                className="bg-white border border-[#DFE7CF]/30 rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:border-[#DFE7CF]/80 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Item Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-[#F6FAF3] border-b border-[#DFE7CF]/20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {item.isSpecial && (
                      <span className="absolute top-4 left-4 bg-[#AAD08D] text-forest-deep text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        Chef's Special
                      </span>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-deep leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-serif text-base sm:text-lg font-extrabold text-forest shrink-0">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-[#1A2E1A]/60 mt-2 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Add Button */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => handleAddItem(item)}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      isAdded
                        ? 'bg-forest text-cream border border-forest'
                        : 'bg-cream hover:bg-forest/5 text-forest border border-[#DFE7CF]/60 hover:border-forest'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" />
                        <span>Added to Prep</span>
                      </>
                    ) : (
                      <>
                        <Utensils className="h-4 w-4 shrink-0" />
                        <span>Pre-Order Item</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Floating Cart Drawer Indicator or Checkout Prompter */}
        <AnimatePresence>
          {count > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-8 right-8 z-40 max-w-sm w-[calc(100%-4rem)] pointer-events-auto"
            >
              <div className="backdrop-blur-md bg-forest/95 border border-white/10 rounded-3xl p-5 shadow-2xl text-white flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-[#DCFFE5]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#DCFFE5]">
                      Pre-prep Cart
                    </span>
                  </div>
                  <span className="text-xs font-semibold bg-[#AAD08D]/20 text-[#DCFFE5] px-2.5 py-0.5 rounded-full">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <div className="flex justify-between items-end border-t border-white/10 pt-3">
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider">Total Food value</p>
                    <p className="font-serif text-lg font-bold">${total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-wider text-right">Prep deposit (50%)</p>
                    <p className="font-serif text-lg font-bold text-[#DCFFE5] text-right">${(total * 0.5).toFixed(2)}</p>
                  </div>
                </div>

                <Button
                  variant="glass"
                  fullWidth
                  onClick={() => {
                    openCart();
                  }}
                  className="mt-2 py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Verify ID & Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
