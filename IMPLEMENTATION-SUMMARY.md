# Implementation summary

- Added environment-configured API-key authentication and protected every Express route.
- Added seeded campus events, venues, artist schedules, venue contacts, students, and owner-specific lost-item reports.
- Added server-side integration with the supplied artisans and bookings API, with allowlisted output fields and explicit upstream failure responses.
- Booking records are scoped to the API key's configured user ID; a protected summary endpoint calculates pending, accepted, and upcoming counts and offered fees.
- Added `TEST_USER_ID` and `CONSUMER_USER_ID` mapping so upstream booking ownership can be configured independently of the API key values.
- Added per-key, per-endpoint rate limiting: three successful requests per one-hour window.
- Added lost-item ownership checks and report creation that validates event/venue data and derives priority from venue capacity.
- Replaced the detailed login failure message with a generic authentication error; API authentication failures return HTTP 401.
- Removed plaintext passwords from the tracked demo user data and from the active-user profile saved after login.
- Added `.env.example`; the real `.env` remains local and ignored by Git.

## Challenges and fixes

- The API contract listed endpoints that were not implemented. Added mock-backed campus endpoints and connected artisan/booking reads to the supplied API.
- The originally shared Cloudflare tunnel did not resolve, so the base was updated to the Render API URL. Its artisans endpoint timed out from this environment; unavailable upstream data returns HTTP 502 rather than mock records.
- The supplied bookings API currently returns one record. It is returned only to an API key mapped to the matching artist or venue ID; the app does not fabricate extra upstream bookings.
- The prior students route used `SELECT *`; replaced it with a minimal, explicit in-memory response shape.
- Rate-limit accounting now counts only successful responses and reserves in-flight requests to avoid concurrent calls exceeding the limit.

## Chosen rate limit

Three successful requests per API key per endpoint, resetting one hour after the first request in that window.
