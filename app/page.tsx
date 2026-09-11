"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, Menu, Ticket, X } from "lucide-react";
import { useState } from "react";
import { formatShowParts, getUpcomingShows, type Show } from "../data/shows";

const instagramUrl = "https://www.instagram.com/dustin.visser/?hl=en";
const tourInstagramUrl = "https://www.instagram.com/smalltownbiglaughs/?hl=en";

function InstagramIcon({ size = 17 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" /></svg>;
}

function ShowRow({ show }: { show: Show }) {
  const date = formatShowParts(show.date);
  return (
    <article className="show-row">
      <div className="show-date" aria-label={`${date.month} ${date.day}, ${date.year}`}>
        <span>{date.month}</span><strong>{date.day}</strong><small>{date.year}</small>
      </div>
      <div className="show-place"><p>{show.city}, {show.region}</p><h3>{show.venue}</h3><span>{show.tour ?? "Live stand-up"}</span></div>
      <div className="show-time"><CalendarDays size={16} /><span>{show.time}</span></div>
      <a className="ticket-link" href={show.ticketUrl} target="_blank" rel="noreferrer"><Ticket size={15} /><span>Tickets</span><ArrowUpRight size={15} /></a>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const upcomingShows = getUpcomingShows();
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="#top" onClick={closeMenu} aria-label="Dustin Visser home"><span className="site-brand-mark">DV</span><span className="site-brand-name">Dustin Visser</span></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#shows" onClick={closeMenu}>Shows / Tickets</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact / Booking</a><a className="social-nav-link" href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}><InstagramIcon /><span>@dustin.visser</span></a><a className="social-nav-link" href={tourInstagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}><InstagramIcon /><span>@smalltownbiglaughs</span></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-portrait"><div className="portrait-glow" /><Image src="/dustin-visser.png" alt="Dustin Visser performing stand-up with a microphone" fill priority sizes="(max-width: 720px) 92vw, 48vw" className="hero-photo" /></div>
        <div className="hero-lockup"><p className="hero-kicker">Ontario · Stand-up comedy</p><h1><span>DUSTIN</span><span>VISSER</span></h1><div className="hero-rule" /><p className="hero-description">A sharp, grounded comic with a knack for finding the strange in everyday life.</p></div>
      </section>

      <section className="contact-band section-pad"><div className="mailing-card"><p className="section-kicker">Stay up to date</p><h2>Tell me where to perform by joining my email list.</h2><form className="mailing-form" onSubmit={(event) => { event.preventDefault(); }}><label htmlFor="mailing-email">Email <span>(required)</span></label><input id="mailing-email" name="email" type="email" placeholder="you@example.com" required /><label htmlFor="mailing-city">City <span>(required)</span></label><input id="mailing-city" name="city" type="text" placeholder="Your city" required /><label htmlFor="mailing-region">State / Country <span>(required)</span></label><input id="mailing-region" name="region" type="text" placeholder="ON, Canada" required /><button className="gold-button" type="submit">Submit <ArrowUpRight size={16} /></button></form></div></section>

      <section className="shows section-pad" id="shows"><div className="section-heading"><p className="section-kicker">01 / See Dustin live</p><h2>Upcoming dates</h2><p className="section-note">All current public dates, listed in order. Ticket links go directly to the event listing.</p></div><div className="show-list">{upcomingShows.length ? upcomingShows.map((show) => <ShowRow key={show.id} show={show} />) : <p className="empty-shows">New dates coming soon.</p>}</div></section>

      <section className="about section-pad" id="about"><div className="section-heading"><p className="section-kicker">02 / About</p><h2>Quietly<br /><span>observant.</span></h2></div><div className="about-copy"><p>Dustin Visser is an Ontario stand-up comedian bringing a calm point of view and a precise sense of timing to rooms across the province and beyond.</p><p>He performs on club bills, theatre shows, festivals, and the <a href={tourInstagramUrl} target="_blank" rel="noreferrer">Small Town, Big Laughs</a> tour.</p><a className="inline-link" href={instagramUrl} target="_blank" rel="noreferrer">Follow @dustin.visser <InstagramIcon size={15} /></a></div></section>

      <section className="contact-section section-pad" id="contact"><div className="contact-card"><p className="section-kicker">For bookers &amp; promoters</p><h2>Contact Dustin.</h2><p>Leave your details below for clubs, theatres, festivals, corporate events, or private bookings.</p><form className="contact-form" onSubmit={(event) => { event.preventDefault(); }}><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" type="text" placeholder="Your name" required /><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" required /><label htmlFor="contact-venue">Venue / Organization</label><input id="contact-venue" name="venue" type="text" placeholder="Venue or organization" required /><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" placeholder="Tell Dustin about the date and room." rows={3} required /><button className="outline-button" type="submit">Send inquiry <ArrowUpRight size={16} /></button></form><p className="contact-note">Forms are ready to connect to a booking inbox. For now, you can also reach Dustin directly via <a href={instagramUrl} target="_blank" rel="noreferrer">@dustin.visser</a>.</p></div></section>

      <footer className="site-footer section-pad"><div className="footer-brand"><a className="site-brand" href="#top"><span className="site-brand-mark">DV</span><span className="site-brand-name">Dustin Visser</span></a><p>Stand-up comedy from Ontario.</p></div><div className="footer-links"><a href="#shows">Shows / Tickets</a><a href="#about">About</a><a href="#contact">Contact / Booking</a><a href={instagramUrl} target="_blank" rel="noreferrer"><InstagramIcon /> @dustin.visser</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dustin Visser</span><a href={tourInstagramUrl} target="_blank" rel="noreferrer"><InstagramIcon size={14} /> @smalltownbiglaughs</a></div></footer>
    </main>
  );
}
