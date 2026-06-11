# Installation and Execution Steps

This guide covers both local development setup and Docker-based execution for Neptune.

## Prerequisites

Required for local development:

- Bun `1.3.5` or later
- Node.js `18` or later
- PostgreSQL
- Google API key
- Groq API key

Required for Docker execution:

- Docker Engine
- Docker Compose plugin, optional but recommended
- PostgreSQL database, either local, hosted, or containerized

## Local Installation

Clone the repository:

```bash
git clone https://github.com/kunal-rathore-111/Neptune.git
cd Neptune
```

Install dependencies:

```bash
bun install
```

## Environment Configuration

Create the following `.env` files. Do not commit real secrets.

### Frontend Environment

File: `apps/web/client/.env`

```env
VITE_MODE=dev
VITE_DEV_BACKEND_BASE_URL=http://localhost:3000/app/v3
VITE_PROD_BACKEND_BASE_URL=https://your-production-backend/app/v3
VITE_DEV_FRONTEND_BASE_URL=http://localhost:5173
VITE_PROD_FRONTEND_BASE_URL=https://your-production-frontend
```

### Backend Environment

File: `apps/web/server/.env`

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=replace-with-a-secure-secret
AI_SERVER_URL=http://localhost:3002
Frontend_URL=http://localhost:5173
```

### AI Server Environment

File: `apps/aiServer/.env`

```env
BACKEND_URL=http://localhost:3000
GOOGLE_API_KEY=your-google-api-key
GROQ_API=your-groq-api-key
```

## Database Setup

Create a PostgreSQL database and update `DATABASE_URL` in `apps/web/server/.env`.

Apply existing migrations:

```bash
cd apps/web/server
bun run migratee
cd ../../..
```

Generate migrations after schema changes:

```bash
cd apps/web/server
bun run generatee
cd ../../..
```

Database files are stored in:

```text
apps/web/server/src/drizzle/schema.ts
apps/web/server/src/drizzle/migrations/
apps/web/server/src/drizzle/drizzle.config/drizzle.config.ts
```

## Local Execution

Run all services together from the repository root:

```bash
bun run dev
```

Expected development URLs:

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:5173` |
| Backend API | `http://localhost:3000` |
| AI Server | `http://localhost:3002` |

Run services individually:

```bash
cd apps/web/client
bun run dev
```

```bash
cd apps/web/server
bun run dev
```

```bash
cd apps/aiServer
bun run dev
```

## Build and Production Preview

Build all workspaces:

```bash
bun run build
```

Start built services individually:

```bash
cd apps/web/client
bun run start
```

```bash
cd apps/web/server
bun run start
```

```bash
cd apps/aiServer
bun run start
```

## Docker Execution

The repository includes three Dockerfiles:

```text
docker/dockerfile.client
docker/dockerfile.server
docker/dockerfile.ai-server
```

Build images from the repository root:

```bash
docker build -f docker/dockerfile.client -t neptune-client .
docker build -f docker/dockerfile.server -t neptune-server .
docker build -f docker/dockerfile.ai-server -t neptune-ai-server .
```

### Run Backend Container

```bash
docker run --name neptune-server \
  -p 3000:3000 \
  --env-file apps/web/server/.env \
  neptune-server
```

### Run AI Server Container

```bash
docker run --name neptune-ai-server \
  -p 3002:3002 \
  --env-file apps/aiServer/.env \
  neptune-ai-server
```

### Run Client Container

```bash
docker run --name neptune-client \
  -p 4173:4173 \
  --env-file apps/web/client/.env \
  neptune-client
```

The client Dockerfile exposes port `4173` because it runs the built Vite preview server.

## Docker Compose Example

The repository does not currently include a committed compose file. Use this example if you want to run PostgreSQL and all app services together.

```yaml
services:
  postgres:
    image: postgres:16
    container_name: neptune-postgres
    environment:
      POSTGRES_USER: neptune
      POSTGRES_PASSWORD: neptune
      POSTGRES_DB: neptune
    ports:
      - "5432:5432"
    volumes:
      - neptune-postgres-data:/var/lib/postgresql/data

  server:
    build:
      context: .
      dockerfile: docker/dockerfile.server
    container_name: neptune-server
    env_file:
      - apps/web/server/.env
    environment:
      DATABASE_URL: postgresql://neptune:neptune@postgres:5432/neptune
      AI_SERVER_URL: http://ai-server:3002
      Frontend_URL: http://localhost:4173
    ports:
      - "3000:3000"
    depends_on:
      - postgres

  ai-server:
    build:
      context: .
      dockerfile: docker/dockerfile.ai-server
    container_name: neptune-ai-server
    env_file:
      - apps/aiServer/.env
    environment:
      BACKEND_URL: http://server:3000
    ports:
      - "3002:3002"
    depends_on:
      - server

  client:
    build:
      context: .
      dockerfile: docker/dockerfile.client
    container_name: neptune-client
    env_file:
      - apps/web/client/.env
    environment:
      VITE_MODE: dev
      VITE_DEV_BACKEND_BASE_URL: http://localhost:3000/app/v3
      VITE_DEV_FRONTEND_BASE_URL: http://localhost:4173
    ports:
      - "4173:4173"
    depends_on:
      - server

volumes:
  neptune-postgres-data:
```

Save the example as `docker-compose.yml`, then run:

```bash
docker compose up --build
```

After containers start, apply migrations:

```bash
docker exec -it neptune-server sh
cd apps/web/server
bun run migratee
```

## Verification Commands

Run these before submission:

```bash
bun run check-types
bun run lint
bun run build
```

## Common Issues

| Issue | Fix |
| --- | --- |
| Backend cannot connect to database | Check `DATABASE_URL` and confirm PostgreSQL is running |
| Frontend cannot call backend | Check `VITE_DEV_BACKEND_BASE_URL` and backend CORS `Frontend_URL` |
| AI routes fail | Check `AI_SERVER_URL`, `BACKEND_URL`, `GOOGLE_API_KEY`, and `GROQ_API` |
| Docker client cannot reach backend | Browser requests must use a host-accessible backend URL, usually `http://localhost:3000/app/v3` |
| Migrations fail | Confirm database exists and credentials are valid |
