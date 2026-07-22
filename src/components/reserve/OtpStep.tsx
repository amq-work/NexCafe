import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LockIcon, RefreshCwIcon, CheckCircle2Icon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface OtpStepProps {
  phone: string;
  value: string;
  onChange: (otp: string) => void;
  error?: string;
  onResend: () => void;
}

export function OtpStep({ phone, value, onChange, error, onResend }: OtpStepProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [resendCooldown, setResendCooldown] = useState(30);
  const [justResent, setJustResent] = useState(false);

  // Sync state to props value when it changes externally
  useEffect(() => {
    if (value.length === 0) {
      setDigits(['', '', '', '']);
    } else {
      const parsed = value.split('').slice(0, 4);
      while (parsed.length < 4) parsed.push('');
      setDigits(parsed);
    }
  }, [value]);

  // Cooldown timer for OTP Resend
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (val: string, index: number) => {
    // Only allow numbers
    const cleanVal = val.replace(/[^0-9]/g, '');
    if (!cleanVal) {
      const newDigits = [...digits];
      newDigits[index] = '';
      setDigits(newDigits);
      onChange(newDigits.join(''));
      return;
    }

    const lastChar = cleanVal[cleanVal.length - 1];
    const newDigits = [...digits];
    newDigits[index] = lastChar;
    setDigits(newDigits);
    onChange(newDigits.join(''));

    // Move focus to next input
    if (index < 3 && lastChar) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const newDigits = [...digits];
        newDigits[index - 1] = '';
        setDigits(newDigits);
        onChange(newDigits.join(''));
        inputsRef.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
        onChange(newDigits.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 4);
    if (pasteData) {
      const newDigits = pasteData.split('');
      while (newDigits.length < 4) newDigits.push('');
      setDigits(newDigits);
      onChange(pasteData);
      
      // Focus on the last filled input or the last input
      const focusIndex = Math.min(pasteData.length, 3);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  const handleResendClick = () => {
    if (resendCooldown > 0) return;
    onResend();
    setResendCooldown(30);
    setJustResent(true);
    setTimeout(() => setJustResent(false), 3000);
  };

  return (
    <div>
      <h2 className="font-serif text-3xl font-semibold text-forest-deep flex items-center gap-2">
        <LockIcon className="h-6 w-6 text-forest" />
        Verify Your Phone
      </h2>
      <p className="mt-2 text-sm text-ink-muted">
        We have sent a 4-digit verification code to <span className="font-semibold text-forest-deep">{phone}</span>.
      </p>

      <div className="mt-10 flex flex-col items-center gap-8 rounded-3xl border border-tan/40 bg-cream-soft p-8 sm:p-10 shadow-soft">
        <div className="flex justify-center gap-4">
          {digits.map((digit, i) => (
            <input
              key={i}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              className={cn(
                "h-16 w-14 sm:h-20 sm:w-16 rounded-2xl border bg-[#FDFCF7] text-center text-3xl font-bold text-forest-deep shadow-inner transition-all focus:outline-none focus:ring-4 focus:ring-forest/20",
                error 
                  ? "border-sriracha text-sriracha focus:border-sriracha" 
                  : digit 
                    ? "border-forest/60 focus:border-forest" 
                    : "border-tan/50 focus:border-forest"
              )}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm font-medium text-sriracha flex items-center gap-1.5" role="alert">
            {error}
          </p>
        )}

        {/* Demo Code Helper */}
        <div className="rounded-2xl bg-forest/5 border border-forest/15 px-4 py-3 text-xs text-forest-deep text-center max-w-sm flex items-center gap-2">
          <CheckCircle2Icon className="h-4 w-4 text-forest shrink-0" />
          <span>For demonstration and testing purposes, please enter the code <strong className="font-bold text-forest text-sm bg-forest/10 px-1.5 py-0.5 rounded">1234</strong>.</span>
        </div>

        <div className="flex items-center justify-center gap-4 mt-2">
          <button
            type="button"
            onClick={handleResendClick}
            disabled={resendCooldown > 0}
            className={cn(
              "flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-150 cursor-pointer",
              resendCooldown > 0 
                ? "text-ink-muted/50 cursor-not-allowed" 
                : "text-forest hover:text-forest-deep"
            )}
          >
            <RefreshCwIcon className={cn("h-3.5 w-3.5", resendCooldown > 0 && "animate-spin-slow")} />
            {justResent ? "Code Sent!" : resendCooldown > 0 ? `Resend Code (${resendCooldown}s)` : "Resend Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
