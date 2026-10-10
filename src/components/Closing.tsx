import { wedding } from "../config/wedding";
import { Bouquet } from "./art";

export function Closing() {
  return (
    <section className="sheet closing-sheet" id="closing" aria-labelledby="closing-heading">
      <Bouquet className="closing-bouquet closing-bouquet-left" />
      <Bouquet className="closing-bouquet closing-bouquet-right" flip />
      <div className="closing-inner">
        <h2 id="closing-heading" className="visually-hidden">Closing</h2>
        <p className="hope">{wedding.closingMessage}</p>
        <div
          className="hope-names"
          aria-label={`${wedding.partnerOne} and ${wedding.partnerTwo}`}
        >
          <span className="closing-name">{wedding.partnerOne}</span>
          <span className="closing-amp" aria-hidden="true">&</span>
          <span className="closing-name">{wedding.partnerTwo}</span>
        </div>
      </div>
    </section>
  );
}
