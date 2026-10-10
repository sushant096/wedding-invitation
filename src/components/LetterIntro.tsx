import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";

export function LetterIntro() {
  const reduced = useReducedMotion();
  const verse = wedding.heroVerse.filter((line) => line.trim().length > 0);

  return (
    <section className="sheet garden-letter" id="letter" aria-labelledby="letter-heading">
      <h2 id="letter-heading" className="visually-hidden">
        Invitation
      </h2>

      {verse.length > 0 ? (
        <motion.div
          className="verse-block"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {verse.map((line) => (
            <p key={line} className="gold-script verse-line">{line}</p>
          ))}
        </motion.div>
      ) : null}

      <p className="letter-salutation">{wedding.letterSalutation}</p>
      <p className="letter-body garden-body">{wedding.invitationBody}</p>
    </section>
  );
}
