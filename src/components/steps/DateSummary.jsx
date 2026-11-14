import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Coffee,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Shirt,
  Cookie,
  MessageCircleHeart,
  Send,
  Edit3,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import CuteButton from '../common/CuteButton';
import { sendDateInvitationEmail, formatDisplayDate, isEmailConfigured } from '../../services/emailService';
import { playSparkleSound, playPopSound } from '../../utils/soundEffects';

export default function DateSummary({
  dateDetails,
  onEdit,
  onSubmissionSuccess,
}) {
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [configNotice, setConfigNotice] = useState(false);

  const handleSubmit = async (forceDemo = false) => {
    setIsSending(true);
    setSendError(null);
    setConfigNotice(false);

    if (forceDemo) {
      // Simulate sending delay for smooth emotional experience
      setTimeout(() => {
        setIsSending(false);
        playSparkleSound();
        onSubmissionSuccess({ demo: true });
      }, 1500);
      return;
    }

    try {
      const result = await sendDateInvitationEmail(dateDetails);

      if (result.success) {
        setIsSending(false);
        playSparkleSound();
        onSubmissionSuccess(result);
      } else {
        setIsSending(false);
        if (result.isConfigMissing) {
          setConfigNotice(true);
        } else {
          setSendError(result.message || 'Something went wrong while sending.');
        }
      }
    } catch (err) {
      setIsSending(false);
      setSendError(err.message || 'Network error occurred. Please try again.');
    }
  };

  const drinkEmoji = dateDetails.drink === 'coffee' ? '☕' : '🫖';
  const drinkLabel = dateDetails.drink === 'coffee' ? 'Coffee Date' : 'Chai Date';

  return (
    <div className="w-full max-w-xl mx-auto px-4 flex flex-col items-center">
      {/* Step Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-rounded font-bold text-[#D9658B] tracking-wider uppercase bg-[#FFF0F4] px-3.5 py-1 rounded-full border border-[#F8C8D8] mb-2"
      >
        Step 07 • The Invitation Card
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-2xl sm:text-3xl md:text-4xl font-rounded font-extrabold text-[#49343D] text-center mb-1"
      >
        Our little date plan <span className="text-[#FF5C8A]">❤️</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-xs sm:text-sm text-[#7A626C] text-center mb-6"
      >
        Double check everything before sending it straight to my heart 💌
      </motion.p>

      {/* Romantic Date Boarding Pass / Invitation Ticket */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full glass-panel rounded-3xl p-6 sm:p-7 mb-6 shadow-kawaii-lg border-2 border-white/80 relative overflow-hidden"
      >
        {/* Ticket Header Decor */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-dashed border-[#F8C8D8]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐼</span>
            <div>
              <p className="font-script text-lg text-[#D9658B] leading-none">A Little Date</p>
              <p className="font-rounded font-bold text-xs text-[#49343D]">Special Invitation Pass</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-full bg-[#FFF0F4] border border-[#F8C8D8] text-[11px] font-rounded font-bold text-[#D9658B]">
            Confirmed RSVP 💌
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3.5">
          {/* Sip & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <Coffee className="w-3 h-3 text-[#EFA2BB]" /> Warm Sip
              </span>
              <p className="font-rounded font-bold text-sm text-[#49343D] flex items-center gap-1.5">
                <span>{drinkEmoji}</span> {drinkLabel}
              </p>
            </div>

            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3 text-[#EFA2BB]" /> Location
              </span>
              <p className="font-rounded font-bold text-sm text-[#49343D] truncate">
                {dateDetails.location}
              </p>
              <span className="text-[10px] text-[#A78E99]">Bhubaneswar, Odisha</span>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3 text-[#EFA2BB]" /> Reserved Date
              </span>
              <p className="font-rounded font-bold text-xs sm:text-sm text-[#D9658B]">
                {formatDisplayDate(dateDetails.date)}
              </p>
            </div>

            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3 text-[#EFA2BB]" /> Meeting Time
              </span>
              <p className="font-rounded font-bold text-sm text-[#49343D]">
                {dateDetails.time}
              </p>
            </div>
          </div>

          {/* Outfit & Snacks */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <Shirt className="w-3 h-3 text-[#EFA2BB]" /> Outfit Vibe
              </span>
              <p className="font-rounded font-bold text-xs sm:text-sm text-[#49343D]">
                {dateDetails.outfit}
              </p>
            </div>

            <div className="bg-white/70 p-3 rounded-2xl border border-[#F8C8D8]/40">
              <span className="text-[11px] font-semibold text-[#7A626C] flex items-center gap-1 mb-1">
                <Cookie className="w-3 h-3 text-[#EFA2BB]" /> Snacks
              </span>
              <p className="font-rounded font-bold text-xs sm:text-sm text-[#49343D]">
                {dateDetails.snacks}
              </p>
            </div>
          </div>

          {/* Personal Note if provided */}
          {dateDetails.personalMessage && dateDetails.personalMessage.trim() && (
            <div className="bg-[#FFF5F7] p-3 rounded-2xl border border-[#F8C8D8]/60">
              <span className="text-[11px] font-semibold text-[#D9658B] flex items-center gap-1 mb-1">
                <MessageCircleHeart className="w-3 h-3 text-[#EFA2BB]" /> Your Sweet Note
              </span>
              <p className="font-body text-xs sm:text-sm text-[#49343D] italic">
                &ldquo;{dateDetails.personalMessage.trim()}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Cute panda couple avatar footer */}
        <div className="mt-5 pt-3 border-t border-[#F8C8D8]/40 flex items-center justify-center gap-2 text-xs font-rounded font-semibold text-[#7A626C]">
          <span>🐼 Bao & Mochi approve this date! 🐾</span>
        </div>
      </motion.div>

      {/* Sending Overlay / Status */}
      <AnimatePresence>
        {isSending && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full mb-6 p-4 rounded-2xl bg-[#FFF9EF] border-2 border-[#EFA2BB] flex items-center justify-center gap-3 shadow-kawaii text-[#D9658B] font-rounded font-bold text-sm"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            >
              <RefreshCw className="w-5 h-5 text-[#EFA2BB]" />
            </motion.div>
            <span>Sending your date invitation to Suryakant... 💌</span>
          </motion.div>
        )}

        {/* Configuration Notice if EmailJS keys are not yet provided */}
        {configNotice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full mb-6 p-4 rounded-2xl bg-[#FFF0F4] border-2 border-[#EFA2BB] text-left shadow-kawaii"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#D9658B] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-rounded font-bold text-sm text-[#49343D] mb-1">
                  EmailJS Keys Setup Needed
                </h4>
                <p className="text-xs text-[#7A626C] mb-3 leading-relaxed">
                  The EmailJS credentials (<code>VITE_EMAILJS_PUBLIC_KEY</code>, <code>VITE_EMAILJS_SERVICE_ID</code>, <code>VITE_EMAILJS_TEMPLATE_ID</code>) are not configured in your <code>.env</code> file yet.
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSubmit(true)}
                    className="px-3 py-1.5 rounded-full bg-[#EFA2BB] text-white text-xs font-rounded font-bold shadow-sm hover:bg-[#D9658B] transition-all"
                  >
                    Simulate & See Success Scene ✨
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSubmit(false)}
                    className="px-3 py-1.5 rounded-full bg-white text-[#49343D] border border-[#F8C8D8] text-xs font-rounded font-semibold hover:bg-[#FFF5F7] transition-all"
                  >
                    Retry Sending
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Error Notice */}
        {sendError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-full mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-left shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-rounded font-bold text-xs text-red-800">
                  Could not deliver email
                </p>
                <p className="text-xs text-red-600 mt-0.5">
                  {sendError}
                </p>
                <button
                  type="button"
                  onClick={() => handleSubmit(false)}
                  className="mt-2 text-xs font-rounded font-bold text-red-700 underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retry delivery
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <CuteButton
          onClick={() => handleSubmit(false)}
          disabled={isSending}
          variant="primary"
          size="lg"
          icon={Send}
          className="w-full sm:flex-1"
        >
          {isSending ? 'Sending Love...' : 'Looks perfect! Send it ❤️'}
        </CuteButton>

        <CuteButton
          onClick={onEdit}
          disabled={isSending}
          variant="secondary"
          size="md"
          icon={Edit3}
          className="w-full sm:w-auto"
        >
          Let me change something
        </CuteButton>
      </div>
    </div>
  );
}

