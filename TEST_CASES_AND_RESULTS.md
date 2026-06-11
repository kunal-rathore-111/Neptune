# Test Cases and Results

This document lists the verification cases for Neptune and the expected results for project submission.

## Test Environment

| Item | Value |
| --- | --- |
| Runtime | Bun `1.3.5` |
| Node requirement | Node.js `18+` |
| Frontend | React + Vite |
| Backend | Express + Bun |
| AI server | Hono + Bun |
| Database | PostgreSQL |

## Automated Verification Commands

| Command | Purpose | Expected Result |
| --- | --- | --- |
| `bun install` | Install all monorepo dependencies | Dependencies install successfully |
| `bun run check-types` | Type-check all configured workspaces | TypeScript completes without type errors |
| `bun run lint` | Run workspace lint checks | Lint completes or reports actionable issues |
| `bun run build` | Build all apps and packages | Client, backend, AI server, and packages build successfully |

Note: A dedicated unit/integration test suite is not currently configured. The backend package still contains the default placeholder `test` script, so project verification currently uses type-checking, linting, build checks, and manual functional testing.

## Manual Functional Test Cases

| Test Case ID | Feature | Steps | Expected Result | Status |
| --- | --- | --- | --- | --- |
| TC-01 | Frontend launch | Run `bun run dev` and open `http://localhost:5173` | Landing page loads without blank screen or console-blocking runtime error | To be verified locally |
| TC-02 | User sign up | Open signup page and submit valid user details | User account is created and user is authenticated or redirected correctly | To be verified locally |
| TC-03 | User sign in | Submit valid credentials on signin page | User is logged in and dashboard becomes accessible | To be verified locally |
| TC-04 | Protected routes | Open dashboard without authentication | User is redirected or blocked from protected content | To be verified locally |
| TC-05 | Add bookmark | Add a bookmark with title, URL, description, category, and tags | Bookmark is saved and visible in dashboard list | To be verified locally |
| TC-06 | Edit bookmark | Update an existing bookmark | Updated values are saved and displayed | To be verified locally |
| TC-07 | Delete bookmark | Delete an existing bookmark | Bookmark is removed from the dashboard | To be verified locally |
| TC-08 | Magic Fill | Paste a valid URL into Magic Fill flow | AI service returns generated title, description, category, and tags | To be verified locally |
| TC-09 | Chat with content | Ask a question in the AI chat drawer | Chat returns a relevant answer based on saved content | To be verified locally |
| TC-10 | Share content | Enable sharing for a content card and open public link | Public shared content page loads without authentication | To be verified locally |
| TC-11 | Share profile | Enable profile sharing and open public profile URL | Public profile page loads shared user content | To be verified locally |
| TC-12 | Update password | Submit current and new password from profile page | Password is updated and user can sign in with new password | To be verified locally |
| TC-13 | Account deletion | Confirm account deletion from profile page | User account and related content are removed | To be verified locally |
| TC-14 | Database migrations | Run `bun run migratee` in `apps/web/server` | Migrations apply successfully to PostgreSQL database | To be verified locally |
| TC-15 | Docker workflows | Push to `main` with DockerHub secrets configured | GitHub Actions build and push client, server, and AI images | To be verified on GitHub |

## Current Result Summary

| Area | Result |
| --- | --- |
| Source code | Included |
| README documentation | Included |
| Installation and execution steps | Included |
| Contribution steps | Included |
| Database files/scripts | Included |
| GitHub workflows | Included |
| Test cases and results | Included |
| Project report | Excluded as requested |
| User manual | Excluded as requested |
| Generated cache/build files | Excluded from repository tracking |

## Recommended Future Testing Improvements

- Add unit tests for validators and utility functions.
- Add API integration tests for authentication, content, sharing, and AI routes.
- Add React component tests for dashboard and auth flows.
- Add end-to-end tests for signup, login, bookmark CRUD, sharing, and Magic Fill.
- Replace the backend placeholder `test` script with a real test runner.
