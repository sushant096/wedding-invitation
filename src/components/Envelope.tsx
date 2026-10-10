import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type EnvelopeProps = {
  phase: "sealed" | "opening";
  onOpen: () => void;
  onOpened: () => void;
  musicControl: ReactNode;
};

/** Smooth lift — avoids the harsh “snap” of an ease with a near-zero second control point. */
const lidEase = [0.42, 0, 0.18, 1] as const;
/** Closed lid tilt — top flap reads above the pocket (reference envelope). */
const LID_REST = -6;
const OPEN_DELAY_S = 0.18;
const OPEN_FLAP_S = 2.25;
const OPEN_END_MS = Math.round((OPEN_DELAY_S + OPEN_FLAP_S) * 1000 + 1100);
const lidOpenTransition = {
  duration: OPEN_FLAP_S,
  delay: OPEN_DELAY_S,
  ease: lidEase,
} as const;

const waxGlowIdle = [
  "drop-shadow(0 0 5px rgba(255, 225, 170, 0.85)) drop-shadow(0 0 14px rgba(255, 195, 115, 0.55)) brightness(1.03) saturate(1.05)",
  "drop-shadow(0 0 12px rgba(255, 238, 195, 1)) drop-shadow(0 0 24px rgba(255, 205, 120, 0.75)) brightness(1.1) saturate(1.12)",
  "drop-shadow(0 0 5px rgba(255, 225, 170, 0.85)) drop-shadow(0 0 14px rgba(255, 195, 115, 0.55)) brightness(1.03) saturate(1.05)",
] as const;

const waxGlowOpen = [
  "drop-shadow(0 0 8px rgba(255, 235, 195, 0.95)) drop-shadow(0 0 18px rgba(255, 210, 130, 0.7)) brightness(1.06) saturate(1.08)",
  "drop-shadow(0 0 14px rgba(255, 248, 220, 1)) drop-shadow(0 0 28px rgba(255, 220, 150, 0.95)) drop-shadow(0 0 42px rgba(255, 185, 90, 0.65)) brightness(1.14) saturate(1.15)",
  "drop-shadow(0 0 10px rgba(255, 230, 180, 0.9)) drop-shadow(0 0 22px rgba(255, 200, 120, 0.75)) brightness(1.08) saturate(1.1)",
] as const;

export function Envelope({ phase, onOpen, onOpened, musicControl }: EnvelopeProps) {
  const reduced = useReducedMotion();
  const opening = phase === "opening";

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpened, reduced ? 420 : OPEN_END_MS);
    return () => window.clearTimeout(timer);
  }, [opening, onOpened, reduced]);

  return (
    <motion.div
      className="envelope-screen"
      animate={opening ? { opacity: reduced ? 0 : [1, 1, 0] } : { opacity: 1 }}
      transition={
        opening
          ? { duration: reduced ? 0.4 : OPEN_END_MS / 1000, times: [0, 0.82, 1], ease: [0.4, 0, 0.2, 1] }
          : { duration: 0.45 }
      }
    >
      <div className={`garden-envelope${opening ? " is-opening" : ""}`}>
        <motion.div
          className="envelope-interior"
          aria-hidden="true"
          animate={opening && !reduced ? { opacity: [0.94, 1] } : { opacity: 1 }}
          transition={
            opening
              ? { ...lidOpenTransition, duration: OPEN_FLAP_S * 0.85 }
              : { duration: 0.3 }
          }
        />

        <div className="flap paper-flap flap-left" />
        <div className="flap paper-flap flap-right" />
        <div className="flap paper-flap flap-bottom" />

        <svg className="envelope-seam-shadow" viewBox="0 0 100 160" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2="50" y2="80" stroke="rgba(82, 62, 46, 0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="0" x2="50" y2="80" stroke="rgba(82, 62, 46, 0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="0" y1="160" x2="50" y2="80" stroke="rgba(82, 62, 46, 0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <line x1="100" y1="160" x2="50" y2="80" stroke="rgba(82, 62, 46, 0.18)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        </svg>

        <motion.div
          className={`flap paper-flap flap-top ${opening ? "is-opening" : ""}`}
          style={{ transformOrigin: "50% 0%" }}
          animate={
            opening && !reduced
              ? { rotateX: [LID_REST, 76] }
              : { rotateX: reduced ? 0 : LID_REST, opacity: reduced && opening ? 0 : 1 }
          }
          transition={reduced ? { duration: 0.25 } : opening ? lidOpenTransition : { duration: 0.35, ease: lidEase }}
        />
        <motion.div
          className="lid-seal"
          style={{ transformOrigin: "50% 0%" }}
          animate={
            opening && !reduced
              ? { rotateX: [LID_REST, 76] }
              : { rotateX: reduced ? 0 : LID_REST, opacity: reduced && opening ? 0 : 1 }
          }
          transition={reduced ? { duration: 0.25 } : opening ? lidOpenTransition : { duration: 0.35, ease: lidEase }}
        >
          <div className="seal-anchor">
            <motion.button
              type="button"
              className="seal-button"
              onClick={onOpen}
              disabled={opening}
              aria-label="Open the invitation"
              data-testid="open-seal"
              animate={reduced ? { scale: 1 } : opening ? { scale: 1 } : { scale: [1, 1.025, 1] }}
              transition={
                opening
                  ? { duration: 0.3 }
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <span className="seal-face">
                {!reduced ? (
                  <motion.span
                    className="seal-glow seal-glow-halo"
                    aria-hidden="true"
                    animate={
                      opening
                        ? { opacity: [0.35, 0.7, 0.5], scale: [0.98, 1.08, 1.02] }
                        : { opacity: [0.28, 0.52, 0.28], scale: [0.99, 1.04, 0.99] }
                    }
                    transition={
                      opening
                        ? { ...lidOpenTransition, duration: OPEN_FLAP_S * 0.9 }
                        : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                ) : null}
                <motion.img
                  className="wax-photo"
                  src="/images/wax-seal-tight.png"
                  alt=""
                  animate={{
                    filter: reduced
                      ? waxGlowIdle[0]
                      : opening
                        ? [...waxGlowOpen]
                        : [...waxGlowIdle],
                  }}
                  transition={
                    opening
                      ? { ...lidOpenTransition, duration: OPEN_FLAP_S * 0.75 }
                      : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                {!reduced ? (
                  <motion.span
                    className="seal-wax-glow"
                    aria-hidden="true"
                    animate={
                      opening
                        ? { opacity: [0.25, 0.85, 0.55] }
                        : { opacity: [0.2, 0.55, 0.2] }
                    }
                    transition={
                      opening
                        ? { ...lidOpenTransition, duration: OPEN_FLAP_S * 0.85 }
                        : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                    }
                  />
                ) : null}
              </span>
            </motion.button>
          </div>
        </motion.div>

        <p className={`seal-hint ${opening ? "is-hidden" : ""}`}>
          <span className="film-chevron" aria-hidden="true" />
          Tap to open
        </p>
        <div className="envelope-music">{musicControl}</div>
      </div>
    </motion.div>
  );
}
