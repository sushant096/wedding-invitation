# Design analysis

Source: `references/reference-video.mp4.mp4`  
Inspected directly (not from memory). The file is a 1080×2340 H.264 screen recording, about 23.8 seconds, captured on a Samsung phone (Android 16, UTC+5:30 metadata). It is an Instagram Reel of someone holding a second phone. The site inside that phone is `webgencyinvitations.com`.

This project reproduces the invitation website only. It does not reproduce Instagram, the recording timer, the hand, the browser chrome, or the phone bezel.

Frames were extracted at 2 fps and key moments were cropped from the inner phone screen (about 1.6s, 8.6s, 11.6s, 13.2s, 15.6s, 18.4s, and 20.2s).

## What the recording actually is

The art direction is romantic stationery: a deep wine envelope, then a warm ivory card with an architectural arch, swans, blush and burgundy roses, and burgundy calligraphy. The wording is a Nikkah / traditional introduction ceremony, not a generic Western “ceremony and cocktails” page and not a marigold-and-mandala layout. Fidelity follows that recording.

The demo copy names a couple and a real San Diego venue. Those details are sample content from the reel. This project keeps the layout and the visible ceremony structure, and puts names, the date, the venue, the map link, music, and WhatsApp in `src/config/wedding.ts` as explicit placeholders.

## Scene order and timing

| Time | What happens |
| --- | --- |
| 0.0–2.0s | Closed envelope. Deep burgundy diamond flaps with thin metallic seams. Side flaps carry embossed peonies; the lower flap carries leafy sprigs. An ivory scalloped wax seal sits at the crossing with script initials (the reel shows “G&Z”). A small speaker control sits above the seal. The play triangle on the seal in the first moments is Instagram’s overlay, not part of the site. |
| 2.0–4.5s | Idle light. The seal glows, and the embossed flowers briefly read as gold thread, then settle back into the burgundy. |
| 4.5–8.0s | Opening. The four flaps separate along the X. A warm white-gold light blooms from the center under the seal. Florals catch the light. The seal stays central, then the interior is revealed. This is one continuous motion, not a cut. |
| 8.0–11.5s | Hero card, full viewport. Ivory stone arch with vines, “Wedding Day” in script, a numeric date, two large burgundy calligraphy names with a small “&”, “Scroll down” with a chevron, two swans on water whose necks meet, rose clusters in the lower corners. A burgundy circular pause button sits at the lower right. |
| 11.5–13.0s | The scroll continues into the letter. A floral band (swans between rose sprays) sits above script names, the line “warmly invite you”, and body copy. The readable sentence is that they invite guests to celebrate as their families come together for their traditional introduction ceremony. A soft torn-paper edge leads into the countdown. |
| 13.0–15.0s | “The Celebration Begins In” in script. Large gold figures `days : hours : minutes : seconds` with small labels underneath. Then “Schedule of Events” with side flourishes. A vertical rule, time on the left, name on the right. A single deep-red rose rides the line and moves as the list scrolls. Visible events: 5 PM Guest Arrival, 6 PM Nikkah Ceremony, 7 PM Mocktail Hour, 8 PM Dinner, 9 PM Dance. |
| 15.0–17.0s | “Location” in script with a small flourish. Venue name, a date-and-time line, an address, scattered petals, an illustration of a tiled arcade building with cypress trees, then a map card and an open-in-maps control. The reel shows a real business and street address. Those are not copied. |
| 17.0–19.0s | “Dress Code”. The sentence on screen: “We kindly ask guests to adorn Rose Gold, Burgundy and Brown tones for the celebration.” Under it, six original-style fashion figures in black and burgundy gowns and suits. Floral sprigs in the corners. No names are printed under the figures. |
| 19.0–21.5s | “Confirm Your Attendance”, a short preparation line, a burgundy wax seal reading “RSVP”, an upward chevron, “Click to open”, then “Hope to see you there!” and the couple’s names. Large peonies fill the bottom corners. |
| 21.5–23.2s | A sheet titled “Confirm Your Attendance”: name field, “Will you be attending?” with accept / decline choices, “Number of Guests Attending”, and a close control. A keyboard covers the lower form. |
| ~23.5s | The closed envelope is on screen again. The reel ends there, so a labeled replay control is an explicit addition required by the brief. |

Transitions between the letter, countdown, schedule, location, dress code, and RSVP are one continuous ivory scroll with soft watercolor breaks, not separate routes.

## Visual details to keep

- Envelope color is a dark wine, darker toward the edges, with a soft highlight on the upper flap.
- Seams are thin and light, almost ivory-gold.
- The envelope seal is ivory wax, scalloped, with script initials. The RSVP seal is burgundy wax with the word RSVP in serif capitals.
- Interior ground is warm ivory, not pure white. Section breaks are ragged, like a deckled edge.
- Names are large formal calligraphy in burgundy. Section titles (“Wedding Day”, “Schedule of Events”, “Location”, “Dress Code”, “Confirm Your Attendance”, “Hope to see you there!”) are a looser copper-brown script.
- Supporting text is a small, high-contrast serif.
- Countdown numerals are gold.
- The music control is a solid burgundy circle with a white pause glyph, fixed over the card.
- Motion is slow and eased. The envelope’s gold flash loops while it is closed.

## Implementation plan

1. React, TypeScript, and Vite. Motion for the flap sequence, the light bloom, and section reveals.
2. All guest-facing copy, the ceremony timestamp, events, venue, map URL, WhatsApp number, and music path live in `src/config/wedding.ts`.
3. Full-viewport envelope with clip-path flaps, SVG embossing, and a wax-seal button. A phase lock ignores extra taps while the open animation runs.
4. The ivory invitation mounts underneath the envelope so the light opens onto the hero, then the envelope leaves.
5. Countdown uses one absolute timestamp (`ceremonyAt`, with an offset). Past and invalid dates have their own states. Event rows are data, and a tap reveals that event’s date, description, and venue. The rose follows the row nearest the middle of the screen.
6. Venue art is an original SVG. If `mapsUrl` is set, the location button opens it. If it is empty, the button explains that, and does not invent a place.
7. Dress-code figures are original SVG illustrations in the recorded palette and arrangement. Optional names stay blank unless configured.
8. RSVP validates name, attendance, and guest count, then opens WhatsApp with a prefilled message. The form states that nothing is stored on a server. Share uses the Web Share API, then copies the link. A second action shares the invitation on WhatsApp.
9. Music starts in the seal tap (a user gesture), can be paused, and a missing file does not stop the animation. Replay returns to the sealed envelope.
10. Portrait composition is the layout. Wide screens keep a centered column on an ivory or burgundy field, without a fake phone.
11. `prefers-reduced-motion` shortens the open into a fade and disables looping glow.

## Interpretations where the reel is incomplete

- Body copy under the invite line is partly covered by a finger. The visible phrase about a traditional introduction ceremony is used; anything under the finger is not invented.
- The reel’s hero date, location date, and countdown do not agree with each other. This build uses one configured timestamp for the hero, the location line, and the countdown.
- Share, WhatsApp share, and a labeled replay control are required by the brief and were not clearly readable in the reel. They use the same burgundy-and-ivory controls as the pause button.
- “Tap the seal” is added because the reel’s play icon belonged to Instagram. The seal itself is the control.
- Venue photography in the reel is a specific business. The stand-in is original SVG art, with an optional local image path.
