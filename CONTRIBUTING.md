# Contributing to Neptune

Thank you for improving Neptune. This guide explains how to set up the project, choose the right workspace, verify changes, and submit clean contributions.

## Code of Conduct

Be respectful, specific, and constructive. Keep discussions focused on the project and the change being proposed.

## Before You Start

Read these files:

- [README.md](./README.md)
- [INSTALLATION_AND_EXECUTION.md](./INSTALLATION_AND_EXECUTION.md)
- [TEST_CASES_AND_RESULTS.md](./TEST_CASES_AND_RESULTS.md)

## Development Setup

Clone and install:

```bash
git clone https://github.com/kunal-rathore-111/Neptune.git
cd Neptune
bun install
```

Create the required `.env` files as described in [INSTALLATION_AND_EXECUTION.md](./INSTALLATION_AND_EXECUTION.md).

Start the project:

```bash
bun run dev
```

## Docker Setup for Contributors

Build all Docker images:

```bash
docker build -f docker/dockerfile.client -t neptune-client .
docker build -f docker/dockerfile.server -t neptune-server .
docker build -f docker/dockerfile.ai-server -t neptune-ai-server .
```

Run each image with its matching `.env` file:

```bash
docker run --name neptune-server -p 3000:3000 --env-file apps/web/server/.env neptune-server
docker run --name neptune-ai-server -p 3002:3002 --env-file apps/aiServer/.env neptune-ai-server
docker run --name neptune-client -p 4173:4173 --env-file apps/web/client/.env neptune-client
```

For a multi-service Docker Compose example, see [INSTALLATION_AND_EXECUTION.md](./INSTALLATION_AND_EXECUTION.md#docker-compose-example).

## Branch Naming

Create a branch from the latest main branch:

```bash
git checkout main
git pull
git checkout -b feature/short-description
```

Recommended branch prefixes:

| Prefix | Use Case |
| --- | --- |
| `feature/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation-only change |
| `refactor/` | Code cleanup without behavior change |
| `test/` | Test-related change |
| `chore/` | Tooling or maintenance |

## Workspace Guide

| Change Type | Location |
| --- | --- |
| Frontend routes, pages, UI flows | `apps/web/client` |
| Backend routes, controllers, middleware, services | `apps/web/server` |
| AI scraping, chat, embeddings | `apps/aiServer` |
| Shared validation schemas | `packages/validator` |
| Shared UI components | `packages/ui` |
| Shared icons | `packages/icons` |
| Shared utilities/constants | `packages/libs` |
| TypeScript base configs | `packages/typescript-config` |
| ESLint base configs | `packages/eslint-config` |
| Docker configuration | `docker/` |
| CI workflows | `.github/workflows/` |

## Coding Guidelines

- Use TypeScript for application and package code.
- Keep route handlers thin; place business logic in services.
- Reuse shared schemas from `packages/validator` when validating request or form data.
- Reuse shared UI components from `packages/ui` where practical.
- Keep environment-specific values in `.env` files.
- Do not commit secrets, local caches, generated build output, or dependency folders.
- Do not commit project report or user manual files.

## Database Changes

If you change `apps/web/server/src/drizzle/schema.ts`, generate and apply a migration:

```bash
cd apps/web/server
bun run generatee
bun run migratee
cd ../../..
```

Include generated migration files from:

```text
apps/web/server/src/drizzle/migrations/
```

## Verification Checklist

Run these commands before opening a pull request:

```bash
bun run check-types
bun run lint
bun run build
```

For Docker-related changes, also verify image builds:

```bash
docker build -f docker/dockerfile.client -t neptune-client .
docker build -f docker/dockerfile.server -t neptune-server .
docker build -f docker/dockerfile.ai-server -t neptune-ai-server .
```

If the change touches database logic, verify migrations against a local database.

## Commit Guidelines

Use short, descriptive commit messages:

```bash
git add .
git commit -m "Add bookmark sharing validation"
```

Good examples:

```text
Add public profile share route
Fix dashboard loading state
Update Docker installation docs
Refactor content service validation
```

## Pull Request Checklist

Before submitting, confirm:

- The branch is up to date with `main`.
- The change is scoped and easy to review.
- Documentation is updated when behavior or setup changes.
- Migrations are included for database schema updates.
- Verification commands were run.
- Docker builds were checked for Docker-related changes.
- Screenshots are attached for visible UI changes.
- No `.env`, `node_modules`, `dist`, `.turbo`, report files, or user manual files are committed.

## Pull Request Description Template

```md
## Summary

- What changed?
- Why was this change needed?

## Verification

- [ ] bun run check-types
- [ ] bun run lint
- [ ] bun run build
- [ ] Docker build checked, if applicable
- [ ] Database migrations checked, if applicable

## Screenshots

Add screenshots for UI changes.

## Notes

Mention environment variables, migration notes, or known limitations.
```

## Reporting Issues

When reporting a bug, include:

- What you expected to happen
- What actually happened
- Steps to reproduce
- Screenshots or logs, if useful
- Browser/runtime/database details
