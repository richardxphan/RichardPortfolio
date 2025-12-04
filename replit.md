# Richard Phan Portfolio

## Overview

This is a personal portfolio website for Richard Phan, a Software Engineer and AI Researcher. The application is built as a modern, single-page application showcasing professional experience, projects, and achievements with a clean, technical aesthetic inspired by Linear, Vercel, and Stripe design systems.

The portfolio emphasizes interactive storytelling through subtle animations, progressive content revelation, and data-driven impact metrics. It serves as a professional presence showcasing AWS internship experience, AI research background, and Georgia Tech CS education.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Client-side routing using Wouter for lightweight SPA navigation
- Framer Motion for declarative animations and interactive elements

**Rationale:** React + Vite provides excellent developer experience with minimal configuration while maintaining production performance. Wouter offers routing without the overhead of React Router, appropriate for a portfolio site with minimal routes.

**UI Component System:**
- shadcn/ui component library (New York style variant) with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom CSS variables for theme support (light/dark mode)
- Component variants using class-variance-authority (CVA)

**Rationale:** shadcn/ui provides accessible, customizable components that can be owned and modified. The design system uses Inter and Space Grotesk fonts with carefully defined spacing scales to match the professional, technical aesthetic outlined in design guidelines.

**State Management:**
- TanStack Query (React Query) for server state management
- React Context for theme state (light/dark mode)
- Local component state for UI interactions

**Rationale:** React Query handles data fetching, caching, and synchronization efficiently. Theme state is simple enough for Context API without requiring Redux.

**Animation Strategy:**
- Framer Motion for scroll-triggered animations, role rotation, and progressive content reveals
- CSS transitions for hover states and micro-interactions
- Intersection Observer patterns for viewport-based animations

**Rationale:** Framer Motion provides declarative animation APIs that integrate cleanly with React, enabling the "interactive storytelling" design principle without manual DOM manipulation.

### Backend Architecture

**Server Framework:**
- Express.js as the HTTP server
- Node.js runtime with ESM module support
- Custom logging middleware for request tracking

**Rationale:** Express provides minimal, flexible server setup appropriate for a portfolio site that may later add API endpoints for contact forms or analytics.

**Build & Deployment:**
- Client and server built separately with coordinated build script
- Client built with Vite to `dist/public`
- Server bundled with esbuild to `dist/index.cjs` with dependency bundling for faster cold starts
- Static file serving from Express in production

**Rationale:** Separate build processes allow optimization of each layer. Server bundling reduces filesystem syscalls on deployment platforms, improving cold start performance.

**Development Environment:**
- Vite middleware mode for HMR during development
- Hot module replacement with separate server/client processes
- Replit-specific plugins for development tooling

**Rationale:** Vite middleware mode enables true full-stack development with instant client updates while server runs separately.

### Data Storage Strategy

**Current Implementation:**
- In-memory storage using Map-based implementation (`MemStorage`)
- User entity with username/password schema defined

**Database Configuration:**
- Drizzle ORM configured for PostgreSQL
- Schema definitions in shared module for type safety
- Migration support via drizzle-kit

**Rationale:** The application is configured for Drizzle + PostgreSQL but currently uses memory storage. This allows the database to be added later without architectural changes. Drizzle provides type-safe queries and schema management with minimal overhead compared to larger ORMs.

**Pros:**
- Type safety across database layer
- Simple migration management
- Flexible adapter pattern allows swapping storage implementations

**Cons:**
- Current memory storage loses data on restart
- Requires database provisioning for persistence

### External Dependencies

**UI & Design:**
- @radix-ui/* primitives (accordion, dialog, dropdown, etc.) for accessible base components
- Tailwind CSS + PostCSS for styling pipeline
- lucide-react for iconography
- react-icons/si for technology/brand logos
- Framer Motion for animations
- Embla Carousel for interactive carousels

**Data & Forms:**
- @tanstack/react-query for server state
- react-hook-form + @hookform/resolvers for form handling
- zod for schema validation
- drizzle-zod for database schema validation

**Database:**
- @neondatabase/serverless for PostgreSQL connection
- drizzle-orm for query building
- drizzle-kit for migrations

**Development:**
- @replit/vite-plugin-* for Replit IDE integration
- tsx for TypeScript execution
- esbuild for server bundling

**Fonts:**
- Google Fonts: Inter (primary UI), Space Grotesk (display), JetBrains Mono (code)

**Rationale:** Dependencies are chosen for small bundle sizes and specific capabilities. Radix UI provides unstyled, accessible primitives. Lucide offers consistent iconography. The tech stack prioritizes developer experience with TypeScript throughout while maintaining production performance.