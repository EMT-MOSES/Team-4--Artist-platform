# Artist Platform

A React + Vite client-side demo platform for artists and venues.

## Overview
This project models a lightweight music and event discovery experience where:
- artists manage profiles and uploaded songs
- venues manage profile information and booking requests
- artists manage profiles, music, and platform stats

## Features
- Homepage and marketing-style hero section
- Email/password authentication with role-based navigation
- Artist profile management
- Artist music CRUD using localStorage
- Venue profile management
- Booking workflow with localStorage persistence
- Search, filters, and dashboard statistics

## User Roles
- Artist
- Venue

## Demo Accounts
Seeded profile data is not an authentication source. Create a local demo account
through Sign Up. The client-side demo authentication is not intended for
production use.

## Setup
```bash
npm install
npm run dev
```

## API server

The Express API is in `server/`. Copy `server/.env.example` to `server/.env`,
replace both API key values with separate random values, and set
`TEST_USER_ID` and `CONSUMER_USER_ID` to the corresponding IDs used by the
upstream booking data. Keep `server/.env` local; it is ignored by Git.

```bash
cd server
npm install
npm start
```

Send API keys in the `x-api-key` header. The API allows three successful
requests per key and endpoint per hour. Artisan and booking reads use the
configured upstream API; campus reference data and lost-item reports use
seeded mock records.

## Production Build
```bash
npm run build
```

## Technologies Used
- React
- Vite
- JavaScript
- localStorage

## Folder Structure
```text
src/
  components/
  dashboards/
  utils/
  App.jsx
  Header.jsx
  Hero.jsx
  Login.jsx
  Signup.jsx
  ArtistDashboard.jsx
  VenueDashboard.jsx
  index.css
```

## Future Improvements
- backend API integration
- real notifications and messaging
- payments and checkout flows
- richer search and recommendation pipelines

Null 
