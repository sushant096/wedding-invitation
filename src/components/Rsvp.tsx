import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { wedding } from "../config/wedding";
import { buildCalendarIcs, buildWhatsappUrl, fillTemplate } from "../lib/weddingUtils";
import { ReferencePanel } from "./ReferencePanel";

type Attendance = "" | "accept" | "decline";

export function Rsvp() {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <ReferencePanel
        id="rsvp"
        src="/assets/rsvp.jpg"
        alt="RSVP section"
        className="panel-rsvp"
      >
        <button
          type="button"
          className="rsvp-hit"
          onClick={() => setOpen(true)}
          data-testid="rsvp-open"
          aria-label="Open the RSVP form"
        />
      </ReferencePanel>
      {open ? <RsvpDialog titleId={titleId} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function RsvpDialog({ titleId, onClose }: { titleId: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("");
  const [guests, setGuests] = useState("1");
  const [errors, setErrors] = useState<string[]>([]);
  const [readyHref, setReadyHref] = useState<string | null>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("[data-testid=rsvp-name]")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  function validate(): string | null {
    const next: string[] = [];
    if (!name.trim()) next.push("Please enter your name.");
    if (!attendance) next.push("Please choose whether you will attend.");
    const count = Number(guests);
    if (!Number.isFinite(count) || count < 0) next.push("Enter the number of guests.");
    if (attendance === "accept" && count < 1) next.push("Include at least one guest if you are attending.");
    setErrors(next);
    if (next.length) return null;
    const phoneUrl = buildWhatsappUrl(
      wedding.rsvp.whatsappNumber,
      fillTemplate(wedding.rsvp.messageTemplate, {
        name: name.trim(),
        attendance:
          attendance === "accept"
            ? "I accept with pleasure."
            : "I regret that I cannot attend.",
        guests: String(count),
      }),
    );
    if (!phoneUrl) {
      setErrors([
        "This form opens WhatsApp. Add rsvp.whatsappNumber in src/config/wedding.ts before replies can be delivered.",
      ]);
      return null;
    }
    return phoneUrl;
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const href = validate();
    setReadyHref(href);
    if (href) window.open(href, "_blank", "noopener,noreferrer");
  }

  function downloadCalendar() {
    const ics = buildCalendarIcs({
      title: `Wedding of ${wedding.partnerOne} & ${wedding.partnerTwo}`,
      iso: wedding.ceremonyAt,
      description: wedding.invitationBody,
      location: [wedding.venue.name, ...wedding.venue.addressLines].join(", "),
    });
    if (!ics) return;
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close RSVP">
          ×
        </button>
        <h3 id={titleId} className="script-title modal-title">
          {wedding.rsvp.title}
        </h3>
        <p className="rsvp-channel">
          Sending opens WhatsApp with your reply. Nothing is stored on this website.
        </p>
        <form onSubmit={onSubmit} noValidate data-testid="rsvp-form">
          <label>
            Your name
            <input
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              data-testid="rsvp-name"
            />
          </label>
          <fieldset>
            <legend>Will you be attending?</legend>
            <label className="choice">
              <input
                type="radio"
                name="attendance"
                value="accept"
                checked={attendance === "accept"}
                onChange={() => setAttendance("accept")}
              />
              Accepts with pleasure
            </label>
            <label className="choice">
              <input
                type="radio"
                name="attendance"
                value="decline"
                checked={attendance === "decline"}
                onChange={() => setAttendance("decline")}
              />
              Declines with regret
            </label>
          </fieldset>
          <label>
            Number of Guests Attending
            <input
              name="guests"
              inputMode="numeric"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              data-testid="rsvp-guests"
            />
          </label>
          {errors.length > 0 ? (
            <ul className="form-errors" data-testid="rsvp-errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
          <button type="submit" className="submit-btn" data-testid="rsvp-submit">
            Send on WhatsApp
          </button>
          {readyHref ? (
            <p className="rsvp-channel" data-testid="rsvp-ready">
              WhatsApp should open with your reply. If it did not,{" "}
              <a href={readyHref} target="_blank" rel="noopener noreferrer">
                open the message
              </a>
              .
            </p>
          ) : null}
        </form>
        <div className="modal-actions">
          <button type="button" onClick={downloadCalendar}>
            Add to calendar
          </button>
        </div>
      </div>
    </div>
  );
}
