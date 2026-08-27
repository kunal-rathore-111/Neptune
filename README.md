# 🪐 Neptune (2nd Mind)

<div align="center">

![Neptune Banner](https://img.shields.io/badge/Neptune-AI--Powered%20Second%20Brain-6366f1?style=for-the-badge&logo=brain&logoColor=white)

**An AI-Powered Personal Knowledge Base & Smart Bookmark Platform for Engineers, Researchers, and Creators.**

[![Bun](https://img.shields.io/badge/Bun-v1.3.5-fbf0df?style=flat-square&logo=bun&logoColor=black)](https://bun.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-v2.10-ef4444?style=flat-square&logo=turborepo&logoColor=white)](https://turbo.build/)
[![React](https://img.shields.io/badge/React-v19.2-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Hono](https://img.shields.io/badge/Hono-v4.12-e36002?style=flat-square&logo=hono&logoColor=white)](https://hono.dev/)
[![Express](https://img.shields.io/badge/Express-v5.1-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-pgvector-4169e1?style=flat-square&logo=postgresql&logoColor=white)](https://github.com/pgvector/pgvector)
[![LangChain](https://img.shields.io/badge/LangChain-AI-1C3C3C?style=flat-square&logo=langchain&logoColor=white)](https://langchain.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

</div>

---

## 🚀 Overview

Modern knowledge workers and developers save hundreds of articles, repositories, documents, and videos daily. Traditional bookmark tools result in fragmented, unsearchable "bookmark graveyards" where critical information is routinely lost.

**Neptune (2nd Mind)** bridges this gap by acting as an **intelligent extension of human memory**. It automatically parses web content, generates vector embeddings, categorizes saved links, and powers a contextual RAG (Retrieval-Augmented Generation) assistant so you can instantly search or converse directly with your saved library.

---

## ✨ Core Features

- **⚡ Instant Search**: Zero-latency, multi-attribute filtering by title, URL, tag, description, or category.
- **🪄 AI Magic-Fill**: Automatic URL metadata extraction, AI summary generation, auto-tagging, and smart category assignment.
- **💬 RAG Assistant (Neptune AI)**: Context-aware AI chatbot powered by LangChain and Groq/Gemini that answers questions grounded directly in your stored bookmarks.
- **🏷️ Smart Taxonomies**: Built-in category management (*Development, Design, Productivity, DevOps, AI & Research, Finance*) with custom color-coded tags.
- **🔗 Shareable Knowledge Hub**: Public hash links for sharing individual content items or full personal profile collections.
- **🔐 Enterprise Security**: Private-by-default architecture, email OTP verification, password reset flows, JWT session tokens, and strict CORS/rate limiting.

---

## 🏗️ System Architecture

Neptune is built as a high-performance monorepo, decoupling client rendering, core API management, and AI retrieval microservices.

```mermaid
flowchart TD
    subgraph Client ["💻 Client Layer"]
        UI["React 19 SPA (Vite + Tailwind v4)\nRedux Toolkit + TanStack Query"]
    end

    subgraph Backend ["⚡ Web API Server (Express)"]
        API["Express v5 API Server\nAuth, Content Management, Sharing & OTP"]
    end

    subgraph AIService ["🤖 AI Microservice (Hono + Bun)"]
        AI["Hono Microservice\nWeb Scraper + Vector Embeddings + RAG"]
        LLM["LangChain Pipeline\nGoogle Gemini & Groq Models"]
        AI --> LLM
    end

    subgraph Storage ["💾 Data & Vector Engine"]
        DB[("PostgreSQL Database\nDrizzle ORM + pgvector\nHNSW Cosine Indexing (768-dim)")]
    end

    UI -->|"REST API Requests"| API
    UI -->|"RAG Queries & Magic-Fill"| AI
    API -->|"Data Persistence & User Auth"| DB
    AI -->|"Vector Storage & Similarity Search"| DB
    AI -->|"Live Web Scraping (Cheerio)"| Web["🌐 External Web Pages"]
```

---

## 🛠️ Tech Stack

| Component | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend UI** | React 19, Vite, Tailwind CSS v4, Framer Motion, Redux Toolkit, TanStack Query | Responsive SPA with real-time UI updates and smooth animations |
| **Web API Server** | Express.js v5, Node.js / Bun, TypeScript, Helmet, Cookie Parser | Core REST backend for authentication, authorization, and CRUD ops |
| **AI Engine** | Hono, Bun, LangChain, Google Gemini (`text-embedding-004`), Groq (`llama-3.3-70b`) | High-speed microservice for metadata scraping, embeddings, and RAG |
| **Database** | PostgreSQL, Drizzle ORM, `pgvector` extension | Relational data store with 768-dimensional vector cosine distance search |
| **Monorepo** | Turborepo, Bun Workspaces | Workspace management, task execution pipeline, and shared packages |

---

## 📁 Repository Structure

```
Neptune/
├── apps/
│   ├── web/
│   │   ├── client/          # React 19 + Vite SPA Frontend
│   │   └── server/          # Express REST API Backend
│   └── aiServer/            # Bun + Hono AI Microservice (Magic-Fill, Embeddings & RAG)
├── packages/
│   ├── database/            # Drizzle ORM schemas & pgvector configuration
│   ├── validator/           # Shared Zod validation schemas
│   ├── ui/                  # Shared UI component library
│   ├── icons/               # Shared icon assets
│   ├── libs/                # Shared utility functions
│   ├── typescript-config/   # Shared TypeScript configurations
│   └── eslint-config/       # Shared ESLint rules
├── package.json             # Monorepo root configuration
└── turbo.json               # Turborepo build pipeline
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Bun**: `^1.3.5` (or Node.js `>= 18`)
- **PostgreSQL**: `^15` with `pgvector` extension enabled
- **API Keys**: Google Gemini AI Key and/or Groq API Key

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/your-org/neptune.git
cd neptune

# Install workspace dependencies
bun install
```

### 2. Environment Setup

Create `.env` files in `apps/web/server` and `apps/aiServer`:

```bash
# apps/web/server/.env
PORT=3001
DATABASE_URL="postgresql://user:password@localhost:5432/neptune"
JWT_SECRET="your-secure-jwt-secret"
AI_SERVER_URL="http://localhost:3002"

# apps/aiServer/.env
PORT=3002
BACKEND_URL="http://localhost:3001"
GEMINI_API_KEY="your-gemini-api-key"
GROQ_API_KEY="your-groq-api-key"
```

### 3. Database Migrations

Generate and push database schemas using Drizzle Kit:

```bash
bun run drizzle:generate
bun run drizzle:push
```

### 4. Running Local Servers

Start all microservices and the frontend SPA concurrently:

```bash
bun dev
```

- **Frontend App**: `http://localhost:5173`
- **Web API Server**: `http://localhost:3001`
- **AI Microservice**: `http://localhost:3002`

---

## 🧪 Available Scripts

| Command | Action |
| :--- | :--- |
| `bun run dev` | Start all applications concurrently in development mode |
| `bun run build` | Build all frontend apps, servers, and shared packages |
| `bun run lint` | Run ESLint checks across the monorepo |
| `bun run check-types` | Run TypeScript type checking across all workspaces |

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
