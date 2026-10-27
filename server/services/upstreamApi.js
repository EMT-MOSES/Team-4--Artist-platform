const REQUEST_TIMEOUT_MS = 8000;

function getUpstreamBaseUrl() {
  const configuredUrl = process.env.UPSTREAM_API_BASE_URL;
  if (!configuredUrl) {
    throw new Error('UPSTREAM_API_BASE_URL must be configured.');
  }

  const baseUrl = new URL(configuredUrl);
  if (
    !['http:', 'https:'].includes(baseUrl.protocol) ||
    baseUrl.username ||
    baseUrl.password ||
    baseUrl.search ||
    baseUrl.hash
  ) {
    throw new Error('UPSTREAM_API_BASE_URL must be an HTTP(S) base URL without credentials or query data.');
  }

  return baseUrl;
}

async function fetchRecords(resource, collectionName) {
  const baseUrl = getUpstreamBaseUrl();
  const requestUrl = new URL(resource, baseUrl.href.endsWith('/') ? baseUrl : `${baseUrl.href}/`);
  const response = await fetch(requestUrl, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`Upstream request failed with status ${response.status}.`);
  }

  const payload = await response.json();
  const records = Array.isArray(payload)
    ? payload
    : payload && Array.isArray(payload[collectionName])
      ? payload[collectionName]
      : payload && Array.isArray(payload.data)
        ? payload.data
        : null;

  if (!records || records.some((record) => !record || typeof record !== 'object' || Array.isArray(record))) {
    throw new Error('Upstream returned an invalid record list.');
  }

  return records;
}

function select(record, ...keys) {
  for (const key of keys) {
    if (record[key] !== undefined && record[key] !== null) {
      return record[key];
    }
  }
  return undefined;
}

function mapArtisan(record) {
  const artistId = select(record, 'artistId', 'artisanId', 'artist_id', 'id');
  const name = select(record, 'name', 'artistName', 'artisanName');
  const email = select(record, 'email');
  const genre = select(record, 'genre', 'style');

  if ((typeof artistId !== 'string' && typeof artistId !== 'number') || typeof name !== 'string') {
    throw new Error('Upstream artisan record is missing required fields.');
  }

  return {
    artistId,
    name,
    ...(typeof email === 'string' ? { email } : {}),
    ...(typeof genre === 'string' ? { genre } : {}),
  };
}

function mapBooking(record) {
  const bookingId = select(record, 'bookingId', 'booking_id', 'id');
  const artistId = select(record, 'artistId', 'artist_id');
  const venueId = select(record, 'venueId', 'venue_id');
  const status = select(record, 'status', 'bookingStatus', 'booking_status');
  const eventDate = select(record, 'eventDate', 'event_date');
  const offeredFee = select(record, 'offeredFee', 'offered_fee');

  return {
    ...(typeof bookingId === 'string' || typeof bookingId === 'number' ? { bookingId } : {}),
    ...(typeof artistId === 'string' || typeof artistId === 'number' ? { artistId } : {}),
    ...(typeof venueId === 'string' || typeof venueId === 'number' ? { venueId } : {}),
    ...(typeof status === 'string' ? { status } : {}),
    ...(typeof eventDate === 'string' ? { eventDate } : {}),
    ...(typeof offeredFee === 'number' ? { offeredFee } : {}),
  };
}

async function getArtisans() {
  const records = await fetchRecords('artisans', 'artisans');
  return records.map(mapArtisan);
}

async function getBookings() {
  const records = await fetchRecords('bookings', 'bookings');
  return records.map(mapBooking);
}

module.exports = { getArtisans, getBookings };
