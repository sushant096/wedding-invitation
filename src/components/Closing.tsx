import { wedding } from "../config/wedding";
import { Bouquet } from "./art";

export function Closing() {
  const { rsvp } = wedding;

  return (
    <section className="sheet closing-sheet" id="closing" aria-labelledby="closing-heading">
      <Bouquet className="closing-bouquet closing-bouquet-left" />
      <Bouquet className="closing-bouquet closing-bouquet-right" flip />
      <div className="closing-inner">
        <h2 id="closing-heading" className="hope">
          {rsvp.title}
        </h2>
        <div className="closing-rsvp-card">
          <ul className="rsvp-contact-list">
            {rsvp.contacts.map((contact) => (
              <li key={contact.phone}>
                <span className="rsvp-contact-name">{contact.name}</span>
                <a className="rsvp-contact-phone" href={`tel:+91${contact.phone}`}>
                  {contact.phone}
                </a>
              </li>
            ))}
          </ul>
          <p className="rsvp-compliments">{rsvp.complimentsLine}</p>
          <p className="rsvp-family-flower">
            <span className="rsvp-family-flower-label">{rsvp.familyFlowerLabel}</span>
            {": "}
            <span className="rsvp-family-flower-name">{rsvp.familyFlowerName}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
