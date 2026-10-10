/**
 * Everything a guest can read or follow lives here.
 * Replace every placeholder before you share the invitation.
 * Do not put a real address, map pin, or phone number in this file
 * until you mean to publish them.
 *
 * Sample event titles follow the structure of the reference recording
 * (arrival, ceremony, mocktails, dinner, dance). They are not a record
 * of your wedding until you edit them.
 */

export type WeddingEvent = {
  id: string;
  name: string;
  /** Shown when the guest opens the row. Can differ from the ceremony date. */
  date: string;
  time: string;
  description: string;
  venue: string;
};

export const wedding = {
  partnerOne: "Akansha",
  partnerTwo: "Sushant",
  /** Initials pressed into the envelope seal. */
  monogram: "S&A",

  /**
   * Main wedding moment (barat arrival). Calendar download and venue time use this.
   */
  ceremonyAt: "2026-11-26T20:00:00+05:30",
  /** Countdown targets the first celebration (Mehndi). */
  celebrationStartsAt: "2026-11-25T15:00:00+05:30",
  timeZone: "Asia/Kolkata",
  heroEyebrow: "Wedding Celebrations",
  /** Shown under the hero eyebrow when set; otherwise derived from ceremonyAt. */
  heroDateDisplay: "25-26 Nov 2026",
  /** Looping arch + swans scene (from your Swans2 reference). */
  heroVideoSrc: "/video/swans-hero.mp4",
  heroVideoPoster: "/video/swans-hero-poster.jpg",
  /** Three-line verse on the parchment panel (Sacred Garden style). */
  heroVerse: ["Two Souls", "One destiny", "A lifetime written in love"],
  letterSalutation: "Dear Friends and Family",
  invitationBody:
    "Join us for an evening of love, laughter, blessings, and unforgettable memories as we begin our forever.",

  countdownTitle: "The Celebration Begins In",
  eventsTitle: "Schedule of Events",
  events: [
    {
      id: "mehndi",
      name: "Mehndi",
      date: "25 November 2026",
      time: "3 PM onwards",
      description: "An afternoon of henna, colour, music, and celebration.",
      venue: "Venue details on your invitation",
    },
    {
      id: "ring",
      name: "Ring Ceremony",
      date: "25 November 2026",
      time: "7 PM onwards",
      description: "Join us as we exchange rings with our families and friends.",
      venue: "Starland Banquet Hall, Mayapuri, New Delhi",
    },
    {
      id: "haldi",
      name: "Haldi",
      date: "26 November 2026",
      time: "11 AM onwards",
      description: "A joyful morning of haldi blessings and laughter.",
      venue: "Venue details on your invitation",
    },
    {
      id: "lunch",
      name: "Lunch",
      date: "26 November 2026",
      time: "2 PM onwards",
      description: "A relaxed lunch with loved ones before the evening festivities.",
      venue: "Venue details on your invitation",
    },
    {
      id: "barat-departure",
      name: "Departure of Barat",
      date: "26 November 2026",
      time: "7 PM onwards",
      description: "The barat sets out for the wedding venue.",
      venue: "As shared with invited guests",
    },
    {
      id: "barat-arrival",
      name: "Arrival of Barat",
      date: "26 November 2026",
      time: "8 PM",
      description: "Welcome the barat and begin the wedding celebrations.",
      venue: "Starland Banquet Hall, Mayapuri, New Delhi",
    },
  ] satisfies WeddingEvent[],

  venue: {
    title: "Location",
    name: "Starland Banquet Hall",
    dateLine: "25–26 November 2026",
    /**
     * Opens in Google Maps. Update if you prefer a pinned link.
     */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Starland+Banquet+Hall+Mayapuri+New+Delhi",
    imageSrc: "",
    addressLines: ["Mayapuri", "New Delhi", "India"],
  },

  closingMessage: "Hope to see you there!",

  /** Drop an MP3 at public/audio/invitation.mp3 or change this path. */
  musicSrc: "/audio/invitation.mp3",
  shareText: "You are invited to our wedding celebration.",
} as const;
