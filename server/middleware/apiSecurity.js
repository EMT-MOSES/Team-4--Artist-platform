const crypto = require('node:crypto');

const RATE_LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000;
const rateLimitWindows = new Map();
const knownEndpointPaths = new Set([
  '/',
  '/api/artisans',
  '/api/artists',
  '/api/bookings',
  '/api/contacts',
  '/api/events',
  '/api/lost-items',
  '/api/schedules',
  '/api/students',
  '/api/users/:userId/bookings/summary',
  '/api/users/:userId/lost-items',
  '/api/venues',
]);

function getApiKeys() {
  const keys = [
    {
      id: 'test',
      value: process.env.TEST_API_KEY,
      userId: process.env.TEST_USER_ID || 'test-user',
    },
    {
      id: 'consumer',
      value: process.env.CONSUMER_API_KEY,
      userId: process.env.CONSUMER_USER_ID || 'consumer-user',
    },
  ];

  if (keys.some(({ value }) => !value)) {
    throw new Error('TEST_API_KEY and CONSUMER_API_KEY must be configured.');
  }

  if (keys[0].value === keys[1].value) {
    throw new Error('TEST_API_KEY and CONSUMER_API_KEY must be different.');
  }

  return keys;
}

const apiKeys = getApiKeys();

function matchesApiKey(providedKey, configuredKey) {
  const provided = Buffer.from(providedKey);
  const configured = Buffer.from(configuredKey);

  return (
    provided.length === configured.length &&
    crypto.timingSafeEqual(provided, configured)
  );
}

function apiKeyAuth(req, res, next) {
  const providedKey = req.get('x-api-key');

  if (!providedKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = apiKeys.find(({ value }) =>
    matchesApiKey(providedKey, value),
  );

  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = { id: apiKey.userId };
  req.apiKeyId = apiKey.id;
  return next();
}

function rateLimit(req, res, next) {
  const now = Date.now();
  const candidatePath = req.path.replace(
    /\/users\/[^/]+(?=\/|$)/,
    '/users/:userId',
  );
  const normalizedPath = knownEndpointPaths.has(candidatePath)
    ? candidatePath
    : '/__unmatched__';
  const endpoint = `${req.method}:${req.baseUrl}${normalizedPath}`;
  const key = `${req.apiKeyId}:${endpoint}`;
  let window = rateLimitWindows.get(key);

  if (!window || (window.startedAt && now - window.startedAt >= WINDOW_MS)) {
    window = { startedAt: null, successful: 0, inFlight: 0 };
    rateLimitWindows.set(key, window);
  }

  if (window.successful + window.inFlight >= RATE_LIMIT) {
    const retryAfterSeconds = Math.ceil(
      ((window.startedAt || now) + WINDOW_MS - now) / 1000,
    );
    res.set('Retry-After', String(Math.max(1, retryAfterSeconds)));
    return res.status(429).json({ error: 'rate limit exceeded' });
  }

  window.inFlight += 1;
  let finalized = false;

  const finalize = (wasSuccessful) => {
    if (finalized) return;
    finalized = true;
    window.inFlight -= 1;
    if (wasSuccessful) {
      if (!window.startedAt) window.startedAt = Date.now();
      window.successful += 1;
    }
  };

  res.once('finish', () => finalize(res.statusCode >= 200 && res.statusCode < 300));
  res.once('close', () => finalize(false));

  return next();
}

module.exports = { apiKeyAuth, rateLimit };
