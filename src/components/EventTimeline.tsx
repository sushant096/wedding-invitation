import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";
import { Flourish, RoseMark } from "./art";

export function EventTimeline() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [roseY, setRoseY] = useState(28);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const update = () => {
      const mid = window.innerHeight * 0.46;
      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const rect = item.getBoundingClientRect();
        const dist = Math.abs(rect.top + rect.height / 2 - mid);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      setActive(best);
      const current = itemRefs.current[best];
      if (current) setRoseY(current.offsetTop + current.offsetHeight / 2);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [openId]);

  return (
    <section className="sheet events-sheet" id="events" aria-labelledby="events-title">
      <div className="title-row">
        <Flourish className="flourish" />
        <h2 id="events-title" className="script-title">
          {wedding.eventsTitle}
        </h2>
        <Flourish className="flourish flourish-flip" />
      </div>
      <div className="timeline" ref={listRef}>
        <div className="timeline-rail" aria-hidden="true" />
        <motion.div
          className="timeline-rose"
          aria-hidden="true"
          animate={{ y: roseY - 18 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }}
        >
          <RoseMark />
        </motion.div>
        <ul className="timeline-list">
          {wedding.events.map((event, index) => {
            const open = openId === event.id;
            return (
              <li
                key={event.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                className={index === active ? "is-active" : undefined}
              >
                <button
                  type="button"
                  className="event-button"
                  aria-expanded={open}
                  data-testid={`event-${event.id}`}
                  onClick={() => setOpenId(open ? null : event.id)}
                >
                  <span className="event-time">{event.time}</span>
                  <span className="event-name">{event.name}</span>
                </button>
                {open ? (
                  <div className="event-detail" data-testid={`event-detail-${event.id}`}>
                    <p>{event.date}</p>
                    <p>{event.description}</p>
                    <p>{event.venue}</p>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
