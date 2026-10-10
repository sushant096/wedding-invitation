import { wedding } from "../config/wedding";
import { Bouquet } from "./art";

export function Closing() {
  const coupleLine = `${wedding.partnerOne} & ${wedding.partnerTwo}`;

  return (
    <section className="sheet closing-sheet" id="closing" aria-labelledby="closing-heading">
      <Bouquet className="closing-bouquet closing-bouquet-left" />
      <Bouquet className="closing-bouquet closing-bouquet-right" flip />
      <div className="closing-inner">
        <h2 id="closing-heading" className="visually-hidden">Closing</h2>
        <p className="hope">{wedding.closingMessage}</p>
        <p className="hope-names">{coupleLine}</p>
      </div>
    </section>
  );
}
