import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { Countdown } from "./Countdown";
import { EventTimeline } from "./EventTimeline";
import { ReferencePanel } from "./ReferencePanel";
import { Rsvp } from "./Rsvp";
import { Venue } from "./Venue";

type InvitationProps = {
  onReplay: () => void;
};

export function Invitation({ onReplay }: InvitationProps) {
  const reduced = useReducedMotion();

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
      transition={{ duration: reduced ? 0.2 : 0.9, delay: reduced ? 0 : 0.35 }}
    >
      <ReferencePanel
        id="invitation"
        src="/assets/hero.jpg"
        alt={`Wedding invitation for ${wedding.partnerOne} and ${wedding.partnerTwo}`}
        className="panel-hero"
      >
        <button type="button" className="hero-scroll-hit" onClick={scrollToLetter} aria-label="Scroll down" />
        <h1 id="couple-names" className="visually-hidden" tabIndex={-1}>
          {wedding.partnerOne} & {wedding.partnerTwo}
        </h1>
      </ReferencePanel>

      <ReferencePanel
        id="letter"
        src="/assets/invite-letter.jpg"
        alt="Invitation wording"
        className="panel-letter"
      />

      <section className="ref-panel panel-countdown" id="countdown" aria-labelledby="countdown-title">
        <img src="/assets/countdown-top.jpg" alt="" className="ref-panel-img ref-panel-img-top" draggable={false} />
        <div className="ref-panel-overlay ref-countdown-body">
          <Countdown />
        </div>
      </section>

      <section className="ref-panel panel-schedule" id="events" aria-labelledby="events-title">
        <img src="/assets/schedule.jpg" alt="" className="ref-panel-img ref-panel-img-top" draggable={false} />
        <div className="ref-panel-overlay ref-schedule-body">
          <EventTimeline />
        </div>
      </section>

      <Venue />

      <ReferencePanel
        id="party"
        src="/assets/dress-party.jpg"
        alt="Dress code and wedding party"
        className="panel-party"
      />

      <Rsvp />

      <button type="button" className="replay-hit" onClick={onReplay} data-testid="replay" aria-label="Replay the invitation" />
    </motion.div>
  );
}
