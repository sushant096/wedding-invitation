/**
 * Reference-matched demo content from references/reference-video.mp4.mp4.
 * Edit for your own wedding when you are ready to personalize.
 */

export type PartyAttire = "gown" | "suit" | "tuxedo";

export type WeddingEvent = {
  id: string;
  name: string;
  date: string;
  time: string;
  description: string;
  venue: string;
};

export type PartyMember = {
  name: string;
  attire: PartyAttire;
  color: string;
};

export const wedding = {
  partnerOne: "Gabriella",
  partnerTwo: "Zachary",
  monogram: "G&Z",

  /** Matches the reference location line (Friday, November 20, 2026 at 5:00 PM). */
  ceremonyAt: "2026-11-20T17:00:00-08:00",
  timeZone: "America/Los_Angeles",
  timezoneLabel: "Pacific Time",

  /** Shown on the hero panel (reference uses 10.10.26). */
  heroDateLabel: "10.10.26",
  heroEyebrow: "Wedding Day",
  invitationLead: "warmly invite you",
  invitationBody:
    "to celebrate with them as their families come together for their traditional introduction ceremony.",

  countdownTitle: "The Celebration Begins In",
  eventsTitle: "Schedule of Events",
  events: [
    {
      id: "arrival",
      name: "Guest Arrival",
      date: "November 20, 2026",
      time: "5 PM",
      description: "Guests are welcomed and shown to their seats.",
      venue: "Brick",
    },
    {
      id: "ceremony",
      name: "Nikkah Ceremony",
      date: "November 20, 2026",
      time: "6 PM",
      description: "The ceremony begins. Please be seated beforehand.",
      venue: "Brick",
    },
    {
      id: "mocktails",
      name: "Mocktail Hour",
      date: "November 20, 2026",
      time: "7 PM",
      description: "A pause for greetings and refreshments.",
      venue: "Brick",
    },
    {
      id: "dinner",
      name: "Dinner",
      date: "November 20, 2026",
      time: "8 PM",
      description: "Dinner is served.",
      venue: "Brick",
    },
    {
      id: "dance",
      name: "Dance",
      date: "November 20, 2026",
      time: "9 PM",
      description: "The evening opens onto the dance floor.",
      venue: "Brick",
    },
  ] satisfies WeddingEvent[],

  venue: {
    title: "Location",
    name: "Brick",
    mapsUrl: "https://maps.google.com/?q=2863+Historic+Decatur+Rd+San+Diego+CA+92106",
    imageSrc: "/assets/location.jpg",
    addressLines: [
      "2863 Historic Decatur Rd",
      "San Diego, CA 92106",
      "United States",
    ],
  },

  dressCode: {
    title: "Dress Code",
    message:
      "We kindly ask guests to adorn Rose Gold, Burgundy and Brown tones for the celebration.",
  },

  party: [
    { name: "", attire: "gown", color: "#1b1b1b" },
    { name: "", attire: "suit", color: "#1c1c1c" },
    { name: "", attire: "gown", color: "#7a2433" },
    { name: "", attire: "tuxedo", color: "#6b1c2c" },
    { name: "", attire: "gown", color: "#8d3144" },
    { name: "", attire: "suit", color: "#242424" },
  ] satisfies PartyMember[],

  rsvp: {
    title: "Confirm Your Attendance",
    intro:
      "To help us prepare for a joyful celebration, kindly confirm your attendance.",
    closing: "Hope to see you there!",
    whatsappNumber: "",
    messageTemplate:
      "Hello, this is {name}. {attendance} Number of guests attending: {guests}.",
  },

  musicSrc: "/audio/invitation.mp3",
  shareText: "You are invited to our wedding celebration.",
} as const;
