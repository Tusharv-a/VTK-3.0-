# VTK Toolset

## Overview

VTK Toolset is a mobile device diagnostics and monitoring web application built as a Progressive Web App. It provides real-time hardware testing, sensor monitoring, battery analysis, and network diagnostics for mobile devices. The application features a tech-themed dark UI with data visualizations and interactive hardware tests.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for transitions and micro-interactions
- **Charts**: Recharts for data visualization (battery graphs)
- **Build Tool**: Vite with React plugin

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Design**: RESTful endpoints defined in shared routes contract
- **Validation**: Zod schemas for request/response validation

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with drizzle-zod for schema-to-validation integration
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Migrations**: Managed via `drizzle-kit push` command

### Project Structure
```
├── client/           # Frontend React application
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── hooks/        # Custom React hooks (sensors, API)
│       ├── pages/        # Route page components
│       └── lib/          # Utilities and query client
├── server/           # Backend Express server
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer
│   └── db.ts         # Database connection
├── shared/           # Shared code between client/server
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API contract definitions
```

### Key Design Patterns
- **Shared Type Safety**: API contracts defined in `shared/routes.ts` with Zod schemas ensure type safety across client and server
- **Storage Abstraction**: `DatabaseStorage` class in `server/storage.ts` provides a clean interface for all database operations
- **Custom Hooks**: Mobile sensor access (accelerometer, gyroscope, battery, network) abstracted into reusable hooks with desktop fallbacks

### Device API Integration
- Battery Status API for power monitoring
- DeviceMotion/DeviceOrientation APIs for sensor data
- Web Audio API for speaker testing
- MediaDevices API for camera testing
- Network Information API for connectivity status
- Vibration API for haptic feedback testing

## External Dependencies

### Database
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: Session storage in PostgreSQL

### Third-Party APIs
- **ipapi.co**: Free IP geolocation service for network page

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Server state management
- `framer-motion`: Animation library
- `recharts`: Charting library
- `react-circular-progressbar`: Gauge components
- `wouter`: Client-side routing
- `zod`: Schema validation
- Full shadcn/ui component library (Radix UI primitives)

### Development Tools
- `tsx`: TypeScript execution for development
- `esbuild`: Production build bundling
- Vite plugins for Replit integration (error overlay, cartographer)