import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CartDrawer } from './components/cart/CartDrawer';

// Lazy loaded page components
const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Reserve = React.lazy(() => import('./pages/Reserve').then(m => ({ default: m.Reserve })));
const PreOrder = React.lazy(() => import('./pages/PreOrder').then(m => ({ default: m.PreOrder })));
const ThankYou = React.lazy(() => import('./pages/ThankYou').then(m => ({ default: m.ThankYou })));
const Checkout = React.lazy(() => import('./pages/Checkout').then(m => ({ default: m.Checkout })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Elegant minimal circular route loader
const RouteLoader = () => (
  <div className="min-h-screen bg-[#f5f1e6] flex flex-col justify-center items-center select-none">
    <div className="relative flex items-center justify-center">
      <div className="h-16 w-16 rounded-full border-2 border-[#2f3d2a]/10 border-t-[#7a9a5e] animate-spin" />
      <span className="absolute font-island text-3xl text-[#2f3d2a] font-semibold">N</span>
    </div>
    <span className="mt-4 text-[10px] font-sans font-bold tracking-[0.25em] uppercase text-[#2f3d2a]/60">
      NexCafe'
    </span>
  </div>
);

// Full screen sweeping curtain page wrapper
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        style={{ originY: 0 }}
        className="fixed inset-0 z-50 bg-[#1e2a18] pointer-events-none"
      />
      {children}
    </div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/reserve" element={<PageWrapper><Reserve /></PageWrapper>} />
          <Route path="/pre-order" element={<PageWrapper><PreOrder /></PageWrapper>} />
          <Route path="/order-thankyou" element={<PageWrapper><ThankYou /></PageWrapper>} />
          <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <CartDrawer />
      <Suspense fallback={<RouteLoader />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}
