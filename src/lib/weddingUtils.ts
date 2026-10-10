export type Remaining = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  elapsed: boolean;
};

export function parseInstant(iso: string): number | null {
  const value = Date.parse(iso);
  return Number.isNaN(value) ? null : value;
}

export function getRemaining(targetMs: number, nowMs: number): Remaining {
  const diff = targetMs - nowMs;
  const elapsed = diff <= 0;
  const totalSeconds = Math.floor(Math.max(0, diff) / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    elapsed,
  };
}

export function pad2(value: number): string {
  return String(value).padStart(2, "0");
}

export function formatHeroDate(iso: string, timeZone: string): string | null {
  const instant = parseInstant(iso);
  if (instant === null) return null;
  const parts = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone,
  }).formatToParts(new Date(instant));
  const pick = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  return `${pick("day")}.${pick("month")}.${pick("year")}`;
}

export function formatLongWhen(iso: string, timeZone: string): string | null {
  const instant = parseInstant(iso);
  if (instant === null) return null;
  const date = new Date(instant);
  const day = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone,
  }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone,
  }).format(date);
  return `${day} at ${time}`;
}

export function buildWhatsappUrl(phone: string, message: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function fillTemplate(
  template: string,
  values: Record<string, string>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

export function buildCalendarIcs(input: {
  title: string;
  iso: string;
  description: string;
  location: string;
}): string | null {
  const start = parseInstant(input.iso);
  if (start === null) return null;
  const end = start + 5 * 60 * 60 * 1000;
  const stamp = toIcsUtc(Date.now());
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SUMMARY:${escapeIcs(input.title)}`,
    `DESCRIPTION:${escapeIcs(input.description)}`,
    `LOCATION:${escapeIcs(input.location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return body;
}

function toIcsUtc(ms: number): string {
  const date = new Date(ms);
  const y = date.getUTCFullYear();
  const m = pad2(date.getUTCMonth() + 1);
  const d = pad2(date.getUTCDate());
  const hh = pad2(date.getUTCHours());
  const mm = pad2(date.getUTCMinutes());
  const ss = pad2(date.getUTCSeconds());
  return `${y}${m}${d}T${hh}${mm}${ss}Z`;
}

function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}
