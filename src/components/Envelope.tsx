import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type EnvelopeProps = {
  phase: "sealed" | "opening";
  onOpen: () => void;
  onOpened: () => void;
  musicControl: ReactNode;
};

export function Envelope({ phase, onOpen, onOpened, musicControl }: EnvelopeProps) {
  const reduced = useReducedMotion();
  const opening = phase === "opening";

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpened, reduced ? 500 : 2800);
    return () => window.clearTimeout(timer);
  }, [opening, onOpened, reduced]);

  return (
    <motion.div
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={
        opening
          ? { opacity: reduced ? 0 : [1, 1, 0] }
          : { opacity: 1 }
      }
      transition={
        opening
          ? { duration: reduced ? 0.45 : 2.6, times: [0, 0.72, 1], ease: "easeInOut" }
          : { duration: 0.6 }
      }
    >
      <div className="envelope-stage">
        <img
          src="/assets/envelope-closed.jpg"
          alt=""
          className={`envelope-art ${opening ? "is-hidden" : ""}`}
          draggable={false}
        />
        <img
          src="/assets/envelope-opening.jpg"
          alt=""
          className={`envelope-art envelope-art-opening ${opening ? "is-visible" : ""}`}
          draggable={false}
        />
        <motion.div
          className="reveal-light"
          animate={
            opening
              ? { opacity: [0, 1, 0.55], scale: reduced ? 1 : [0.3, 1.4, 2.2] }
              : { opacity: 0, scale: 0.3 }
          }
          transition={{ duration: reduced ? 0.35 : 1.9, ease: "easeOut" }}
        />
        <div className="envelope-music">{musicControl}</div>
        <button
          type="button"
          className="seal-hit"
          onClick={onOpen}
          disabled={opening}
          aria-label="Open the invitation"
          data-testid="open-seal"
        />
      </div>
    </motion.div>
  );
}
