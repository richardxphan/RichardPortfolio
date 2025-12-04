# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Richard Phan's personal portfolio website - a modern, single-page React application showcasing professional experience, projects, skills, and leadership activities. The site features:

- Animated hero section with role rotation
- Interactive timeline for work experience
- Project showcase with detailed case studies
- Blog section placeholder
- Skills categorization
- Leadership impact metrics with animated counters
- Contact form with social links
- Client-side analytics tracking (localStorage)
- Light/dark theme switching

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Wouter (lightweight routing)
- TanStack Query (data fetching)
- Framer Motion (animations)
- Radix UI + shadcn/ui (component library)
- Tailwind CSS (styling)
- next-themes (theme management)

**Backend:**
- Express.js server
- Drizzle ORM with PostgreSQL (via Neon serverless)
- Session management (express-session)
- Passport.js authentication scaffolding

**Build Tools:**
- Vite (client bundler)
- esbuild (server bundler)
- tsx (TypeScript execution)

## Common Commands

### Development
```bash
npm run dev
```
Starts both client and server in development mode on port 5000 (default). The server uses tsx with hot reload. Vite dev server is integrated into Express in development.

### Building
```bash
npm run build
```
Runs `script/build.ts` which:
1. Cleans the `dist/` directory
2. Builds client using Vite → `dist/public/`
3. Builds server using esbuild → `dist/index.cjs`
4. Bundles selected dependencies (see allowlist in build.ts) to optimize cold start

### Production
```bash
npm start
```
Runs the built server from `dist/index.cjs`. Serves static files from `dist/public/`.

### Database
```bash
npm run db:push
```
Pushes Drizzle schema changes to the database. Requires `DATABASE_URL` environment variable.

### Type Checking
```bash
npm run check
```
Runs TypeScript compiler in check mode (no emit).

## Architecture

### Directory Structure

```
├── client/              # Frontend React application
│   ├── index.html       # Entry HTML
│   └── src/
│       ├── App.tsx      # Root component with routing
│       ├── main.tsx     # React entry point
│       ├── components/  # Reusable components
│       │   ├── ui/      # shadcn/ui components (generated)
│       │   ├── theme-provider.tsx
│       │   └── theme-toggle.tsx
│       ├── pages/       # Route components
│       │   ├── home.tsx # Main portfolio page (1300+ lines)
│       │   └── not-found.tsx
│       ├── hooks/       # Custom React hooks
│       └── lib/         # Utilities
│           ├── utils.ts # cn() helper for Tailwind
│           └── queryClient.ts
├── server/              # Backend Express application
│   ├── index.ts         # Main server entry + middleware
│   ├── routes.ts        # API route registration (currently empty)
│   ├── storage.ts       # Storage interface + in-memory implementation
│   ├── vite.ts          # Vite dev server integration
│   └── static.ts        # Production static file serving
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle schema + Zod validation
├── script/
│   └── build.ts         # Production build script
└── attached_assets/     # Static assets (resolved via @assets alias)
```

### Key Architectural Patterns

**Client-Server Split:**
- Development: Single Express server integrates Vite middleware for HMR
- Production: Express serves pre-built static files from `dist/public/`
- API routes prefixed with `/api` (logged separately in server/index.ts)

**Component Architecture:**
- Home page (`client/src/pages/home.tsx`) is the primary component with all portfolio content
- Uses inline data arrays (experiences, projects, skills, leadership, blogPosts, testimonials)
- Heavy use of Framer Motion for scroll animations and transitions
- Custom hooks: `useAnalytics()` for tracking, `useInView()` for scroll reveals
- Section-based layout with animated reveals on scroll

**Data Management:**
- Client-side analytics stored in localStorage
- TanStack Query configured but not actively used (no API calls yet)
- Database schema exists (users table) but routes not implemented

**Styling System:**
- Tailwind with custom theme configured in `tailwind.config.ts`
- CSS custom properties for theming (light/dark modes)
- Utility classes: `gradient-text`, `glass-card`, `hover-elevate` (see index.css)
- Component variants managed via class-variance-authority

**Path Aliases:**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Storage Interface

The storage system (`server/storage.ts`) defines an `IStorage` interface with two implementations available:
- `MemStorage`: In-memory storage (currently active, resets on restart)
- Database implementation can be added by implementing `IStorage` with Drizzle

