import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoVideo from '@assets/download_20260614_135906_0000_1783241609712.mp4';

const INTRO_SEEN_KEY = 'snv_intro_v2';
const AUTO_DISMISS_MS = 6000;

type Phase = 'in' | 'hold' | 'out';

export function IntroScreen() {
  const [active, setActive] = useState<boolean>(() => {
    try {
      const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
      const isHome =
        window.location.pathname === base ||
        window.location.pathname === base + '/' ||
        window.location.pathname === '/';
      return isHome && !sessionStorage.getItem(INTRO_SEEN_KEY);
    } catch {
      return false;
    }
  });

  const [phase, setPhase] = useState<Phase>('in');
  const videoRef = useRef<HTMLVideoElement>(null);
  const dismissedRef = useRef(false);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;
    try { sessionStorage.setItem(INTRO_SEEN_KEY, '1'); } catch {}
    setPhase('out');
    unmountTimerRef.current = setTimeout(() => setActive(false), 900);
  }, []);

  // Clear any pending unmount timer if the component itself unmounts early
  useEffect(() => {
    return () => {
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!active) return;
    const holdTimer = setTimeout(() => setPhase('hold'), 600);
    const dismissTimer = setTimeout(dismiss, AUTO_DISMISS_MS);
    return () => {
      clearTimeout(holdTimer);
      clearTimeout(dismissTimer);
    };
  }, [active, dismiss]);

  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;
    const onEnded = () => dismiss();
    video.addEventListener('ended', onEnded, { once: true });
    return () => video.removeEventListener('ended', onEnded);
  }, [active, dismiss]);

  if (!active) return null;

  const isExiting = phase === 'out';

  return (
    <div className="snv-intro-root" onClick={dismiss}>
      {/* Curtain slides upward on exit, revealing the page */}
      <motion.div
        className="snv-intro-curtain"
        animate={isExiting ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: isExiting ? 0.15 : 0 }}
      />

      <AnimatePresence>
        {!isExiting && (
          <motion.div
            className="snv-intro-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
          >
            {/* ── Full-screen logo video ── */}
            <motion.video
              ref={videoRef}
              src={logoVideo}
              autoPlay
              muted
              playsInline
              className="snv-intro-video"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Bottom gradient so text stays legible over video */}
            <div className="snv-intro-veil" />

            {/* ── Text overlay ── */}
            <div className="snv-intro-text-block">
              {/* Company initials */}
              <motion.div
                className="snv-intro-initials"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.22em' }}
                transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
              >
                S·T
              </motion.div>

              {/* Full brand name */}
              <motion.div
                className="snv-intro-brand-name"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: 'easeOut' }}
              >
                SELINOVA-TECH
              </motion.div>

              {/* Divider line */}
              <motion.div
                className="snv-intro-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Signature */}
              <motion.div
                className="snv-intro-sig-block"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
              >
                <span className="snv-intro-sig-name">Daldaban Ferhan</span>
                <span className="snv-intro-sig-title">Founder of Gate-system</span>
              </motion.div>
            </div>

            {/* Skip hint */}
            <motion.p
              className="snv-intro-skip"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.6 }}
            >
              Klicken zum Überspringen
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
