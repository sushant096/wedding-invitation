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

export type PartyAttire = "gown" | "suit" | "tuxedo";

export type WeddingEvent = {
  id: string;
  name: string;
  /** Shown when the guest opens the row. Can differ from the ceremony date. */
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
  partnerOne: "Bride",
  partnerTwo: "Groom",
  /** Initials pressed into the ivory envelope seal. */
  monogram: "B&G",

  /**
   * Absolute ceremony time. The offset fixes the timezone.
   * Hero date, location line, countdown, and calendar file all use this value.
   * Placeholder only — change it.
   */
  ceremonyAt: "2027-04-17T17:00:00+05:30",
  timeZone: "Asia/Kolkata",
  timezoneLabel: "UTC+05:30",

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
      date: "17 April 2027",
      time: "5 PM",
      description: "Guests are welcomed and shown to their seats.",
      venue: "Venue Name",
    },
    {
      id: "ceremony",
      name: "Nikkah Ceremony",
      date: "17 April 2027",
      time: "6 PM",
      description: "The ceremony begins. Please be seated beforehand.",
      venue: "Venue Name",
    },
    {
      id: "mocktails",
      name: "Mocktail Hour",
      date: "17 April 2027",
      time: "7 PM",
      description: "A pause for greetings and refreshments.",
      venue: "Venue Name",
    },
    {
      id: "dinner",
      name: "Dinner",
      date: "17 April 2027",
      time: "8 PM",
      description: "Dinner is served.",
      venue: "Venue Name",
    },
    {
      id: "dance",
      name: "Dance",
      date: "17 April 2027",
      time: "9 PM",
      description: "The evening opens onto the dance floor.",
      venue: "Venue Name",
    },
  ] satisfies WeddingEvent[],

  venue: {
    title: "Location",
    name: "Venue Name",
    /**
     * Leave empty until you have a real Google Maps link, for example
     * https://maps.google.com/?q=Your+Venue
     * The button opens this URL and no other place.
     */
    mapsUrl: "",
    /**
     * Optional local photograph. Put a file in public/images and set
     * imageSrc to "/images/venue.jpg". An original illustration is used
     * when this is empty or the file fails to load.
     */
    imageSrc: "",
    addressLines: ["Street address", "City, Region", "Country"],
  },

  dressCode: {
    title: "Dress Code",
    message:
      "We kindly ask guests to adorn Rose Gold, Burgundy and Brown tones for the celebration.",
  },

  /**
   * Leave name as "" to match the reference, which shows the group without captions.
   * Fill names in if you want a labeled wedding party.
   */
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
    /**
     * Digits only, with country code and no plus sign.
     * Example shape: 9198XXXXXXXX. Leave empty until you are ready.
     */
    whatsappNumber: "",
    messageTemplate:
      "Hello, this is {name}. {attendance} Number of guests attending: {guests}.",
  },

  /** Drop an MP3 at public/audio/invitation.mp3 or change this path. */
  musicSrc: "/audio/invitation.mp3",
  shareText: "You are invited to our wedding celebration.",
} as const;
