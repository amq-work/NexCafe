import React from 'react';
import { MenuIcon, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { useCart, useCartDrawer } from '../../lib/cart';
import { IconButton } from '../ui/Button';

interface CompactNavbarProps {
  restaurantName: string;
  onLogoClick: () => void;
  onMenuToggle: () => void;
}

export const CompactNavbar = React.forwardRef<HTMLDivElement, CompactNavbarProps>(
  ({ restaurantName, onLogoClick, onMenuToggle }, ref) => {
    const { count } = useCart();
    const { openCart } = useCartDrawer();

    return (
      <div
        ref={ref}
        className="fixed bottom-6 left-0 right-0 mx-auto z-40 w-[92%] max-w-[400px] pointer-events-auto select-none"
      >
        <div className="backdrop-blur-md bg-[#182314]/90 border border-[#DCFFE5]/15 rounded-full px-5 py-3 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
          {/* Logo Brand Link */}
          <div
            onClick={onLogoClick}
            className="font-island font-normal text-[28px] sm:text-[32px] text-[#DCFFE5] cursor-pointer hover:text-[#DCFFE5]/80 active:scale-95 transition-all duration-200"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onLogoClick();
              }
            }}
          >
            {restaurantName}
          </div>

          {/* Menu Button Container */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <IconButton
              label="Open cart"
              onClick={openCart}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#AAD08D] text-[9px] font-bold text-forest-deep shadow-sm z-30"
                >
                  {count}
                </motion.span>
              )}
            </IconButton>

            <IconButton
              label="Open side navigation menu"
              onClick={onMenuToggle}
            >
              <MenuIcon className="h-5 w-5" />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
);

CompactNavbar.displayName = 'CompactNavbar';
