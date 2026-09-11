"use client";

import Link from "next/link";
import { ArrowLeft, Check, Clipboard, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

const example = "2026-10-17 | Kingston, ON | The Grand Theatre | 8:00 PM | https://tickets.example.com";

export default function ShowAdminPage() {
  const [text, setText] = useState(example);
  const parsed = useMemo(() => {
    const [date = "", location = "", venue = "", time = "", ticketUrl = ""] = text.split("|").map((part) => part.trim());
    const [city = "", region = ""] = location.split(",").map((part) => part.trim());
    return { date, city, region, venue, time, ticketUrl, valid: Boolean(date.match(/^\d{4}-\d{2}-\d{2}$/) && city && venue && time && ticketUrl.startsWith("http")) };
  }, [text]);

  return (
    <main className="admin-shell">
      <header className="admin-header"><Link href="/" className="wordmark"><span className="wordmark-mark">DV</span><span>Dustin Visser</span></Link><Link href="/" className="admin-back"><ArrowLeft size={16} /> Back to site</Link></header>
      <section className="admin-content">
        <p className="eyebrow"><span className="eyebrow-dot" /> Admin-ready show workflow</p>
        <h1>Add a show<br /><em>in one line.</em></h1>
        <p className="admin-lede">This lightweight updater turns a structured text message into the show record the site expects. Connect it to a form, SMS webhook, or automation later without changing the public page.</p>
        <div className="admin-grid">
          <section className="admin-panel"><label htmlFor="show-line">Paste show details</label><textarea id="show-line" value={text} onChange={(event) => setText(event.target.value)} spellCheck={false} /><p className="admin-hint">Format: <code>YYYY-MM-DD | City, ON | Venue | Time | Ticket URL</code></p><button className="button button-dark" type="button" onClick={() => navigator.clipboard?.writeText(text)}><Clipboard size={16} /> Copy line</button></section>
          <section className="admin-panel preview-panel"><div className="preview-heading"><span>Preview record</span>{parsed.valid ? <span className="valid-badge"><Check size={13} /> Ready</span> : <span className="invalid-badge">Needs details</span>}</div>{parsed.valid ? <div className="preview-card"><div className="preview-date"><span>{parsed.date.slice(5, 7)}</span><strong>{parsed.date.slice(8, 10)}</strong></div><div><p>{parsed.city}, {parsed.region}</p><h2>{parsed.venue}</h2><span>{parsed.time}</span></div><a href={parsed.ticketUrl} target="_blank" rel="noreferrer" aria-label="Open ticket URL"><ExternalLink size={17} /></a></div> : <p className="preview-empty">Complete the line on the left to see a normalized show card here.</p>}</section>
        </div>
        <div className="admin-notes"><h2>How the live version will work</h2><div className="admin-note-list"><div><span>01</span><p><strong>Send one structured line.</strong><br />Dustin or a team member sends the date, location, venue, time, and ticket link.</p></div><div><span>02</span><p><strong>Normalize and save.</strong><br />A small API route validates the line and writes it to the show data store.</p></div><div><span>03</span><p><strong>Let the calendar stay fresh.</strong><br />The public list sorts by date and hides each show after the next calendar day.</p></div></div></div>
      </section>
    </main>
  );
}