To add new data models:
1. Define schema in `shared/schema.ts` using Drizzle + drizzle-zod
2. Add methods to `IStorage` interface
3. Implement in `MemStorage` (or DB storage)
4. Run `npm run db:push` to sync database

### Session Management

Express session is configured with either:
- `connect-pg-simple` for PostgreSQL-backed sessions
- `memorystore` for in-memory sessions (development)

Passport.js is available but not configured with strategies yet.

## Design Guidelines

The portfolio follows specific design principles documented in `design_guidelines.md`:

**Visual Identity:**
- Inspired by Linear (typography), Vercel (developer aesthetic), Stripe (sophistication)
- Inter/Space Grotesk font family
- 4-6-8-12-16-20-24 spacing scale
- Generous whitespace with bold typography

**Animation Philosophy:**
- Subtle, purposeful animations (no distracting loops)
- Scroll-triggered reveals with fade + translate
- Hover states: slight scale (1.02) + shadow increase
- Animated counters for metrics
- Timeline progression on scroll

**Color Usage:**
- Gradient accents for CTAs and hero elements
- Badge-based role/tech indicators (not progress bars)
- Glassmorphism cards with backdrop blur
- Company/project logos as colored initials in rounded squares

**Responsive Design:**
- Desktop-first with mobile breakpoints
- Sticky header with blur effect on scroll
- Mobile: hamburger menu with slide-in sheet
- Timeline: side-by-side alternating (desktop) → stacked (mobile)
- Text scales down 20-30% on mobile

## Content Management

All portfolio content is hardcoded in `client/src/pages/home.tsx` as data arrays:

- **experiences**: Work history with achievements and tech stacks
- **projects**: Featured projects with case studies (problem/approach/results/learnings)
- **skillCategories**: Languages, tools/frameworks, coursework
- **leadership**: Leadership roles with impact metrics
- **blogPosts**: Blog post metadata (not linked to actual articles yet)
- **testimonials**: Quotes from mentors/colleagues

To update content, edit these arrays directly. Each item has specific required fields and test-ids for accessibility.

## Testing & Development Notes

**Data-testid Attributes:**
- Extensively used throughout components for E2E testing
- Format: `data-testid="component-descriptor-id"`
- Examples: `card-project-llm-research`, `button-view-projects`

**Analytics Tracking:**
- Page views and section views tracked in localStorage
- Keyed by `portfolio-analytics` and `portfolio-theme`
- No external analytics services configured

**Performance Considerations:**
- Animations use `viewport={{ once: true }}` to trigger only once
- Lazy loading not implemented (single-page, pre-renders all content)
- Build process bundles critical dependencies to reduce syscalls

## Environment Variables

Required for full functionality:
- `DATABASE_URL`: PostgreSQL connection string (Neon serverless)
- `PORT`: Server port (defaults to 5000)
- `NODE_ENV`: development | production

## Known Limitations

- Blog posts are placeholders (no actual blog implementation)
- API routes scaffolding exists but no endpoints implemented
- Authentication system configured but no login flow
- Database schema for users exists but unused
- Resume PDF must be placed at `client/public/Richard_Phan_Resume.pdf`

## Adding New Features

**New Section to Portfolio:**
1. Add data array to `home.tsx` with section content
2. Create `<Section id="new-section">` component below existing sections
3. Add navigation link to `navLinks` array
4. Implement scroll-triggered animation with Framer Motion
5. Follow spacing/styling patterns from existing sections

**New API Endpoint:**
1. Define route handler in `server/routes.ts`
2. Add necessary storage methods to `IStorage` interface
3. Implement storage methods in `MemStorage` (and DB implementation if needed)
4. Prefix routes with `/api`

**New UI Component:**
1. Use shadcn/ui CLI if available: `npx shadcn@latest add [component]`
2. Or manually add to `client/src/components/ui/`
3. Ensure Radix UI primitive is in dependencies
4. Follow existing patterns: variants with CVA, forwarded refs

**Database Schema Changes:**
1. Update `shared/schema.ts` with new tables/columns
2. Create Zod schemas with `createInsertSchema()` for validation
3. Run `npm run db:push` to apply changes
4. Update TypeScript types: `typeof table.$inferSelect`
