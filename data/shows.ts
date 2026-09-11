export type Show = {
  id: string;
  date: string;
  time: string;
  city: string;
  region: string;
  venue: string;
  tour?: string;
  ticketUrl: string;
  ticketLabel?: string;
};

// Keep show entries in this format so a future webhook or admin form can write
// to one predictable source. Dates use YYYY-MM-DD for reliable sorting.
export const shows: Show[] = [
  {
    id: "hamilton-2026-09-18",
    date: "2026-09-18",
    time: "8:30 PM",
    city: "Hamilton",
    region: "ON",
    venue: "Ringside Hamilton",
    tour: "Small Town, Big Laughs",
    ticketUrl: "https://www.eventbrite.ca/e/small-town-big-laughs-live-stand-up-comedy-in-hamilton-tickets-1997782324712",
  },
  {
    id: "napanee-2026-09-25",
    date: "2026-09-25",
    time: "8:30 PM",
    city: "Napanee",
    region: "ON",
    venue: "Ellena's Cafe & Pantry",
    tour: "Small Town, Big Laughs",
    ticketUrl: "https://www.eventbrite.ca/e/small-town-big-laughs-live-stand-up-comedy-in-napanee-tickets-1997430207520",
  },
  {
    id: "north-dundas-2026-09-25",
    date: "2026-09-25",
    time: "8:30 PM",
    city: "North Dundas",
    region: "ON",
    venue: "Sandy Row Golf Club and Restaurant",
    tour: "Small Town, Big Laughs",
    ticketUrl: "https://www.eventbrite.ca/e/small-town-big-laughs-live-stand-up-comedy-in-north-dundas-tickets-1999128231355",
  },
  {
    id: "cardinal-2026-09-26",
    date: "2026-09-26",
    time: "7:00 PM",
    city: "Cardinal",
    region: "ON",
    venue: "The Boars Nest",
    tour: "Small Town, Big Laughs",
    ticketUrl: "https://www.eventbrite.ca/e/small-town-big-laughs-live-stand-up-comedy-in-cardinal-tickets-1998801536201",
  },
];

const dayAfter = (date: string) => {
  const endOfDisplayWindow = new Date(`${date}T00:00:00`);
  endOfDisplayWindow.setDate(endOfDisplayWindow.getDate() + 1);
  endOfDisplayWindow.setHours(23, 59, 59, 999);
  return endOfDisplayWindow;
};

export function getUpcomingShows(now = new Date()) {
  return shows
    .filter((show) => now <= dayAfter(show.date))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export function formatShowParts(date: string) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).formatToParts(new Date(`${date}T12:00:00`));

  return {
    month: parts.find((part) => part.type === "month")?.value ?? "",
    day: parts.find((part) => part.type === "day")?.value ?? "",
    year: parts.find((part) => part.type === "year")?.value ?? "",
  };
}
