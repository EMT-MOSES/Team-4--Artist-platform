const express = require('express');
const {
  contacts,
  events,
  lostItems,
  schedules,
  venues,
} = require('../data/mockData');
const { getArtisans, getBookings } = require('../services/upstreamApi');

const router = express.Router();

async function sendUpstreamData(res, fetchData, errorMessage) {
  try {
    return res.json(await fetchData());
  } catch (error) {
    const errorType = error instanceof Error ? error.name : 'UnknownError';
    console.error(`${errorMessage}: upstream request failed (${errorType})`);
    return res.status(502).json({ error: errorMessage });
  }
}

router.get(['/artisans', '/artists'], (req, res) =>
  sendUpstreamData(res, getArtisans, 'Unable to retrieve artisans'),
);

function belongsToUser(booking, userId) {
  return [booking.artistId, booking.venueId].some(
    (id) => id !== undefined && String(id) === userId,
  );
}

router.get('/bookings', (req, res) =>
  sendUpstreamData(
    res,
    async () => (await getBookings()).filter((booking) => belongsToUser(booking, req.user.id)),
    'Unable to retrieve bookings',
  ),
);

router.get('/events', (req, res) => {
  res.json(events.map(({ id, name, venueId, startsAt }) => ({ id, name, venueId, startsAt })));
});

router.get('/venues', (req, res) => {
  res.json(venues.map(({ id, name, capacity }) => ({ id, name, capacity })));
});

router.get('/schedules', (req, res) => {
  res.json(schedules.map(({ id, artistName, eventId, startsAt }) => ({ id, artistName, eventId, startsAt })));
});

router.get('/contacts', (req, res) => {
  res.json(contacts.map(({ venueId, name, email }) => ({ venueId, name, email })));
});

router.get('/users/:userId/lost-items', (req, res) => {
  if (req.params.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const ownedItems = lostItems
    .filter(({ ownerId }) => ownerId === req.user.id)
    .map(({ id, itemName, eventName, venueName, priority, createdAt }) => ({
      id,
      itemName,
      eventName,
      venueName,
      priority,
      createdAt,
    }));

  return res.json(ownedItems);
});

router.get('/users/:userId/bookings/summary', (req, res) => {
  if (req.params.userId !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  return sendUpstreamData(
    res,
    async () => {
      const bookings = (await getBookings()).filter((booking) =>
        belongsToUser(booking, req.user.id),
      );
      const now = Date.now();

      return bookings.reduce(
        (summary, booking) => {
          summary.total += 1;
          if (booking.status?.toLowerCase() === 'pending') summary.pending += 1;
          if (booking.status?.toLowerCase() === 'accepted') summary.accepted += 1;
          if (booking.eventDate && Date.parse(booking.eventDate) >= now) {
            summary.upcoming += 1;
          }
          summary.offeredFees += booking.offeredFee || 0;
          return summary;
        },
        { total: 0, pending: 0, accepted: 0, upcoming: 0, offeredFees: 0 },
      );
    },
    'Unable to retrieve booking summary',
  );
});

router.post('/lost-items', (req, res) => {
  const { itemName, eventId } = req.body;

  if (typeof itemName !== 'string' || !itemName.trim() || typeof eventId !== 'string') {
    return res.status(400).json({ error: 'itemName and eventId are required' });
  }

  const event = events.find(({ id }) => id === eventId);
  if (!event) {
    return res.status(400).json({ error: 'Unknown event' });
  }

  const venue = venues.find(({ id }) => id === event.venueId);
  if (!venue) {
    return res.status(500).json({ error: 'Event venue is unavailable' });
  }

  const report = {
    id: `${req.user.id}-report-${Date.now()}`,
    ownerId: req.user.id,
    itemName: itemName.trim(),
    eventId: event.id,
    eventName: event.name,
    venueId: venue.id,
    venueName: venue.name,
    priority: venue.capacity >= 1000 ? 'high' : 'standard',
    createdAt: new Date().toISOString(),
  };

  lostItems.push(report);
  return res.status(201).json({
    id: report.id,
    itemName: report.itemName,
    eventName: report.eventName,
    venueName: report.venueName,
    priority: report.priority,
    createdAt: report.createdAt,
  });
});

module.exports = router;
