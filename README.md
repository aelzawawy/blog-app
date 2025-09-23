# Blog Application Monorepo

This project is a monorepo containing a React frontend and a NestJS backend for a blog application.

## Technologies Used

**Frontend (client-react):**
- React
- Vite
- TypeScript

**Backend (server-nest):**
- NestJS
- PostgreSQL (via Prisma)
- Redis (for sessions)
- Passport.js (for authentication)
- Docker Compose

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- pnpm
- Docker and Docker Compose

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aelzawawy/blog-app.git
    cd blog-app
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the `server-nest` directory based on `.env.example` (if available) or the required environment variables for the NestJS application (e.g., `DATABASE_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SESSION_SECRET`, `REDIS_HOST`).

4.  **Run Docker Compose (for database and Redis):**
    Navigate to the `server-nest` directory and start the services:
    ```bash
    cd server-nest
    docker-compose up -d
    ```

5.  **Run the application:**
    From the root directory, run the monorepo development script:
    ```bash
    pnpm dev
    ```
    This script should start both the React frontend and the NestJS backend.

## Project Structure

- `client-react/`: Contains the React frontend application.
- `server-nest/`: Contains the NestJS backend application.
- `scripts/`: Contains utility scripts for the monorepo.

