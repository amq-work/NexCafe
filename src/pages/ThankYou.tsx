import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../lib/cart';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function ThankYou() {
  const { cart, count, total } = useCart();
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col justify-between text-[#1A2E1A]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-5 py-24 sm:py-32 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-white border border-[#DFE7CF]/40 rounded-[32px] p-8 sm:p-12 shadow-[0_15px_40px_rgba(19,27,16,0.03)] text-center max-w-2xl"
        >
          {/* Animated Success Ring */}
          <div className="flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.15, stiffness: 180 }}
              className="h-20 w-20 rounded-full bg-[#F6FAF3] border border-[#DFE7CF]/40 flex items-center justify-center text-[#7FB565] shadow-inner"
            >
              <CheckCircle className="h-10 w-10 stroke-[2]" />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-3xl sm:text-4xl font-bold text-forest-deep mb-4 animate-fade-in"
          >
            Thank You for Placing order
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm sm:text-base text-[#1A2E1A]/70 max-w-md mx-auto mb-8 leading-relaxed"
          >
            Your selection of organic, chef-crafted dishes has been prepared for the final checkout. Click below to view your full tax-inclusive bill and finalize your premium dining booking.
          </motion.p>

          {/* Compact Order Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="border-t border-b border-[#DFE7CF]/35 py-4 my-6 text-left"
          >
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-[#7FB565]">
              <ShoppingBag className="h-4 w-4" />
              <span>Order Summary ({count} items)</span>
            </div>
            
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-[#1A2E1A]/80">
                    {item.name} <span className="font-semibold text-forest">×{item.quantity}</span>
                  </span>
                  <span className="font-serif font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#DFE7CF]/20 mt-4 pt-3 flex justify-between items-center font-serif font-bold text-[#1A2E1A] text-lg">
              <span>Estimated Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </motion.div>

          {/* "Proced checkout" Button */}
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleProceed}
            className="w-full mt-4 py-4 bg-[#AAD08D] hover:bg-[#7FB565] active:bg-[#5C9A42] text-white font-semibold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Proced checkout</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
