# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZotPool is a carpooling platform for UC Irvine students. Users can post ride offers (as drivers) or ride requests (as passengers) and browse/match with other UCI commuters. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Commands

- `npm install` - Install dependencies
- `npm run dev` - Start dev server on http://localhost:3000
- `npm run build` - Production build
- `npm run preview` - Preview production build

## Architecture

**Routing**: Uses `react-router-dom` with `HashRouter`. Protected routes redirect unauthenticated users to `/login` and non-onboarded users to `/onboarding`.

**State Management**: Single React Context (`AppContext`) manages all global state:
- `user` - Current authenticated user (null if logged out)
- `posts` - Array of all ride posts
- `login(email)` - Validates `@uci.edu` emails only
- `logout()`, `updateUser()`, `addPost()` - State mutations

**Data Layer**: Currently uses mock data (`services/mockData.ts`). No backend integration yet - all state is in-memory and resets on refresh.

**Key Types** (`types.ts`):
- `User` - Profile with role (`driver`/`passenger`/`both`), socials, UCI info
- `Post` - Ride listing with origin/destination, schedule (days/times/recurring), and driver-specific details (car type, seats, cleanliness rating, cost type)

**Pages**:
- `/` - Landing page (public)
- `/login` - UCI email authentication
- `/onboarding` - Profile setup (post-login, pre-dashboard)
- `/dashboard` - User's home with their posts
- `/browse` - Search/filter all ride posts
- `/create` - Create new ride post
- `/profile` - Edit user profile

**Styling**: Tailwind with UCI brand colors (`uci-blue`, `uci-gold`, `uci-dark`). Uses glass morphism effects and `lucide-react` icons.

## Environment

Requires `GEMINI_API_KEY` in `.env.local` (referenced in vite config but not currently used in app code).
