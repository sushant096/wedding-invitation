import { wedding } from "../config/wedding";
import { ReferencePanel } from "./ReferencePanel";

export function Venue() {
  function openMaps() {
    const url = wedding.venue.mapsUrl.trim();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <ReferencePanel
      id="venue"
      src="/assets/location.jpg"
      alt={`${wedding.venue.name} venue and map`}
      className="panel-venue"
    >
      <button
        type="button"
        className="maps-hit"
        onClick={openMaps}
        data-testid="maps-button"
        aria-label="Open in Maps"
      />
    </ReferencePanel>
  );
}
