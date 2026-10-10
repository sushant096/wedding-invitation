import { motion, useReducedMotion } from "motion/react";
import { Flourish } from "./art";
import { Hero } from "./Hero";
import { LetterIntro } from "./LetterIntro";
import { Countdown } from "./Countdown";
import { EventTimeline } from "./EventTimeline";
import { Closing } from "./Closing";
import { Venue } from "./Venue";

type InvitationProps = {
  onReplay: () => void;
  heroVideoActive: boolean;
  heroPlayNonce: number;
  /** False while the envelope is still opening — keeps the hero hidden underneath. */
  revealed: boolean;
};

export function Invitation({ onReplay, heroVideoActive, heroPlayNonce, revealed }: InvitationProps) {
  const reduced = useReducedMotion();
  function scrollToLetter() {
    document.getElementById("letter")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <motion.div
      className="invitation"
      initial={false}
      animate={{ opacity: revealed ? 1 : 0 }}
      transition={{ duration: reduced ? 0.15 : revealed ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!revealed}
    >
      <Hero onScrollDown={scrollToLetter} videoActive={heroVideoActive} playNonce={heroPlayNonce} />

      <LetterIntro />

      <Countdown />
      <EventTimeline />
      <Venue />
      <Closing />

      <section className="replay-sheet">
        <Flourish className="flourish center-flourish" />
        <button type="button" className="replay-btn" onClick={onReplay} data-testid="replay">
          Replay the invitation
        </button>
      </section>
    </motion.div>
  );
}
