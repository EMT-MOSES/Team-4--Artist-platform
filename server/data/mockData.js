const venues = [
  { id: 'venue-1', name: 'North Quad Hall', capacity: 450 },
  { id: 'venue-2', name: 'The Foundry', capacity: 1200 },
  { id: 'venue-3', name: 'Willow Auditorium', capacity: 800 },
  { id: 'venue-4', name: 'Student Union Stage', capacity: 350 },
  { id: 'venue-5', name: 'Lakeside Pavilion', capacity: 1600 },
  { id: 'venue-6', name: 'Arts Center Studio', capacity: 180 },
  { id: 'venue-7', name: 'Cedar Theatre', capacity: 620 },
  { id: 'venue-8', name: 'West Campus Green', capacity: 2400 },
  { id: 'venue-9', name: 'Library Courtyard', capacity: 280 },
  { id: 'venue-10', name: 'Innovation Forum', capacity: 900 },
];

const events = [
  { id: 'event-1', name: 'Autumn Welcome Concert', venueId: 'venue-1', startsAt: '2026-10-29T18:00:00Z' },
  { id: 'event-2', name: 'Indie Night', venueId: 'venue-2', startsAt: '2026-10-30T19:30:00Z' },
  { id: 'event-3', name: 'Campus Jazz Evening', venueId: 'venue-3', startsAt: '2026-11-02T18:30:00Z' },
  { id: 'event-4', name: 'Open Mic Friday', venueId: 'venue-4', startsAt: '2026-11-06T17:00:00Z' },
  { id: 'event-5', name: 'Lakeside Music Festival', venueId: 'venue-5', startsAt: '2026-11-08T14:00:00Z' },
  { id: 'event-6', name: 'Songwriters in the Studio', venueId: 'venue-6', startsAt: '2026-11-10T18:00:00Z' },
  { id: 'event-7', name: 'Cedar Theatre Showcase', venueId: 'venue-7', startsAt: '2026-11-12T19:00:00Z' },
  { id: 'event-8', name: 'Green Day Live', venueId: 'venue-8', startsAt: '2026-11-15T16:00:00Z' },
  { id: 'event-9', name: 'Courtyard Acoustic Set', venueId: 'venue-9', startsAt: '2026-11-18T12:00:00Z' },
  { id: 'event-10', name: 'Innovation Arts Night', venueId: 'venue-10', startsAt: '2026-11-20T18:30:00Z' },
];

const schedules = [
  { id: 'schedule-1', artistName: 'Maya Rivers', eventId: 'event-1', startsAt: '2026-10-29T18:15:00Z' },
  { id: 'schedule-2', artistName: 'Paper Satellites', eventId: 'event-2', startsAt: '2026-10-30T20:00:00Z' },
  { id: 'schedule-3', artistName: 'Ellis Grant Trio', eventId: 'event-3', startsAt: '2026-11-02T19:00:00Z' },
  { id: 'schedule-4', artistName: 'Jordan Lee', eventId: 'event-4', startsAt: '2026-11-06T17:15:00Z' },
  { id: 'schedule-5', artistName: 'The Harbor Lights', eventId: 'event-5', startsAt: '2026-11-08T14:30:00Z' },
  { id: 'schedule-6', artistName: 'Nina Cole', eventId: 'event-6', startsAt: '2026-11-10T18:15:00Z' },
  { id: 'schedule-7', artistName: 'Cedar Street Quartet', eventId: 'event-7', startsAt: '2026-11-12T19:15:00Z' },
  { id: 'schedule-8', artistName: 'Late Bloom', eventId: 'event-8', startsAt: '2026-11-15T16:30:00Z' },
  { id: 'schedule-9', artistName: 'Theo Park', eventId: 'event-9', startsAt: '2026-11-18T12:15:00Z' },
  { id: 'schedule-10', artistName: 'Blue Finch', eventId: 'event-10', startsAt: '2026-11-20T18:45:00Z' },
];

const contacts = [
  { venueId: 'venue-1', name: 'Avery Brooks', email: 'avery.brooks@example.edu' },
  { venueId: 'venue-2', name: 'Samira Patel', email: 'samira.patel@example.edu' },
  { venueId: 'venue-3', name: 'Lucas Chen', email: 'lucas.chen@example.edu' },
  { venueId: 'venue-4', name: 'Morgan Price', email: 'morgan.price@example.edu' },
  { venueId: 'venue-5', name: 'Riley Johnson', email: 'riley.johnson@example.edu' },
  { venueId: 'venue-6', name: 'Harper Diaz', email: 'harper.diaz@example.edu' },
  { venueId: 'venue-7', name: 'Noah Williams', email: 'noah.williams@example.edu' },
  { venueId: 'venue-8', name: 'Isabel Turner', email: 'isabel.turner@example.edu' },
  { venueId: 'venue-9', name: 'Ethan Kim', email: 'ethan.kim@example.edu' },
  { venueId: 'venue-10', name: 'Zoe Martin', email: 'zoe.martin@example.edu' },
];

const students = [
  { id: 1, name: 'Amelia Foster', email: 'amelia.foster@example.edu', course: 'Music Production' },
  { id: 2, name: 'Benjamin Carter', email: 'benjamin.carter@example.edu', course: 'Jazz Studies' },
  { id: 3, name: 'Chloe Bennett', email: 'chloe.bennett@example.edu', course: 'Sound Engineering' },
  { id: 4, name: 'Daniel Rivera', email: 'daniel.rivera@example.edu', course: 'Songwriting' },
  { id: 5, name: 'Elena Brooks', email: 'elena.brooks@example.edu', course: 'Music Business' },
  { id: 6, name: 'Finn Murphy', email: 'finn.murphy@example.edu', course: 'Classical Performance' },
  { id: 7, name: 'Grace Thompson', email: 'grace.thompson@example.edu', course: 'Audio Technology' },
  { id: 8, name: 'Henry Adams', email: 'henry.adams@example.edu', course: 'Contemporary Music' },
  { id: 9, name: 'Ivy Wilson', email: 'ivy.wilson@example.edu', course: 'Music Education' },
  { id: 10, name: 'Jasper Moore', email: 'jasper.moore@example.edu', course: 'Music Production' },
];

const reportItems = [
  'blue water bottle', 'black backpack', 'wireless earbuds', 'silver notebook',
  'red scarf', 'guitar tuner', 'student ID holder', 'green umbrella',
  'camera case', 'set of keys',
];

const lostItems = ['test-user', 'consumer-user'].flatMap((ownerId) =>
  reportItems.map((itemName, index) => {
    const event = events[index];
    const venue = venues.find(({ id }) => id === event.venueId);
    return {
      id: `${ownerId}-report-${index + 1}`,
      ownerId,
      itemName,
      eventId: event.id,
      eventName: event.name,
      venueId: venue.id,
      venueName: venue.name,
      priority: venue.capacity >= 1000 ? 'high' : 'standard',
      createdAt: '2026-10-20T12:00:00Z',
    };
  }),
);

module.exports = { contacts, events, lostItems, schedules, students, venues };
