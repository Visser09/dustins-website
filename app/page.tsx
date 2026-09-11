"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, CalendarDays, Camera, Mail, Menu, Play, Send, Ticket, X } from "lucide-react";
import { useMemo, useState } from "react";
import { formatShowParts, getUpcomingShows, type Show } from "../data/shows";

const instagramUrl = "https://www.instagram.com/dustin.visser/?hl=en";
const tourInstagramUrl = "https://www.instagram.com/smalltownbiglaughs/?hl=en";

function ShowRow({ show }: { show: Show }) {
  const date = formatShowParts(show.date);
  return (
    <article className="show-row">
      <div className="show-date" aria-label={`${date.month} ${date.day}, ${date.year}`}><span>{date.month}</span><strong>{date.day}</strong></div>
      <div className="show-info"><p className="show-city">{show.city}, {show.region}</p><h3>{show.venue}</h3><p className="show-meta">{show.tour ?? "Live stand-up"} <span aria-hidden="true">·</span> {show.time}</p></div>
      <a className="button button-dark show-ticket" href={show.ticketUrl} target="_blank" rel="noreferrer"><Ticket size={16} strokeWidth={2.2} /><span>Tickets</span><ArrowUpRight size={15} /></a>
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
        <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Dustin Visser home"><span className="wordmark-mark">DV</span><span>Dustin Visser</span></a>
        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
          <a href="#shows" onClick={closeMenu}>Shows</a><a href="#about" onClick={closeMenu}>About</a><a href="#bookings" onClick={closeMenu}>Book Dustin</a>
          <a href={instagramUrl} target="_blank" rel="noreferrer" onClick={closeMenu} aria-label="Dustin Visser on Instagram"><Camera size={17} /></a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      <section className="hero section-pad" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Stand-up comic · Ontario</p>
          <h1>Good jokes.<br /><em>Bad decisions.</em></h1>
          <p className="hero-lede">Dustin Visser is a comedian from Ontario telling the truth about the weird little things we all pretend are normal.</p>
          <div className="hero-actions"><a className="button button-acid" href="#shows">See upcoming shows <ArrowDownRight size={17} /></a><a className="text-link" href="#bookings">Book Dustin <ArrowUpRight size={16} /></a></div>
          <div className="hero-note"><span className="note-line" /><span>Currently on the road with <a href={tourInstagramUrl} target="_blank" rel="noreferrer">Small Town, Big Laughs</a></span></div>
        </div>
        <div className="hero-visual"><div className="hero-sticker">LIVE<br />&amp; UNFILTERED</div><div className="hero-photo-frame"><Image src="/dustin-visser.png" alt="Dustin Visser performing with a microphone" fill priority sizes="(max-width: 720px) 88vw, 45vw" className="hero-photo" /></div><div className="hero-caption"><span>01</span><span>That guy with the microphone</span></div></div>
      </section>

      <section className="next-show-strip"><div className="next-show-label"><CalendarDays size={18} /><span>Next up</span></div>{nextShow ? <div className="next-show-detail"><strong>{nextShow.city}, {nextShow.region}</strong><span>{nextShow.venue}</span><span>{formatShowParts(nextShow.date).month} {formatShowParts(nextShow.date).day} · {nextShow.time}</span></div> : <div className="next-show-detail"><strong>New dates soon</strong><span>Follow Dustin for the next announcement.</span></div>}{nextShow && <a href={nextShow.ticketUrl} target="_blank" rel="noreferrer" className="next-show-link">Get tickets <ArrowUpRight size={17} /></a>}</section>

      <section className="shows section-pad" id="shows">
        <div className="section-intro"><p className="eyebrow"><span className="eyebrow-dot coral" /> The calendar</p><h2>Catch Dustin<br /><em>in the wild.</em></h2><p>One mic, a few questionable opinions, and a town near you. Dates disappear automatically after the show window closes.</p></div>
        <div className="show-list">{upcomingShows.length ? upcomingShows.map((show) => <ShowRow key={show.id} show={show} />) : <p className="empty-shows">No dates on the calendar right now. Check back soon.</p>}</div>
        <div className="tour-callout"><div><p className="eyebrow">Follow the tour</p><h3>Small Town,<br /><em>Big Laughs.</em></h3></div><a className="button button-outline" href={tourInstagramUrl} target="_blank" rel="noreferrer">@smalltownbiglaughs <ArrowUpRight size={16} /></a></div>
      </section>

      <section className="about section-pad" id="about"><div className="about-number">02</div><div className="about-copy"><p className="eyebrow"><span className="eyebrow-dot" /> A little context</p><h2>From the everyday<br /><em>to the absurd.</em></h2><p className="about-lede">Dustin Visser makes observational comedy for people who have ever overthought a text, avoided a phone call, or said “I’m just resting my eyes.”</p><div className="about-links"><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">Follow on Instagram <Camera size={16} /></a><a className="text-link" href="#bookings">Work with Dustin <ArrowUpRight size={16} /></a></div></div><div className="about-aside"><Play size={18} fill="currentColor" /><p>“The kind of funny that sneaks up on you, then asks for a ride home.”</p><span>— someone who stayed for the encore</span></div></section>

      <section className="bookings section-pad" id="bookings"><div className="booking-intro"><p className="eyebrow"><span className="eyebrow-dot coral" /> For bookers &amp; promoters</p><h2>Make your next show<br /><em>the good kind of loud.</em></h2><p>Dustin brings a sharp, easy-to-book set to clubs, theatres, festivals, corporate events, and rooms that could use a little more chaos.</p><a className="button button-acid" href="mailto:booking@dustinvisser.com">Start a conversation <Mail size={16} /></a></div><div className="booking-card"><div className="booking-card-top"><span>BOOKING / EPK</span><ArrowUpRight size={18} /></div><div className="booking-card-title">DUSTIN<br /><span>VISSER</span></div><div className="booking-card-bottom"><span>Stand-up comic<br />Ontario, Canada</span><span>Available for<br />select dates</span></div></div></section>

      <footer className="site-footer section-pad"><div className="footer-top"><div><a className="wordmark footer-wordmark" href="#top"><span className="wordmark-mark">DV</span><span>Dustin Visser</span></a><p>See you in the crowd.</p></div><div className="footer-links"><a href="#shows">Shows</a><a href="#about">About</a><a href="#bookings">Book Dustin</a><a href={instagramUrl} target="_blank" rel="noreferrer">Instagram</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Dustin Visser</span><a href="mailto:booking@dustinvisser.com"><Send size={15} /> booking@dustinvisser.com</a><a href="/admin" className="admin-link">Show admin</a></div></footer>
    </main>
  );
}
