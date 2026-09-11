"use client";

import Image from "next/image";
import { ArrowUpRight, AtSign, CalendarDays, ChevronRight, Menu, Ticket, X } from "lucide-react";
import { useMemo, useState } from "react";
import { formatShowParts, getUpcomingShows, type Show } from "../data/shows";

const instagramUrl = "https://www.instagram.com/dustin.visser/?hl=en";
const tourInstagramUrl = "https://www.instagram.com/smalltownbiglaughs/?hl=en";

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
  const upcomingShows = useMemo(() => getUpcomingShows(), []);
  const nextShow = upcomingShows[0];
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="site-brand" href="#top" onClick={closeMenu} aria-label="Dustin Visser home"><span className="site-brand-mark">DV</span><span className="site-brand-name">Dustin Visser</span></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#shows" onClick={closeMenu}>Shows</a><a href="#about" onClick={closeMenu}>About</a><a href="#booking" onClick={closeMenu}>Booking</a><a href={tourInstagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>Small Town, Big Laughs</a><a className="social-link" href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu} aria-label="Dustin Visser on Instagram"><AtSign size={18} /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-portrait"><div className="portrait-glow" /><Image src="/dustin-visser.png" alt="Dustin Visser performing stand-up with a microphone" fill priority sizes="(max-width: 720px) 92vw, 48vw" className="hero-photo" /></div>
        <div className="hero-lockup"><p className="hero-kicker">Ontario · Stand-up comedy</p><h1><span>DUSTIN</span><span>VISSER</span></h1><div className="hero-rule" /><p className="hero-description">A sharp, grounded comic with a knack for finding the strange in everyday life.</p><div className="hero-actions"><a className="gold-button" href="#shows">See Dustin live <ChevronRight size={17} /></a><a className="outline-button" href="#booking">Book Dustin <ArrowUpRight size={16} /></a></div></div>
      </section>

      <section className="next-show"><div className="next-show-label"><span>Next show</span><span className="label-line" /></div>{nextShow ? <div className="next-show-main"><strong>{nextShow.city}, {nextShow.region}</strong><span>{nextShow.venue}</span><span>{formatShowParts(nextShow.date).month} {formatShowParts(nextShow.date).day} · {nextShow.time}</span></div> : <div className="next-show-main"><strong>New dates coming soon</strong></div>}{nextShow && <a href={nextShow.ticketUrl} target="_blank" rel="noreferrer">Tickets <ArrowUpRight size={16} /></a>}</section>

      <section className="shows section-pad" id="shows"><div className="section-heading"><p className="section-kicker">01 / See Dustin live</p><h2>Upcoming dates</h2><p className="section-note">All current public dates, listed in order. Ticket links go directly to the event listing.</p></div><div className="show-list">{upcomingShows.length ? upcomingShows.map((show) => <ShowRow key={show.id} show={show} />) : <p className="empty-shows">New dates coming soon.</p>}</div></section>

      <section className="about section-pad" id="about"><div className="section-heading"><p className="section-kicker">02 / About</p><h2>Quietly<br /><span>observant.</span></h2></div><div className="about-copy"><p>Dustin Visser is an Ontario stand-up comedian bringing a calm point of view and a precise sense of timing to rooms across the province and beyond.</p><p>He performs on club bills, theatre shows, festivals, and the <a href={tourInstagramUrl} target="_blank" rel="noreferrer">Small Town, Big Laughs</a> tour.</p><a className="inline-link" href={instagramUrl} target="_blank" rel="noreferrer">Follow @dustin.visser <AtSign size={15} /></a></div></section>

      <section className="booking section-pad" id="booking"><div className="booking-copy"><p className="section-kicker">03 / For bookers &amp; promoters</p><h2>Bring Dustin<br /><span>to your room.</span></h2><p>For clubs, theatres, festivals, corporate events, and private bookings. Reach Dustin through Instagram to discuss availability and fit.</p><a className="gold-button" href={instagramUrl} target="_blank" rel="noreferrer">Contact Dustin <ArrowUpRight size={16} /></a></div><div className="booking-panel"><div className="panel-top"><span>DUSTIN VISSER</span><span>EPK / BOOKING</span></div><div className="panel-name">DUSTIN<br /><em>VISSER</em></div><div className="panel-bottom"><span>Stand-up comic</span><span>Ontario, Canada</span></div></div></section>

      <footer className="site-footer section-pad"><div className="footer-brand"><a className="site-brand" href="#top"><span className="site-brand-mark">DV</span><span className="site-brand-name">Dustin Visser</span></a><p>Stand-up comedy from Ontario.</p></div><div className="footer-links"><a href="#shows">Shows</a><a href="#about">About</a><a href="#booking">Booking</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dustin Visser</span><a href={tourInstagramUrl} target="_blank" rel="noreferrer">Small Town, Big Laughs <ArrowUpRight size={14} /></a><a href="/admin" className="admin-link">Show admin</a></div></footer>
    </main>
  );
}
