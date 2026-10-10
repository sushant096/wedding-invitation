import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { formatHeroDate } from "../lib/weddingUtils";
import { Bouquet, CornerSpray, Flourish, SwanLake } from "./art";
import { Countdown } from "./Countdown";
import { EventTimeline } from "./EventTimeline";
import { Rsvp } from "./Rsvp";
import { Venue } from "./Venue";
import { WeddingParty } from "./WeddingParty";

type InvitationProps = {
  onReplay: () => void;
};

export function Invitation({ onReplay }: InvitationProps) {
  const reduced = useReducedMotion();
  const heroDate = formatHeroDate(wedding.ceremonyAt, wedding.timeZone);

  function scrollToLetter() {
    document.getElementById("letter")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
    });
  }

  return (
    <motion.div
      className="invitation"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0.2 : 1.15, delay: reduced ? 0 : 0.7 }}
    >
      <section className="hero" id="invitation" aria-labelledby="couple-names">
        <div className="arch-frame" aria-hidden="true" />
        <CornerSpray className="hero-corner hero-corner-left" />
        <CornerSpray className="hero-corner hero-corner-right" flip />
        <div className="hero-copy">
          <p className="script-title hero-eyebrow">{wedding.heroEyebrow}</p>
          {heroDate ? <p className="hero-date">{heroDate}</p> : null}
          <h1 id="couple-names" tabIndex={-1}>
            <span>{wedding.partnerOne}</span>
            <span className="amp">&</span>
            <span>{wedding.partnerTwo}</span>
          </h1>
          <button type="button" className="scroll-cue" onClick={scrollToLetter}>
            <span>Scroll down</span>
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
        <SwanLake />
      </section>

      <section className="sheet letter-sheet" id="letter" aria-labelledby="letter-names">
        <div className="letter-banner">
          <Bouquet className="letter-bouquet" />
          <Bouquet className="letter-bouquet" flip />
        </div>
        <h2 id="letter-names" className="letter-names">
          {wedding.partnerOne} & {wedding.partnerTwo}
        </h2>
        <p className="letter-lead">{wedding.invitationLead}</p>
        <p className="letter-body">{wedding.invitationBody}</p>
      </section>

      <Countdown />
      <EventTimeline />
      <Venue />
      <WeddingParty />
      <Rsvp />

      <section className="replay-sheet">
        <Flourish className="flourish center-flourish" />
        <button type="button" className="replay-btn" onClick={onReplay} data-testid="replay">
          Replay the invitation
        </button>
      </section>
    </motion.div>
  );
}
