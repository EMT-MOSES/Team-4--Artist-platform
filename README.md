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
Use the seeded users from the local demo data source.

## Setup
```bash
npm install
npm run dev
```

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
