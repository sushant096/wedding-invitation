import { useEffect, useState } from "react";
import { wedding } from "../config/wedding";
import { getRemaining, pad2, parseInstant, type Remaining } from "../lib/weddingUtils";

const empty: Remaining = { days: 0, hours: 0, minutes: 0, seconds: 0, elapsed: false };

export function Countdown() {
  const countdownIso = wedding.celebrationStartsAt ?? wedding.ceremonyAt;
  const target = parseInstant(countdownIso);
  const [remaining, setRemaining] = useState<Remaining>(() =>
    target === null ? empty : getRemaining(target, Date.now()),
  );

  useEffect(() => {
    if (target === null) return;
    const tick = () => setRemaining(getRemaining(target, Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return (
    <section className="sheet countdown-sheet" id="countdown" aria-labelledby="countdown-title">
      <h2 id="countdown-title" className="script-title">
        {wedding.countdownTitle}
      </h2>
      {target === null ? (
        <p className="config-note" data-testid="countdown-invalid">
          Set a valid ceremonyAt timestamp in the wedding config.
        </p>
      ) : (
        <>
          {remaining.elapsed ? (
            <p className="began" data-testid="countdown-elapsed">
              The celebration has begun
            </p>
          ) : null}
          <div className="countdown-row" data-testid="countdown" role="timer" aria-live="off">
            <Count value={String(remaining.days)} label="Days" />
            <span className="count-colon" aria-hidden="true">
              :
            </span>
            <Count value={pad2(remaining.hours)} label="Hours" />
            <span className="count-colon" aria-hidden="true">
              :
            </span>
            <Count value={pad2(remaining.minutes)} label="Minutes" />
            <span className="count-colon" aria-hidden="true">
              :
            </span>
            <Count value={pad2(remaining.seconds)} label="Seconds" />
          </div>
        </>
      )}
    </section>
  );
}

function Count({ value, label }: { value: string; label: string }) {
  return (
    <div className="count-cell">
      <span className="count-value">{value}</span>
      <span className="count-label">{label}</span>
    </div>
  );
}
