import { motion, useReducedMotion } from "motion/react";
import { wedding } from "../config/wedding";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"] as const;

function buildNovember2026Cells(): Array<number | null> {
  /** 1 Nov 2026 is a Sunday — no leading blanks. */
  const daysInMonth = 30;
  const cells: Array<number | null> = [];
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }
  const remainder = cells.length % 7;
  if (remainder !== 0) {
    for (let i = 0; i < 7 - remainder; i += 1) {
      cells.push(null);
    }
  }
  return cells;
}

const calendarCells = buildNovember2026Cells();

export function SaveTheDate() {
  const reduced = useReducedMotion();
  const highlights = new Set(wedding.saveTheDate.highlightDays);

  return (
    <section
      className="sheet save-the-date-sheet"
      id="save-the-date"
      aria-labelledby="save-the-date-title"
    >
      <motion.div
        className="save-the-date-inner"
        initial={reduced ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 id="save-the-date-title" className="save-the-date-script">
          {wedding.saveTheDate.title}
        </h2>
        <p className="save-the-date-month">{wedding.saveTheDate.monthLabel}</p>

        <div className="std-calendar" role="grid" aria-label="November 2026 calendar">
          <div className="std-weekdays" role="row">
            {WEEKDAYS.map((label, index) => (
              <span key={index} className="std-weekday" role="columnheader">
                {label}
              </span>
            ))}
          </div>
          <div className="std-days">
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <span key={`empty-${index}`} className="std-day std-day-empty" aria-hidden="true" />;
              }
              const highlighted = highlights.has(day);
              return (
                <span
                  key={day}
                  className={highlighted ? "std-day std-day-highlight" : "std-day"}
                  role="gridcell"
                  aria-label={
                    highlighted
                      ? `${day} November 2026, wedding dates`
                      : `${day} November 2026`
                  }
                >
                  <span className="std-day-num">{day}</span>
                </span>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
