# Handoff: aivet.work (Career Co-Pilot 360)

Read this first. It is written for whoever picks this project up next, human or AI,
on any account.

## What this is

Career Co-Pilot 360, a career coaching and guidance service. It is Raj's venture
and lives on the apex domain that also hosts his personal portfolio on a subdomain.

- **Live:** https://aivet.work and https://www.aivet.work
- **Repo:** `TinyAnts/career-copilot-360`, production branch `main`
- **Hosting:** Cloudflare Pages, auto-deploys on push to `main`
- **Owner contact:** `ai.vet.ml@gmail.com`

## Stack

Vite + React + TypeScript + Tailwind v4, shadcn/ui, Framer Motion.

```bash
npm install && npm run dev
npm run build     # outputs to dist/
```

Cloudflare build settings: preset **React (Vite)**, command `npm run build`,
output `dist`.

## Domain notes

Both the apex `aivet.work` and `www.aivet.work` are attached as custom domains on
this Pages project. `raj.aivet.work` is a **different** Pages project
(`TinyAnts/raj-portfolio`) on the same zone.

When this domain was first set up it appeared broken for a day on devices that had
already cached the registrar's parking page, including phones on mobile data. It
was DNS caching, not a misconfiguration. The `*.pages.dev` URL working while the
custom domain does not is the signature of that problem. Switching a machine's DNS
to `1.1.1.1` / `1.0.0.1` clears it immediately; otherwise it resolves on its own.

## Booking

Consultations currently go through a **Google Form**:

```ts
const BOOKING_FORM = "https://forms.gle/FjFZ1nFMvuFY1MyB9";
```

There is a planned migration to **Setmore**, mirroring what is already live on
`poland.oliwiakonieczna.info` (see that repo's HANDOFF.md for how that flow works).
It is waiting on Raj defining his services and pricing, and would be set up under
`ai.vet.ml@gmail.com`. When it happens, replace `BOOKING_FORM` with the Setmore
booking URL and update any copy describing the form.

## Success stories are placeholders and must stay hidden

```ts
const SHOW_TESTIMONIALS = false;
```

The success stories on this site are **invented placeholder content**. They must not
be published as real client outcomes. Preview them in development by appending
`?demo-testimonials` to the URL. Only turn the flag on when real, attributed client
stories exist and the clients have agreed.

## SEO

Standard pack: canonical, absolute Open Graph tags, `og:site_name`, `theme-color`,
apple touch icon, JSON-LD graph including `ProfessionalService`, `robots.txt`,
`sitemap.xml`, and a branded `404.html` served automatically by Cloudflare Pages.

## House rules (apply to every site in this family)

These are the owner's standing preferences. Breaking them means redoing work.

1. **Never use em-dashes or en-dashes (the long dash characters) in site copy.**
   The owner considers them a tell that text was written by AI. Use commas,
   colons, semicolons, or the middot separator instead. Check with a search for
   the long dash characters before shipping.
2. **No invented testimonials, reviews, or endorsements presented as real.**
   Placeholder social proof stays behind a flag that is off in production.
3. **Free tiers only.** No paid subscriptions, no Stripe, no payment processors,
   nothing that would require registering a business.
4. **Write like a person.** Short punchy fragments stacked together read as
   machine-written. Prefer plain sentences in the first person.
5. **Preview before shipping.** Build, screenshot, and show the owner a preview.
   The owner reviews visually and gives precise feedback.
6. **Forms and interactive elements must stay accessible** (labels, focus states,
   reduced-motion fallbacks for animations).

## How deployment works

Every site follows the same path:

```
git push  ->  GitHub (TinyAnts/<repo>)  ->  Cloudflare Pages auto-build  ->  live domain
```

Cloudflare Pages watches the production branch of the GitHub repo and rebuilds on
every push. Nothing is uploaded by hand. Cloudflare account id:
`3869409b5f0d6bec2fa88ebf6106b5f1`.

If a push lands on GitHub but the site does not change, the Pages project has lost
its Git connection. Fix it at Cloudflare dashboard -> Workers & Pages -> the project
-> Settings -> Build -> Git repository -> Connect. If the repo is missing from the
dropdown, grant the Cloudflare Pages GitHub App access to it at
github.com/settings/installations. This has happened before on this account.

Custom domains are managed in the Pages project under Custom domains. DNS is
already on Cloudflare nameservers, so adding a subdomain there creates the DNS
record automatically. Give it a few minutes and expect browser/ISP DNS caching to
lag; testing in incognito does not bypass an OS-level DNS cache.

## The other sites in this family

| Repo | Live at | Stack |
|---|---|---|
| `TinyAnts/oliwia-portfolio` | oliwiakonieczna.info | static HTML, no build |
| `TinyAnts/oliwia-from-poland` | poland.oliwiakonieczna.info | Vite + React + TS |
| `TinyAnts/oliwia-yoga` | yoga.oliwiakonieczna.info | Vite + React + TS |
| `TinyAnts/career-copilot-360` | aivet.work | Vite + React + TS |
| `TinyAnts/raj-portfolio` | raj.aivet.work | Vite + React + TS |
