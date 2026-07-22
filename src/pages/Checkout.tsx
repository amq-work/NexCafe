import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Shield, 
  ArrowLeft, 
  Landmark, 
  CheckCircle, 
  ExternalLink, 
  User, 
  Phone, 
  Sparkles, 
  AlertCircle, 
  Calendar, 
  Clock, 
  UtensilsCrossed 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart, clearCart } from '../lib/cart';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/ui/Button';
import { getReservations, TABLES } from '../lib/data';
import { Reservation } from '../types';

export function Checkout() {
  const { cart, total, count } = useCart();
  const navigate = useNavigate();

  // Reservation & Customer details
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [matchedReservation, setMatchedReservation] = useState<Reservation | null>(null);
  const [idValidationError, setIdValidationError] = useState('');
  const [idSuccessMessage, setIdSuccessMessage] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showNexesPopup, setShowNexesPopup] = useState(true);

  // Auto-verify stored ID on mount if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lastId = localStorage.getItem('nexcafe_last_customer_id');
      if (lastId) {
        setCustomerId(lastId);
        const reservations = getReservations();
        const found = reservations.find(
          r => r.customerId?.trim().toUpperCase() === lastId.trim().toUpperCase() ||
               r.id.trim().toUpperCase() === lastId.trim().toUpperCase()
        );
        if (found) {
          setMatchedReservation(found);
          setCustomerName(found.guestName);
          setCustomerPhone(found.phone);
          setIdSuccessMessage(`Reservation verified! Table reserved for ${found.guestName} on ${found.date} at ${found.time}.`);
        }
      }
    }
  }, []);

  // Customer ID Verification handler
  const handleVerifyId = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIdValidationError('');
    setIdSuccessMessage('');

    if (!customerId.trim()) {
      setIdValidationError('Please enter your Customer ID.');
      setMatchedReservation(null);
      return;
    }

    const reservations = getReservations();
    const found = reservations.find(
      r => r.customerId?.trim().toUpperCase() === customerId.trim().toUpperCase() ||
           r.id.trim().toUpperCase() === customerId.trim().toUpperCase()
    );

    if (found) {
      setMatchedReservation(found);
      setCustomerName(found.guestName);
      setCustomerPhone(found.phone);
      setIdSuccessMessage(`Table reservation verified! Pre-order matches Table ${TABLES.find(t => t.id === found.tableId)?.number || 'T01'}.`);
    } else {
      setIdValidationError('Customer ID not found. Please book a table first or enter your confirmed booking ID.');
      setMatchedReservation(null);
    }
  };

  // Half-payment calculation to prevent food waste
  const depositFoodCost = total * 0.5;
  const salesTaxRate = 0.0825; // 8.25% Sales Tax
  const serviceChargeRate = 0.05; // 5.0% Service Charge

  const depositSalesTax = depositFoodCost * salesTaxRate;
  const depositServiceCharge = depositFoodCost * serviceChargeRate;
  const depositGrandTotal = depositFoodCost + depositSalesTax + depositServiceCharge;

  // Remaining half to be settled later
  const remainingFoodCost = total - depositFoodCost;
  const remainingSalesTax = remainingFoodCost * salesTaxRate;
  const remainingServiceCharge = remainingFoodCost * serviceChargeRate;
  const remainingGrandTotal = remainingFoodCost + remainingSalesTax + remainingServiceCharge;

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchedReservation) {
      setIdValidationError('A valid Customer ID is strictly required to checkout and pre-prep food.');
      return;
    }
    
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentSuccess(true);
      clearCart();
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF7] flex flex-col justify-between text-[#1A2E1A]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <div className="flex items-center gap-2 mb-8 animate-fade-in">
          <button
            onClick={() => navigate('/pre-order')}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#1A2E1A]/60 hover:text-forest transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Pre-Order Menu</span>
          </button>
        </div>

        {paymentSuccess ? (
          /* PAYMENT SUCCESS VIEW */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#DFE7CF]/40 rounded-[32px] p-8 sm:p-12 text-center max-w-lg mx-auto shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-[#AAD08D]/15 text-[#5C9A42] flex items-center justify-center shadow-inner">
                <CheckCircle className="h-10 w-10 stroke-[2]" />
              </div>
            </div>
            <h2 className="font-serif text-3xl font-bold text-forest-deep mb-3">
              Pre-Prep Deposit Paid!
            </h2>
            <p className="text-sm text-[#1A2E1A]/70 leading-relaxed mb-6">
              Your half-payment deposit has been received. Our kitchen team has started allocating fresh seasonal ingredients to prepare your custom menu.
            </p>
            
            {/* Matching reservation card */}
            {matchedReservation && (
              <div className="bg-[#F6FAF3] border border-[#DFE7CF]/40 rounded-2xl p-4 text-left space-y-3 mb-6">
                <div className="flex items-center gap-2 pb-2 border-b border-[#DFE7CF]/30">
                  <UtensilsCrossed className="h-4.5 w-4.5 text-forest" />
                  <span className="text-xs font-bold uppercase tracking-wider text-forest-deep">Kitchen Prep Details</span>
                </div>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-[#1A2E1A]/55">Prepared For:</span>
                  <span className="font-semibold text-right">{customerName || matchedReservation.guestName}</span>
                  
                  <span className="text-[#1A2E1A]/55">Customer ID:</span>
                  <span className="font-mono font-bold text-right text-forest">{matchedReservation.customerId || matchedReservation.id}</span>
                  
                  <span className="text-[#1A2E1A]/55">Table Allocation:</span>
                  <span className="font-semibold text-right">Table {TABLES.find(t => t.id === matchedReservation.tableId)?.number || 'T01'}</span>
                  
                  <span className="text-[#1A2E1A]/55">Dining Schedule:</span>
                  <span className="font-semibold text-right">{matchedReservation.date} · {matchedReservation.time}</span>
                </div>
              </div>
            )}

            <div className="bg-white border border-[#DFE7CF]/30 rounded-2xl p-4 text-left space-y-2 mb-8 shadow-sm">
              <div className="flex justify-between text-xs text-[#1A2E1A]/60 font-medium">
                <span>Deposit Status</span>
                <span className="text-[#5C9A42] font-bold">50% PAID DEPOSIT</span>
              </div>
              <div className="flex justify-between text-xs text-[#1A2E1A]/60 font-medium">
                <span>Payment Method</span>
                <span className="uppercase font-semibold">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-forest-deep border-t border-[#DFE7CF]/20 pt-2 mt-2">
                <span>Amount Charged Today</span>
                <span>${depositGrandTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-amber-700 font-medium pt-1">
                <span>Remaining to Pay at Restaurant</span>
                <span>${remainingGrandTotal.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="glass"
              fullWidth
              onClick={() => navigate('/')}
            >
              Return to Homepage
            </Button>
          </motion.div>
        ) : (
          /* BILL & PAYMENT VIEW */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ITEM DETAILS & BILL */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-[#DFE7CF]/40 rounded-[28px] p-6 sm:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-forest-deep border-b border-[#DFE7CF]/45 pb-4 mb-6">
                  Order Breakdown
                </h2>

                {/* Checkout items */}
                <div className="divide-y divide-[#DFE7CF]/30 max-h-72 overflow-y-auto pr-2 space-y-4 mb-6">
                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-[#1A2E1A]/40 text-sm">
                      No items currently in order.
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-xl object-cover border border-[#DFE7CF]/20 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-sm font-bold text-[#1A2E1A] truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#1A2E1A]/60 mt-0.5">
                            ${item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <span className="font-serif text-sm font-bold text-[#1A2E1A]">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotals & Taxes calculation */}
                <div className="border-t border-[#DFE7CF]/40 pt-4 space-y-3.5 text-sm">
                  <div className="flex justify-between text-[#1A2E1A]/70">
                    <span>Full Food Subtotal</span>
                    <span className="font-semibold">${total.toFixed(2)}</span>
                  </div>

                  {/* 50% prep deposit detail */}
                  <div className="flex justify-between items-center bg-[#F6FAF3] border border-[#AAD08D]/30 rounded-xl px-3 py-2 text-forest-deep">
                    <span className="text-xs font-bold flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-forest animate-pulse" />
                      Prep Deposit (50% Cost)
                    </span>
                    <span className="font-serif text-sm font-bold">
                      -${depositFoodCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#1A2E1A]/70 pt-1">
                    <span className="flex items-center gap-1 text-xs">
                      Sales Tax <span className="text-[10px] font-bold bg-[#AAD08D]/15 text-[#5C9A42] px-1.5 py-0.5 rounded">8.25%</span>
                    </span>
                    <span className="font-semibold text-xs">${depositSalesTax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-[#1A2E1A]/70">
                    <span className="flex items-center gap-1 text-xs">
                      Service Charge <span className="text-[10px] font-bold bg-[#AAD08D]/15 text-[#5C9A42] px-1.5 py-0.5 rounded">5.0%</span>
                    </span>
                    <span className="font-semibold text-xs">${depositServiceCharge.toFixed(2)}</span>
                  </div>

                  {/* Deposit Grand Total (Due Now) */}
                  <div className="border-t border-[#DFE7CF]/40 pt-3 flex justify-between items-end font-serif">
                    <div>
                      <p className="text-[10px] text-[#1A2E1A]/60 font-bold uppercase tracking-wider">Amount Due Today</p>
                      <p className="text-2xl font-black text-forest-deep">${depositGrandTotal.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-[#1A2E1A]/50 font-semibold uppercase tracking-wider">Remaining Balance</p>
                      <p className="text-sm font-bold text-amber-700">${remainingGrandTotal.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security info banner */}
              <div className="bg-[#F6FAF3] border border-[#DFE7CF]/40 rounded-2xl p-4 flex items-start gap-3">
                <Shield className="h-5 w-5 text-[#7FB565] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-[#1A2E1A] uppercase tracking-wider">
                    Waste-Prevention Charge Policy
                  </p>
                  <p className="text-xs text-[#1A2E1A]/60 mt-0.5 leading-relaxed font-sans">
                    Paying 50% deposit ensures our kitchen team secures and preps ingredients specifically for your booked table, minimizing high-end food waste.
                  </p>
                  <a
                    href="/NexCafe-Trust-and-Security-Policy.pdf"
                    download="NexCafe-Trust-and-Security-Policy.pdf"
                    className="inline-block mt-2 text-xs font-semibold text-forest hover:text-[#7FB565] transition-colors underline cursor-pointer"
                  >
                    Your Trust is what we want
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CUSTOMER INFO & PAYMENT */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* STEP 1: VERIFY CUSTOMER ID */}
              <div className="bg-white border border-[#DFE7CF]/40 rounded-[28px] p-6 sm:p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-forest-deep mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-forest text-cream text-xs font-bold flex items-center justify-center">1</span>
                  Reservation ID Verification
                </h3>
                <p className="text-xs text-[#1A2E1A]/60 mb-6 leading-relaxed">
                  Enter your Customer ID received during table confirmation to link this pre-order.
                </p>

                <form onSubmit={handleVerifyId} className="space-y-4">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="e.g. CUST-5819"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#DFE7CF]/40 focus:border-[#AAD08D] focus:ring-1 focus:ring-[#AAD08D] bg-[#FDFCF7]/30 text-sm font-mono tracking-wider outline-none transition-all duration-200"
                      />
                    </div>
                    <Button
                      type="submit"
                      theme="light"
                      className="px-6 shrink-0"
                    >
                      Verify ID
                    </Button>
                  </div>

                  {idValidationError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-red-600 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{idValidationError}</span>
                    </div>
                  )}

                  {idSuccessMessage && (
                    <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-xs text-green-700 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{idSuccessMessage}</span>
                    </div>
                  )}
                </form>

                {/* Form fields for extra info requested */}
                {matchedReservation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 border-t border-[#DFE7CF]/30 pt-6 space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5 text-forest" />
                          Customer Name
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#DFE7CF]/40 bg-gray-50/50 text-sm outline-none transition-all font-sans"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-forest" />
                          Phone Number
                        </label>
                        <input
                          type="text"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#DFE7CF]/40 bg-gray-50/50 text-sm outline-none transition-all font-mono"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider">
                        Special Kitchen Prep Instructions
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Allergies, seating preferences, steak doneness, dressing on the side, etc."
                        value={specialInstructions}
                        onChange={(e) => setSpecialInstructions(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#DFE7CF]/40 bg-[#FDFCF7]/30 text-xs outline-none transition-all font-sans resize-none"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* STEP 2: ONLINE PAYMENT PANEL */}
              <div className="relative">
                {!matchedReservation && (
                  <div className="absolute inset-0 bg-white/75 backdrop-blur-xs rounded-[28px] z-10 flex flex-col items-center justify-center p-6 text-center">
                    <LockIconContainer />
                    <p className="font-serif text-base font-bold text-forest-deep mt-3">Payment Panel Locked</p>
                    <p className="text-xs text-[#1A2E1A]/60 max-w-[280px] mt-1">
                      Please enter and verify a valid Customer ID above to unlock secure pre-prep deposit checkout.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/reserve')}
                      className="mt-4 text-xs font-bold uppercase tracking-wider text-forest hover:text-forest-deep underline underline-offset-4 cursor-pointer"
                    >
                      Book a Table First
                    </button>
                  </div>
                )}

                <div className={`bg-white border border-[#DFE7CF]/40 rounded-[28px] p-6 sm:p-8 shadow-sm transition-all duration-300 ${!matchedReservation ? 'opacity-40 select-none pointer-events-none' : ''}`}>
                  <h3 className="font-serif text-xl font-bold text-forest-deep mb-4 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-forest text-cream text-xs font-bold flex items-center justify-center">2</span>
                    Pre-prep Deposit Secure Checkout
                  </h3>

                  {/* Payment method switcher */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        paymentMethod === 'card'
                          ? 'border-[#AAD08D] bg-[#F6FAF3] text-[#5C9A42]'
                          : 'border-[#DFE7CF]/30 hover:border-[#DFE7CF]/70 text-[#1A2E1A]/60'
                      }`}
                    >
                      <CreditCard className="h-4.5 w-4.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bank')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                        paymentMethod === 'bank'
                          ? 'border-[#AAD08D] bg-[#F6FAF3] text-[#5C9A42]'
                          : 'border-[#DFE7CF]/30 hover:border-[#DFE7CF]/70 text-[#1A2E1A]/60'
                      }`}
                    >
                      <Landmark className="h-4.5 w-4.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Transfer</span>
                    </button>
                  </div>

                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {paymentMethod === 'card' ? (
                      <>
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            required={matchedReservation !== null}
                            placeholder="Johnathan Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-[#DFE7CF]/40 focus:border-[#AAD08D] focus:ring-1 focus:ring-[#AAD08D] bg-[#FDFCF7]/30 text-sm outline-none transition-all duration-200 font-sans"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required={matchedReservation !== null}
                            maxLength={19}
                            placeholder="4111 •••• •••• 4545"
                            value={cardNumber}
                            onChange={(e) => {
                              const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                              const matches = val.match(/\d{4,16}/g);
                              const match = (matches && matches[0]) || '';
                              const parts = [];
                              for (let i = 0, len = match.length; i < len; i += 4) {
                                parts.push(match.substring(i, i + 4));
                              }
                              if (parts.length > 0) {
                                setCardNumber(parts.join(' '));
                              } else {
                                setCardNumber(val);
                              }
                            }}
                            className="w-full px-4 py-3 rounded-xl border border-[#DFE7CF]/40 focus:border-[#AAD08D] focus:ring-1 focus:ring-[#AAD08D] bg-[#FDFCF7]/30 text-sm outline-none transition-all duration-200 font-mono tracking-wider"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              required={matchedReservation !== null}
                              maxLength={5}
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => {
                                let val = e.target.value.replace(/[^0-9]/g, '');
                                if (val.length > 2) {
                                  val = val.substring(0, 2) + '/' + val.substring(2, 4);
                                }
                                setCardExpiry(val);
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-[#DFE7CF]/40 focus:border-[#AAD08D] focus:ring-1 focus:ring-[#AAD08D] bg-[#FDFCF7]/30 text-sm outline-none transition-all duration-200 font-mono"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#1A2E1A]/70 uppercase tracking-wider">
                              CVC Code
                            </label>
                            <input
                              type="password"
                              required={matchedReservation !== null}
                              maxLength={3}
                              placeholder="•••"
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value.replace(/[^0-9]/g, ''))}
                              className="w-full px-4 py-3 rounded-xl border border-[#DFE7CF]/40 focus:border-[#AAD08D] focus:ring-1 focus:ring-[#AAD08D] bg-[#FDFCF7]/30 text-sm outline-none transition-all duration-200 font-mono"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="bg-[#F6FAF3] border border-[#DFE7CF]/30 rounded-xl p-5 text-center py-8">
                        <Landmark className="h-10 w-10 text-[#AAD08D] mx-auto mb-3" />
                        <p className="text-sm font-bold text-[#1A2E1A]">Instant Bank Transfer</p>
                        <p className="text-xs text-[#1A2E1A]/50 max-w-[200px] mx-auto mt-1 leading-relaxed">
                          Securely logs into your financial portal to validate payment routing directly.
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="glass"
                      fullWidth
                      loading={isPaying}
                      className="mt-6"
                    >
                      Pay ${depositGrandTotal.toFixed(2)} Prep Deposit
                    </Button>
                  </form>
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      <Footer />

      {/* DIGITAL NEXES PORTFOLIO POPUP */}
      <AnimatePresence>
        {showNexesPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNexesPopup(false)}
              className="fixed inset-0 z-[100] bg-[#121810]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] max-w-md w-[calc(100%-2rem)] bg-white border border-[#DFE7CF] rounded-[32px] p-8 text-center shadow-2xl text-[#1A2E1A]"
            >
              <div className="flex justify-center mb-5">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-forest-deep to-forest flex items-center justify-center text-[#DCFFE5] shadow-lg">
                  <span className="font-island font-bold text-3xl">DN</span>
                </div>
              </div>

              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#7FB565]">
                Portfolio Showcase
              </span>
              <h3 className="font-serif text-2xl font-bold text-forest-deep mt-2 mb-4">
                DIGITAL NEXES
              </h3>

              <p className="text-sm sm:text-base text-[#1A2E1A]/80 leading-relaxed mb-8 font-sans">
                This Website is one of the portfolio projects of <span className="font-semibold text-forest-deep">DIGITAL NEXES</span>
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  variant="glass"
                  fullWidth
                  onClick={() => window.open('https://www.digitalnexes.com', '_blank')}
                >
                  <span>Learn More</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setShowNexesPopup(false)}
                >
                  Continue to Pre-Order Checkout
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LockIconContainer() {
  return (
    <div className="h-12 w-12 rounded-full bg-forest/5 text-forest border border-[#AAD08D]/30 flex items-center justify-center shadow-inner">
      <svg className="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
  );
}
