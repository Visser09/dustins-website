# Show automation plan

The public site should not expose a show-management page. The previous `/admin` page was only a client-side preview, not a secure editor, so it has been removed.

## Recommended easiest setup

Use a private Google Sheet as the show calendar and connect it to a dedicated texting workflow:

1. Dustin texts a dedicated number through Twilio using one structured line:
   `2026-10-17 | Kingston, ON | The Grand Theatre | 8:00 PM | https://tickets.example.com`
2. Make or Zapier receives the text, validates the five fields, and adds a row to the private sheet.
3. The public site reads only published rows from a server-side endpoint. It sorts by date and hides each show after the full calendar day following the event.
4. The Twilio webhook is protected with a secret. No token or sheet credentials are ever sent to the browser.

This is easier to maintain than a custom admin dashboard and keeps the editing workflow off the public website. It requires choosing the Google account, texting provider, and automation account before wiring the live connections.

## Current source contract

Until the external source is connected, public records remain in `data/shows.ts`. The record shape and expiry logic are already separated so the data reader can be replaced without redesigning the public page.

## Alternatives

- A private authenticated admin dashboard is possible, but adds login, hosting, and database work.
- A GitHub bot that edits `data/shows.ts` can work, but is less convenient for non-technical updates and requires careful repository permissions.
