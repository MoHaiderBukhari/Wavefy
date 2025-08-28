# Overview

This is a modern full-stack music streaming web application called "Wavefy" built with React, Express.js, and TypeScript. The application provides a Spotify-like interface for browsing and playing music, featuring playlists, artists, and songs with a glassmorphism design aesthetic. It includes a music player with standard controls (play/pause, shuffle, repeat, volume) and displays recent tracks and playlists in an organized dashboard layout.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming and glassmorphism effects
- **State Management**: 
  - React Query (@tanstack/react-query) for server state management and API caching
  - React Context for music player state management
  - Custom hooks pattern for reusable logic (music player, mobile detection)
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth animations and transitions
- **Development**: ESM modules with path aliases configured for clean imports

## Backend Architecture
- **Framework**: Express.js with TypeScript in ESM format
- **Database Layer**: Drizzle ORM configured for PostgreSQL with schema-first approach
- **Data Storage**: 
  - Production: PostgreSQL database via Neon Database serverless
  - Development: In-memory storage implementation for testing
- **API Design**: RESTful API with consistent error handling and logging middleware
- **File Structure**: Modular separation with shared schema between client and server

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts`
- **Tables**: users, artists, songs, playlists, playlist_songs with proper relationships
- **Migration Strategy**: Drizzle Kit for database migrations and schema synchronization

## Authentication and Authorization
- **Current State**: Basic user schema defined but authentication not fully implemented
- **Session Management**: Connect-pg-simple for PostgreSQL session storage (configured but not active)
- **Architecture**: Prepared for cookie-based session authentication

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client for Neon Database
- **drizzle-orm**: Type-safe ORM with PostgreSQL adapter
- **drizzle-kit**: Database migration and introspection tool
- **express**: Web framework for Node.js backend
- **react**: Frontend library with TypeScript support
- **vite**: Fast build tool and development server

### UI and Styling
- **@radix-ui/react-***: Complete suite of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **framer-motion**: Animation library for React
- **class-variance-authority**: Utility for handling component variants
- **lucide-react**: Icon library

### State Management and Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Minimal routing library
- **react-hook-form**: Form handling with validation
- **@hookform/resolvers**: Form validation resolvers

### Development and Build Tools
- **typescript**: Type checking and compilation
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

### Additional Utilities
- **zod**: Runtime type validation and schema validation
- **date-fns**: Date utility library
- **nanoid**: URL-safe unique ID generator
- **cmdk**: Command palette component