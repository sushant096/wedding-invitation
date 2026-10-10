import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { Bouquet, EmbossPattern } from "./art";
import { WaxSeal } from "./WaxSeal";

type EnvelopeProps = {
  phase: "sealed" | "opening";
  onOpen: () => void;
  onOpened: () => void;
  musicControl: ReactNode;
};

const flapEase = [0.45, 0.05, 0.2, 1] as const;

export function Envelope({ phase, onOpen, onOpened, musicControl }: EnvelopeProps) {
  const reduced = useReducedMotion();
  const opening = phase === "opening";

  useEffect(() => {
    if (!opening) return;
    const timer = window.setTimeout(onOpened, reduced ? 480 : 2500);
    return () => window.clearTimeout(timer);
  }, [opening, onOpened, reduced]);

  return (
    <motion.div
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={
        opening
          ? { opacity: reduced ? 0 : [1, 1, 0], scale: reduced ? 1 : [1, 1, 1.02] }
          : { opacity: 1, scale: 1 }
      }
      transition={
        opening
          ? { duration: reduced ? 0.45 : 2.4, times: [0, 0.68, 1], ease: "easeInOut" }
          : { duration: 0.7 }
      }
    >
      <div className="envelope">
        <div className="envelope-interior" />
        <motion.div
          className="reveal-light"
          animate={
            opening
              ? { opacity: [0, 1, 0.7], scale: reduced ? 1 : [0.2, 1.2, 2.4] }
              : { opacity: 0, scale: 0.2 }
          }
          transition={{ duration: reduced ? 0.3 : 1.8, ease: "easeOut" }}
        />
        <Flap
          className="flap-bottom"
          opening={opening}
          reduced={!!reduced}
          rotate={reduced ? {} : { rotateX: -68 }}
          delay={0.05}
        >
          <EmbossPattern />
          <Bouquet className="flap-bouquet flap-bouquet-bottom" />
        </Flap>
        <Flap
          className="flap-left"
          opening={opening}
          reduced={!!reduced}
          rotate={reduced ? {} : { rotateY: -72 }}
          delay={0.12}
        >
          <EmbossPattern />
          <Bouquet className="flap-bouquet flap-bouquet-side" />
        </Flap>
        <Flap
          className="flap-right"
          opening={opening}
          reduced={!!reduced}
          rotate={reduced ? {} : { rotateY: 72 }}
          delay={0.12}
        >
          <EmbossPattern />
          <Bouquet className="flap-bouquet flap-bouquet-side flap-bouquet-flip" />
        </Flap>
        <Flap
          className="flap-top"
          opening={opening}
          reduced={!!reduced}
          rotate={reduced ? {} : { rotateX: 70 }}
          delay={0.02}
        >
          <EmbossPattern />
        </Flap>
        <svg className="envelope-seams" viewBox="0 0 100 100" aria-hidden="true">
          <path d="M0 0 L50 50 L100 0 M0 100 L50 50 L100 100" fill="none" stroke="rgba(255,236,214,0.88)" strokeWidth="0.7" />
        </svg>
        <div className="envelope-music">{musicControl}</div>
        <div className="seal-anchor">
          <motion.button
            type="button"
            className="seal-button"
            onClick={onOpen}
            disabled={opening}
            aria-label="Open the invitation"
            data-testid="open-seal"
            animate={
              opening
                ? { scale: 1.12, opacity: 0, y: -30 }
                : reduced
                  ? { scale: 1, opacity: 1, y: 0 }
                  : { scale: [1, 1.04, 1], opacity: 1, y: 0 }
            }
            transition={
              opening
                ? { duration: 0.9 }
                : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <WaxSeal initials={wedding.monogram} tone="ivory" />
          </motion.button>
        </div>
        <p className={`seal-hint ${opening ? "is-hidden" : ""}`}>Tap the seal</p>
      </div>
    </motion.div>
  );
}

function Flap({
  className,
  opening,
  reduced,
  rotate,
  delay,
  children,
}: {
  className: string;
  opening: boolean;
  reduced: boolean;
  rotate: Record<string, number>;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`flap ${className}`}
      animate={opening ? { ...rotate, opacity: reduced ? 0 : 1 } : { rotateX: 0, rotateY: 0, opacity: 1 }}
      transition={{ duration: reduced ? 0.25 : 1.45, delay: reduced ? 0 : delay, ease: flapEase }}
    >
      <motion.div
        className="flap-gold"
        animate={
          opening
            ? { opacity: 0.95 }
            : reduced
              ? { opacity: 0.25 }
              : { opacity: [0.15, 0.7, 0.15] }
        }
        transition={
          opening ? { duration: 0.6 } : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      {children}
    </motion.div>
  );
}
