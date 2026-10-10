# Wedding invitation

A mobile-first cinematic invitation: a burgundy envelope opens into an ivory card with a countdown, schedule, venue, dress code, and RSVP. The sequence follows the supplied reference recording. Personal details are placeholders in one config file.

See `DESIGN_ANALYSIS.md` for what the recording actually shows and which details were interpreted.

## Customize

Edit `src/config/wedding.ts`.

- `partnerOne`, `partnerTwo`, and `monogram` — names and the envelope initials
- `ceremonyAt` and `timeZone` — one timestamp drives the hero date, the location line, the countdown, and the calendar file
- `events` — each row has a name, date, time, description, and venue
- `venue.mapsUrl` — a Google Maps link. The location button opens this URL only. Leave it empty until you have the real link
- `venue.imageSrc` — optional photo, for example `/images/venue.jpg` placed in `public/images`
- `rsvp.whatsappNumber` — country code plus number, digits only. The RSVP form opens WhatsApp with the guest’s reply. It does not submit to a server
- `musicSrc` — default `/audio/invitation.mp3`. Put your file at `public/audio/invitation.mp3`

If the music file is missing, the pause control shows as unavailable and the animation still runs. Browsers block autoplay, so music starts when the guest taps the seal.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## GitHub

This folder is already a git repository. From the project directory:

```bash
git add .
git commit -m "Add the cinematic wedding invitation"
git branch -M main
git remote add origin https://github.com/YOUR_USER/YOUR_REPO.git
git push -u origin HEAD
```

Do not commit a private guest list or a filled-in phone number if this repository is public. `references/frames` and `references/crops` are gitignored working files from the design pass.

## Netlify

1. Push the repository to GitHub.
2. In Netlify, choose **Add new site** → **Import an existing project**.
3. Build command: `npm run build`
4. Publish directory: `dist`

`netlify.toml` already sets those values and redirects every path to `index.html`.

You can also deploy the `dist` folder by drag-and-drop after `npm run build`.

## Notes

- Wide screens keep the portrait card centered. There is no fake phone frame.
- `prefers-reduced-motion` shortens the envelope opening to a fade.
- Replay, at the bottom of the card, returns to the sealed envelope.
