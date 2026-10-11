import { useState } from "react";
import { wedding } from "../config/wedding";
import { Flourish } from "./art";

export function Venue() {
  const [notice, setNotice] = useState("");
  const { venues } = wedding;

  function openMaps(url: string, label: string) {
    const trimmed = url.trim();
    if (!trimmed) {
      setNotice(`Add a mapsUrl for ${label} in src/config/wedding.ts.`);
      return;
    }
    setNotice("");
    window.open(trimmed, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="sheet venue-sheet" id="venue" aria-labelledby="venue-title">
      <h2 id="venue-title" className="script-title">
        {venues.title}
      </h2>
      <Flourish className="flourish center-flourish" />
      {venues.dateLine ? <p className="venue-when">{venues.dateLine}</p> : null}

      <div className="venue-cards">
        {venues.places.map((place) => (
          <article key={place.id} className="venue-card" aria-labelledby={`venue-${place.id}-name`}>
            <h3 id={`venue-${place.id}-name`} className="venue-card-name">
              {place.name}
            </h3>
            <address className="venue-card-address">
              {place.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <ul className="venue-event-list">
              {place.events.map((event) => (
                <li key={event.name}>
                  {event.name}
                  {event.note ? <span className="venue-event-note">{event.note}</span> : null}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="venue-card-maps-btn"
              data-testid={`maps-button-${place.id}`}
              onClick={() => openMaps(place.mapsUrl, place.name)}
            >
              Open in Maps
            </button>
          </article>
        ))}
      </div>

      {notice ? (
        <p className="config-note" data-testid="maps-notice" role="status">
          {notice}
        </p>
      ) : null}
    </section>
  );
}
