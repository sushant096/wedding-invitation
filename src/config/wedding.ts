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

export type WeddingVenueEvent = {
  name: string;
  note?: string;
};

export type WeddingVenuePlace = {
  id: string;
  name: string;
  addressLines: string[];
  mapsUrl: string;
  events: WeddingVenueEvent[];
};

const venueGoldenTulipFull = "Hotel Golden Tulip, Hari Nagar, New Delhi";
const venueStarlandFull = "Starland Banquet Hall, Mayapuri, New Delhi";

export const wedding = {
  partnerOne: "Akansha",
  partnerTwo: "Sushant",
  /** Initials pressed into the envelope seal. */
  monogram: "S&A",

  /**
   * Main wedding moment (barat arrival). Calendar download and venue time use this.
   */
  ceremonyAt: "2026-11-26T21:00:00+05:30",
  /** Countdown targets the first celebration (Mehndi). */
  celebrationStartsAt: "2026-11-25T15:00:00+05:30",
  timeZone: "Asia/Kolkata",
  /** First-page hero line (swans slide). */
  heroHeadline: "Sushant Weds Akansha",
  heroHashtag: "#SushiKiKanshi",
  /** Looping arch + swans scene (from your Swans2 reference). */
  heroVideoSrc: "/video/swans-hero.mp4",
  heroVideoPoster: "/video/swans-hero-poster.jpg",
  host: {
    nameLine: "Smt. Jogindra Devi Sood W/o Late. Sh. Raghu Nath Sood",
    inviteLines: [
      "Cordially invite you to the auspicious occasion",
      "of the wedding celebrations of her grandson",
    ],
  },
  families: {
    bride: {
      displayName: "Akansha",
      parentsLine: "D/o Sh. Lalit Semwal & Late Smt. Purnima Semwal",
      grandparentsLine: "Grand D/o Late Smt. Laxmi Devi & Late Shri. B.R. Semwal",
    },
    groom: {
      displayName: "Sushant",
      parentsLine: "S/o Smt. Sudha Sood & Shri. Devinder Sood",
      grandparentsLine: "",
    },
  },

  saveTheDate: {
    title: "Save The Dates",
    monthLabel: "NOVEMBER 2026",
    highlightDays: [25, 26] as number[],
  },

  countdownTitle: "The Celebration Begins In",
  eventsTitle: "Events",
  events: [
    {
      id: "mehndi",
      name: "Mehandi",
      date: "Wednesday, 25 November 2026",
      time: "3 PM onwards",
      description: "An afternoon of henna, colour, music, and celebration.",
      venue: venueGoldenTulipFull,
    },
    {
      id: "ring",
      name: "Ring Ceremony",
      date: "Wednesday, 25 November 2026",
      time: "7:30 PM onwards",
      description: "Join us as we exchange rings with our families and friends.",
      venue: venueStarlandFull,
    },
    {
      id: "haldi",
      name: "Haldi",
      date: "Thursday, 26 November 2026",
      time: "10:00 AM onwards",
      description: "A joyful morning of haldi blessings and laughter.",
      venue: venueGoldenTulipFull,
    },
    {
      id: "saand",
      name: "Saand",
      date: "Thursday, 26 November 2026",
      time: "12:00 noon onwards",
      description: "Join us for the Saand ceremony.",
      venue: venueGoldenTulipFull,
    },
    {
      id: "sehrabandi",
      name: "Sehrabandi",
      date: "Thursday, 26 November 2026",
      time: "6:30 PM onwards",
      description: "Sehrabandi blessings before the baraat.",
      venue: venueGoldenTulipFull,
    },
    {
      id: "barat-departure",
      name: "Departure of Baraat",
      date: "Thursday, 26 November 2026",
      time: "7:30 PM",
      description: "The baraat departs from Hotel Golden Tulip for Starland Banquet Hall.",
      venue: venueGoldenTulipFull,
    },
    {
      id: "wedding-ceremony",
      name: "Wedding Ceremony",
      date: "Thursday, 26 November 2026",
      time: "9:00 PM",
      description: "Wedding ceremony and celebrations with family and friends.",
      venue: venueStarlandFull,
    },
  ] satisfies WeddingEvent[],

  venues: {
    title: "Venues",
    dateLine: "25–26 November 2026",
    places: [
      {
        id: "golden-tulip",
        name: "Hotel Golden Tulip",
        addressLines: ["Hari Nagar", "New Delhi", "India"],
        mapsUrl:
          "https://www.google.com/maps/search/?api=1&query=Hotel+Golden+Tulip+Hari+Nagar+New+Delhi",
        events: [
          { name: "Mehandi" },
          { name: "Haldi" },
          { name: "Saand" },
          { name: "Sehrabandi" },
          {
            name: "Departure of Baraat",
            note: "Baraat departs Golden Tulip at 7:30 PM for Starland.",
          },
        ],
      },
      {
        id: "starland",
        name: "Starland Banquet Hall",
        addressLines: ["Mayapuri", "New Delhi", "India"],
        mapsUrl:
          "https://www.google.com/maps/search/?api=1&query=Starland+Banquet+Hall+Mayapuri+New+Delhi",
        events: [{ name: "Ring Ceremony" }, { name: "Wedding Ceremony" }],
      },
    ] satisfies WeddingVenuePlace[],
  },

  rsvp: {
    title: "R.S.V.P",
    contacts: [
      { name: "Deepansh Sood", phone: "9711842800" },
      { name: "Shailendar Sood", phone: "9810271275" },
      { name: "BK Sood", phone: "9418155850" },
      { name: "Anil Sood", phone: "8527622635" },
    ],
    complimentsLine: "Best Compliments From All relatives & Friends",
    familyFlowerLabel: "Family flower",
    familyFlowerName: "Avyaan Sood",
  },

  /** Drop an MP3 at public/audio/invitation.mp3 or change this path. */
  musicSrc: "/audio/invitation.mp3",
  shareText: "You are invited to our wedding celebration.",
} as const;
