import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { Bouquet, Flourish } from "./art";

export function FamilyInvitation() {
  const reduced = useReducedMotion();
  const { host, families, partnerOne, partnerTwo } = wedding;

  return (
    <section
      className="sheet family-invitation-sheet"
      id="family-invitation"
      aria-labelledby="family-invitation-title"
    >
      <div className="family-invitation-paper" aria-hidden="true" />
      <Bouquet className="family-bouquet family-bouquet-left" />
      <Bouquet className="family-bouquet family-bouquet-right" flip />

      <motion.div
        className="family-invitation-inner"
        initial={reduced ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="family-invitation-title" className="visually-hidden">
          Family invitation
        </h2>

        <Flourish className="flourish family-flourish" />
        <p className="family-host-line">{host.nameLine}</p>
        <p className="family-host-invite">
          {host.inviteLines.map((line) => (
            <span key={line} className="family-host-invite-line">
              {line}
            </span>
          ))}
        </p>

        <div className="family-couple-block" aria-label={`${partnerTwo} weds ${partnerOne}`}>
          <p className="family-partner-name">{families.groom.displayName}</p>
          <p className="family-lineage">{families.groom.parentsLine}</p>
          <p className="family-lineage">{families.groom.grandparentsLine}</p>

          <p className="family-weds-divider" aria-hidden="true">— Weds —</p>

          <p className="family-partner-name">{families.bride.displayName}</p>
          <p className="family-lineage">{families.bride.parentsLine}</p>
          <p className="family-lineage">{families.bride.grandparentsLine}</p>
        </div>
      </motion.div>
    </section>
  );
}
