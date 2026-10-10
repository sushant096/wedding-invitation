import { wedding } from "../config/wedding";
import { CornerSpray, PartyGroup } from "./art";

export function WeddingParty() {
  return (
    <section className="sheet party-sheet" id="party" aria-labelledby="party-title">
      <CornerSpray className="party-spray party-spray-right" />
      <CornerSpray className="party-spray party-spray-left" flip />
      <h2 id="party-title" className="script-title">
        {wedding.dressCode.title}
      </h2>
      <p className="dress-copy">{wedding.dressCode.message}</p>
      <PartyGroup members={wedding.party} />
      <ul className="party-names">
        {wedding.party.map((member, index) =>
          member.name ? (
            <li key={`${member.name}-${index}`}>{member.name}</li>
          ) : null,
        )}
      </ul>
    </section>
  );
}
