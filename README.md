# Dustin Visser — comedian website

Mobile-first public site for Ontario stand-up comic Dustin Visser, built with Next.js/Vinext and ready for Vercel deployment.

## Show data workflow

Public show records live in `data/shows.ts`. Each record uses a stable id, an ISO date (`YYYY-MM-DD`), local show time, city/region, venue, and ticket URL. The homepage sorts by date and automatically keeps a show visible through the next calendar day, then removes it from the public list.

There is also an admin-ready `/admin` page that parses a simple line:

`YYYY-MM-DD | City, ON | Venue | Time | Ticket URL`

The next step is to connect that parser to a protected API route or SMS/webhook provider so a message can validate and append a record to the data store. Keep auth and persistence outside the public page; the current source file makes the contract easy to swap for a database later.

## Local development

```bash
npm run dev
```

The supplied portrait is stored at `public/dustin-visser.png` and is used as the homepage hero asset.
