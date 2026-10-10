import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type EnvelopeProps = {
  phase: "sealed" | "opening";
  onOpen: () => void;
  onOpened: () => void;
  musicControl: ReactNode;
};

const lidEase = [0.33, 0.02, 0.18, 1] as const;
/** Closed lid tilt — top flap reads above the pocket (reference envelope). */
const LID_REST = -6;

export function Envelope({ phase, onOpen, onOpened, musicControl }: EnvelopeProps) {
  const reduced = useReducedMotion();
  const opening = phase === "opening";

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpened, reduced ? 420 : 3400);
    return () => window.clearTimeout(timer);
  }, [opening, onOpened, reduced]);

  return (
    <motion.div
      className="envelope-screen"
      animate={opening ? { opacity: reduced ? 0 : [1, 1, 0] } : { opacity: 1 }}
      transition={
        opening
          ? { duration: reduced ? 0.4 : 3.25, times: [0, 0.78, 1], ease: "easeInOut" }
          : { duration: 0.45 }
      }
    >
      <div className={`garden-envelope${opening ? " is-opening" : ""}`}>
        <motion.div
          className="envelope-interior"
          aria-hidden="true"
          animate={
            opening && !reduced
              ? { opacity: [0.85, 1, 1.15] }
              : { opacity: 1 }
          }
          transition={
            opening
              ? { duration: 1.85, delay: 0.42, times: [0, 0.35, 1], ease: "easeOut" }
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
              ? { rotateX: [LID_REST, 12, 82], z: [18, 22, 48] }
              : { rotateX: reduced ? 0 : LID_REST, z: reduced ? 0 : 18, opacity: reduced && opening ? 0 : 1 }
          }
          transition={{ duration: reduced ? 0.25 : 1.85, delay: reduced ? 0 : 0.42, times: [0, 0.22, 1], ease: lidEase }}
        />
        <motion.div
          className="lid-seal"
          style={{ transformOrigin: "50% 0%" }}
          animate={
            opening && !reduced
              ? { rotateX: [LID_REST, 12, 82], z: [28, 32, 58] }
              : { rotateX: reduced ? 0 : LID_REST, z: reduced ? 0 : 28, opacity: reduced && opening ? 0 : 1 }
          }
          transition={{ duration: reduced ? 0.25 : 1.85, delay: reduced ? 0 : 0.42, times: [0, 0.22, 1], ease: lidEase }}
        >
          <div className="seal-anchor">
            {!reduced ? (
              <>
                <motion.div
                  className="seal-glow seal-glow-halo"
                  aria-hidden="true"
                  animate={
                    opening
                      ? { opacity: [0.5, 1, 0.85], scale: [0.9, 1.45, 1.2] }
                      : { opacity: [0.42, 0.78, 0.42], scale: [0.94, 1.12, 0.94] }
                  }
                  transition={
                    opening
                      ? { duration: 1.85, delay: 0.42, times: [0, 0.32, 1], ease: "easeOut" }
                      : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
                  }
                />
                <motion.div
                  className="seal-glow seal-glow-core"
                  aria-hidden="true"
                  animate={
                    opening
                      ? { opacity: [0.35, 1, 0.95], scale: [0.75, 1.25, 1.05] }
                      : { opacity: [0.55, 0.92, 0.55], scale: [0.88, 1.06, 0.88] }
                  }
                  transition={
                    opening
                      ? { duration: 1.85, delay: 0.42, times: [0, 0.28, 1], ease: "easeOut" }
                      : { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.15 }
                  }
                />
              </>
            ) : null}
            <motion.button
              type="button"
              className="seal-button"
              onClick={onOpen}
              disabled={opening}
              aria-label="Open the invitation"
              data-testid="open-seal"
              animate={
                opening
                  ? {
                      filter: [
                        "drop-shadow(0 8px 10px rgba(60, 20, 24, 0.3))",
                        "drop-shadow(0 0 28px rgba(255, 220, 150, 1)) drop-shadow(0 0 48px rgba(255, 190, 90, 0.75)) drop-shadow(0 18px 16px rgba(80, 30, 10, 0.35))",
                        "drop-shadow(0 22px 18px rgba(40, 16, 8, 0.45))",
                      ],
                    }
                  : reduced
                    ? { scale: 1 }
                    : { scale: [1, 1.025, 1] }
              }
              transition={
                opening
                  ? { duration: 1.85, delay: 0.42, times: [0, 0.28, 1], ease: "easeOut" }
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img className="wax-photo" src="/images/wax-seal-tight.png" alt="" />
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
