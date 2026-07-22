import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart, useCartDrawer } from '../../lib/cart';
import { cn } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function CartDrawer() {
  const { cart, count, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isOpen, closeCart } = useCartDrawer();
  const navigate = useNavigate();

  const handleProceed = () => {
    closeCart();
    navigate('/order-thankyou');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-[#121810]/60 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 bg-[#FDFCF7] p-6 flex flex-col justify-between shadow-2xl border-l border-[#DFE7CF]/40 text-[#1A2E1A]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DFE7CF]/40 pb-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5.5 w-5.5 text-forest" />
                <h2 className="font-serif text-2xl font-bold text-forest-deep">
                  Your Selection
                </h2>
                <span className="bg-[#AAD08D]/20 text-[#5C9A42] text-xs font-bold px-2 py-0.5 rounded-full">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-forest/5 text-[#1A2E1A]/60 hover:text-forest transition-colors"
                aria-label="Close cart"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-[#F6FAF3] flex items-center justify-center mb-4 text-[#AAD08D]">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <p className="font-serif text-lg font-semibold text-[#1A2E1A]/80">
                    Your cart is empty
                  </p>
                  <p className="text-xs text-[#1A2E1A]/50 mt-1 max-w-[240px]">
                    Explore our menu and add delicious hand-crafted organic dishes to your order.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 text-sm font-semibold text-forest hover:text-[#5C9A42] transition-colors underline underline-offset-4"
                  >
                    View Menu
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white border border-[#DFE7CF]/30 rounded-2xl p-3 shadow-sm hover:border-[#DFE7CF]/70 transition-all duration-200"
                  >
                    {/* Item Image */}
                    <div className="h-16 w-16 rounded-xl overflow-hidden bg-[#F6FAF3] border border-[#DFE7CF]/20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base font-bold text-forest-deep truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm font-semibold text-forest mt-0.5">
                        ${item.price.toFixed(2)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-[#DFE7CF]/40 rounded-lg overflow-hidden bg-[#FDFCF7]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-1.5 hover:bg-forest/5 text-[#1A2E1A]/60 hover:text-forest transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-1.5 hover:bg-forest/5 text-[#1A2E1A]/60 hover:text-forest transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#1A2E1A]/40 hover:text-red-500 p-1 rounded-lg hover:bg-red-50/50 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Total Item Price */}
                    <div className="text-right font-serif font-bold text-[#1A2E1A] text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Actions */}
            {cart.length > 0 && (
              <div className="border-t border-[#DFE7CF]/40 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1A2E1A]/60">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-forest-deep">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="py-2.5 text-red-400 hover:text-red-300"
                  >
                    Clear All
                  </Button>
                  <Button
                    variant="glass"
                    onClick={handleProceed}
                    className="py-2.5"
                  >
                    <span>Proceed Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
