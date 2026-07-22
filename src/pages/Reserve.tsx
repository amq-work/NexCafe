import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeftIcon, ArrowRightIcon, AlertTriangleIcon } from 'lucide-react';
import { StepIndicator } from '../components/reserve/StepIndicator';
import { DateStep } from '../components/reserve/DateStep';
import { TimeStep } from '../components/reserve/TimeStep';
import { PartyStep } from '../components/reserve/PartyStep';
import {
  DetailsStep,
  GuestDetails,
  FieldErrors,
  validateDetails,
} from '../components/reserve/DetailsStep';
import { OtpStep } from '../components/reserve/OtpStep';
import { ConfirmationStep } from '../components/reserve/ConfirmationStep';
import { Button } from '../components/ui/Button';
import { RESTAURANT, addReservation, TABLES } from '../lib/data';

const STEPS = ['Date', 'Time', 'Party', 'Details', 'OTP'];

export function Reserve() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [tableId, setTableId] = useState<number | null>(null);
  const [details, setDetails] = useState<GuestDetails>({
    name: '',
    phone: '',
    email: '',
    requests: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [reservationId, setReservationId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [showPhoneErrorModal, setShowPhoneErrorModal] = useState(false);

  // Helper to auto-select table based on guest size
  const autoSelectTable = (guestsCount: number) => {
    const matchingTable = TABLES.find(t => t.capacity >= guestsCount && t.status === 'available') 
                       || TABLES.find(t => t.capacity >= guestsCount)
                       || TABLES[0];
    return matchingTable ? matchingTable.id : 1;
  };

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!date;
      case 1:
        return !!time;
      case 2:
        return guests >= 1;
      case 3:
        return details.name.trim().length > 0 && details.phone.trim().length > 0;
      case 4:
        return otp.length === 4;
      default:
        return false;
    }
  }, [step, date, time, guests, details, otp]);

  const goNext = () => {
    if (step === 3) {
      const fieldErrors = validateDetails(details);
      
      // Let's check phone validation: ONLY "int" (digits) and EXACTLY 11 digits
      const phoneNum = details.phone.trim();
      const isDigitsOnlyAnd11 = /^\d{11}$/.test(phoneNum);
      
      if (!isDigitsOnlyAnd11) {
        setShowPhoneErrorModal(true);
        setErrors({
          ...fieldErrors,
          phone: 'Phone number must consist only of integers and be exactly 11 digits.',
        });
        return;
      }

      setErrors(fieldErrors);
      if (Object.keys(fieldErrors).length > 0) return;

      // Auto select an available table since table step is removed
      const chosenTableId = autoSelectTable(guests);
      setTableId(chosenTableId);

      setDirection(1);
      setStep((s) => s + 1);
    } else if (step < STEPS.length - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };

  const handleSubmit = async () => {
    if (otp !== '1234') {
      setOtpError('Invalid verification code. Hint: Use 1234 to verify.');
      return;
    }

    setSubmitting(true);
    setOtpError('');

    // Simulated short network delay
    await new Promise((r) => setTimeout(r, 900));
    const newResId = 'RES-' + Math.floor(1000 + Math.random() * 9000);
    const newCustId = 'CUST-' + Math.floor(1000 + Math.random() * 9000);
    
    setReservationId(newResId);
    setCustomerId(newCustId);

    if (typeof window !== 'undefined') {
      localStorage.setItem('nexcafe_last_customer_id', newCustId);
    }

    // Save to localStorage so it appears in Admin
    addReservation({
      id: newResId,
      guestName: details.name,
      date: date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      time: time || '19:00',
      guests,
      tableId: tableId || 1,
      status: 'confirmed',
      phone: details.phone,
      customerId: newCustId,
    });

    setSubmitting(false);
    setConfirmed(true);
  };

  return (
    <main className="min-h-screen w-full bg-cream pb-20 pt-28">
      <div className="mx-auto max-w-2xl px-5 sm:px-8">
        {!confirmed && (
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-forest"
            >
              <ArrowLeftIcon className="h-4 w-4" /> Back to {RESTAURANT.name}
            </Link>
            <div className="mt-6">
              <StepIndicator steps={STEPS} current={step} />
            </div>
          </div>
        )}

        <div className="glass rounded-3xl p-6 sm:p-10">
          {confirmed ? (
            <ConfirmationStep
              date={date}
              time={time}
              guests={guests}
              tableId={tableId}
              name={details.name}
              email={details.email}
              reservationId={reservationId}
              customerId={customerId}
            />
          ) : (
            <>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={step}
                    custom={direction}
                    initial={{
                      opacity: 0,
                      x: direction * 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: direction * -40,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                    }}
                  >
                    {step === 0 && <DateStep value={date} onChange={setDate} />}
                    {step === 1 && <TimeStep value={time} onChange={setTime} />}
                    {step === 2 && (
                      <PartyStep value={guests} onChange={setGuests} />
                    )}
                    {step === 3 && (
                      <DetailsStep
                        details={details}
                        errors={errors}
                        onChange={(patch) => {
                          setDetails((d) => ({
                            ...d,
                            ...patch,
                          }));
                          setErrors({});
                        }}
                      />
                    )}
                    {step === 4 && (
                      <OtpStep
                        phone={details.phone}
                        value={otp}
                        onChange={(val) => {
                          setOtp(val);
                          setOtpError('');
                        }}
                        error={otpError}
                        onResend={() => {
                          console.log('OTP resent successfully');
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex items-center justify-between gap-4">
                <Button variant="ghost" theme="light" onClick={goBack} disabled={step === 0}>
                  <ArrowLeftIcon className="h-4 w-4" /> Back
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button
                    onClick={goNext}
                    disabled={!canAdvance}
                    theme="light"
                    className="group"
                  >
                    Continue
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} theme="light" loading={submitting} disabled={!canAdvance}>
                    Confirm reservation
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Invalid Phone Error Modal Pop-up */}
      <AnimatePresence>
        {showPhoneErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPhoneErrorModal(false)}
              className="fixed inset-0 bg-[#131B10]/40 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#DFE7CF]/20 bg-[#FDFCF7]/95 p-6 shadow-2xl backdrop-blur-xl z-10"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sriracha/10 text-sriracha">
                  <AlertTriangleIcon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-bold text-forest-deep">
                    Invalid Phone Number
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted font-sans">
                    We're sorry, but the phone number you entered is invalid.
                    It must consist of <span className="font-semibold text-forest-deep">exactly 11 digits</span> and contain only integers (0-9).
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setShowPhoneErrorModal(false)}
                  theme="light"
                  className="w-full sm:w-auto"
                >
                  Go Back & Edit
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
