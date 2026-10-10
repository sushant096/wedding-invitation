import { useState } from "react";
import { wedding } from "../config/wedding";
import { formatLongWhen } from "../lib/weddingUtils";
import { Flourish, MapSketch, VillaArt } from "./art";

export function Venue() {
  const [imageFailed, setImageFailed] = useState(false);
  const [notice, setNotice] = useState("");
  const when =
    wedding.venue.dateLine ??
    formatLongWhen(wedding.ceremonyAt, wedding.timeZone);
  const showPhoto = Boolean(wedding.venue.imageSrc) && !imageFailed;

  function openMaps() {
    const url = wedding.venue.mapsUrl.trim();
    if (!url) {
      setNotice("Add venue.mapsUrl in src/config/wedding.ts. This button opens only that Google Maps link.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="sheet venue-sheet" id="venue" aria-labelledby="venue-title">
      <h2 id="venue-title" className="script-title">
        {wedding.venue.title}
      </h2>
      <Flourish className="flourish center-flourish" />
      <p className="venue-name">{wedding.venue.name}</p>
      {when ? <p className="venue-when">{when}</p> : null}
      <address className="venue-address">
        {wedding.venue.addressLines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </address>
      <div className="petal petal-a" aria-hidden="true" />
      <div className="petal petal-b" aria-hidden="true" />
      <figure className="venue-figure">
        {showPhoto ? (
          <img
            src={wedding.venue.imageSrc}
            alt={wedding.venue.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <VillaArt />
        )}
      </figure>
      <div className="map-card">
        <MapSketch />
        <button type="button" className="maps-button" onClick={openMaps} data-testid="maps-button">
          Open in Maps
        </button>
      </div>
      {notice ? (
        <p className="config-note" data-testid="maps-notice" role="status">
          {notice}
        </p>
      ) : null}
    </section>
  );
}
