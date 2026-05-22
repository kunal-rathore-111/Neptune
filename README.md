# 🪐 Neptune — Your AI-Powered Second Mind

[![Turborepo](https://img.shields.io/badge/Monorepo-Turborepo-EF4444?style=for-the-badge&logo=turbo)](https://turbo.build/)
[![React 19](https://img.shields.io/badge/Frontend-React%2019-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript 5.9](https://img.shields.io/badge/Language-TypeScript%205.9-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Bun Runtime](https://img.shields.io/badge/Runtime-Bun%201.3-FBF0DF?style=for-the-badge&logo=bun)](https://bun.sh/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%26%20pgvector-4169E1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle%20ORM-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)

Neptune is a premium, high-performance **Retrieval-Augmented Generation (RAG)** knowledge curation platform and intelligent bookmarking engine. Built for users who live in the browser, Neptune eliminates manual information curation by leveraging an asynchronous AI microservices architecture to scrape, categorize, tag, and chat with saved web contents semantically.

---

## 🚀 **Quick Recap for Technical Interviewers & HR**
*If you are evaluating my technical depth, here is the architectural and algorithmic complexity engineered into Neptune:*

* **Asynchronous Microservices & Monorepo Strategy**: Managed as a **Turborepo Monorepo** separating the high-traffic Express backend from the CPU-heavy AI operations running on a dedicated **Hono + Bun AI Microservice**, communicating via REST APIs. This prevents LLM inference and scraping operations from blocking the main event loop.
* **Semantic RAG Engine with pgvector**: Integrated **pgvector** inside PostgreSQL. User content is embedded into high-dimensional vectors (768 dimensions using Gemini embeddings). We built a **cosine-similarity semantic search** backed by high-speed **HNSW (Hierarchical Navigable Small World) indices** in PostgreSQL for $O(\log N)$ semantic retrieval.
* **Intellectual "Magic Fill" Web Scraping**: Pasting a URL triggers asynchronous scraping using **Cheerio**, extracting the raw HTML DOM, cleaning the main body text, and utilizing **structured JSON outputs (Structured LLM Inference)** via Groq/Gemini to extract titles, 1-2 sentence summaries, auto-categorize into domain-specific sectors, and generate custom tag arrays.
* **Context-Aware Interactive Chatbot**: Implemented a chat-with-bookmarks system. When the user asks a question, Neptune executes a hybrid search (vector search context + chat history), formats the context inside system prompts strictly constrained to 200 words, and allows full semantic drilling inside an interactive slide drawer.
* **Modern Type-Safe Stack**: Unified validation schemas shared between client, server, and AI microservice using custom packages (`@repo/validation` via **Zod**), **Vite 8**, **Tailwind CSS v4**, **Redux Toolkit**, **Tanstack React Query** for data fetching caching, and **Express v5** running on **Bun**.

---

## 📐 **System Architecture & Data Flow**

Neptune's services are separated to ensure high availability, fast cold-starts, and modular scaling.

```mermaid
flowchart TD
    subgraph Client [Client Workspace - React 19 + Redux]
        UI[Tailwind v4 UI]
        RQ[TanStack Query Cache]
        UI -->|URL Bookmark Request| RQ
    end

    subgraph WebServer [Backend Workspace - Express v5 + Bun]
        API[Express Gateway / API]
        DB_ORM[Drizzle ORM]
        DB[("PostgreSQL + pgvector")]
        API -->|Fetch & Save Bookmarks| DB_ORM
        DB_ORM -->|Read/Write Schemas| DB
    end

    subgraph AIServer [AI Microservice Workspace - Hono + Bun]
        HonoAPI[Hono Gateway]
        Scraper[Cheerio Scraper]
        LLM[Langchain + Groq/Gemini]
        Embed[Gemini Vector Embeddings]
        HonoAPI -->|Scrape Request| Scraper
        HonoAPI -->|Semantic Embed Query| Embed
        HonoAPI -->|RAG Prompts| LLM
    end

    RQ -->|API Calls / HTTP-Only Cookies| API
    API -->|Async AI Actions| HonoAPI
    DB -.->|"Cosine Similarity Search (HNSW Index)"| Embed
```

---

## 🌟 **Key Features & Live Demo Insights**

### 1. 🪄 **Magic Fill: Hands-Free Knowledge Curation**
* **Problem:** Normal bookmarking systems require users to manually type titles, write descriptions, assign folders/categories, and think of relevant tags. This results in heavy user friction and unorganized collections.
* **Neptune's Solution:** Paste any URL, and Neptune handles the rest in <2 seconds:
  1. The **AI Microservice** web-scrapes the raw URL using **Cheerio**.
  2. The text is parsed, stripped of boilerplate code, and passed to a structured Groq/Gemini model.
  3. The model returns a perfectly formatted JSON containing a concise title, 1-2 sentence description, domain category (e.g., Development, Finance, Research), and an array of relevant tags.
  4. The frontend renders this instantly, allowing the user to simply hit save.

### 2. 🔍 **Semantic Search (Vector Search)**
* Traditional keyword matching fails when users search for concepts (e.g., searching for "caching database tools" when they bookmarked Redis).
* Neptune computes high-dimensional vector embeddings for all saved content based on `title + description + tags`.
* When a user searches, their query is embedded, and a **vector similarity query** is executed using `pgvector` inside PostgreSQL:
  ```sql
  -- Under the hood Drizzle index queries:
  SELECT id, title, description, category, tags
  FROM "contentTable"
  ORDER BY embedding <=> :queryEmbedding
  LIMIT 5;
  ```
* Backed by an **HNSW cosine-similarity index** on PostgreSQL to deliver sub-10ms search results over thousands of items.

### 3. 💬 **Neptune AI Chat Drawer (Interactive RAG Assistant)**
* Allows users to interact directly with their knowledge library.
* Selecting or searching bookmarks hydrates a conversational context window.
* The chatbot leverages a strict **System Persona Prompt** that prevents hallucination, focuses strictly on the curated content, and utilizes a concise 200-word conversational response budget formatted beautifully in GitHub Flavored Markdown.

### 4. 🔗 **Secure Cryptographic Share Links**
* Users can toggle public sharing for their entire dashboard profiles or individual cards.
* Powered by secure database relational schema triggers and unique cryptographic hashes (`linkHash`), preventing ID-harvesting and maintaining full data privacy while allowing seamless public collaboration.

---

## 🛠️ **Technological Breakdown (The Enterprise Stack)**

| Layer | Technologies | Key Design Choices & Rationale |
| :--- | :--- | :--- |
| **Frontend** | **React 19**, **Vite 8**, **Redux Toolkit**, **Tanstack Query v5**, **Tailwind CSS v4**, **Framer Motion** | • Redux handles UI/Sidebar collapsing transitions.<br>• Tanstack Query controls caching, optimistic UI updates, and loading states.<br>• Tailwind CSS v4 and Framer Motion provide fluid micro-animations. |
| **Backend** | **Node.js (Bun)**, **Express v5**, **Drizzle ORM**, **Zod** | • Express v5 handles fast routes and native promise rejections.<br>• Drizzle ORM provides complete SQL-level type safety.<br>• Zod guarantees request body sanitization at the gateway level. |
| **AI Microservice** | **Bun**, **Hono**, **Langchain**, **Cheerio**, **Google GenAI & Groq** | • Hono is an ultra-fast web framework optimized for edge-runtimes.<br>• Bun runtime ensures lightning-fast script cold starts.<br>• Cheerio provides low-overhead server-side scraping without spawning heavy browser instances. |
| **Database** | **PostgreSQL (Supabase)**, **pgvector** | • Full relational schema with cascading deletions.<br>• HNSW vector index using `vector_cosine_ops` to enable rapid semantic matching. |
| **DevOps / Monorepo** | **Turborepo**, **Prettier**, **ESLint**, Shared Workspace Packages | • Standardized package exports for icons, validation rules, typescript presets, and shared component libraries. |

---

## 🔒 **Production Security & Standards**

* **Secure HTTP-Only JWT Cookies**: Authentication details are stored in cryptographically signed, secure, HTTP-only cookies, eliminating the risk of XSS-based token theft.
* **Database Relational Integrity**: Full relational cascading deletes ensure no orphaned bookmarks remain in the database when a user deletes their profile.
* **Express Gatekeeping**: Configured with `helmet` for HTTP header security and `express-rate-limit` to prevent brute force and scraping abuse on endpoints.
* **Strict Type Safety**: TypeScript compiles both services and all shared monorepo packages, preventing runtime errors before they reach production.

---

## 💻 **Getting Started & Local Development**

### Prerequisites
* **Bun Runtime** (v1.3.5 or higher recommended)
* A running **PostgreSQL Database** instance (with the `vector` extension enabled)
* API Keys: Google Gemini API Key and/or Groq API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kunal-Rathore-111/Neptune.git
   cd Neptune
   ```

2. **Install Workspace Dependencies:**
   ```bash
   bun install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root, inside `apps/web/server/.env`, and `apps/aiServer/.env` following the `.env.example` templates.
   
   *AI Microservice `.env` requirements:*
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   PORT=4000
   ```
   
   *Express Backend `.env` requirements:*
   ```env
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=your_jwt_signing_secret
   PORT=8000
   ```

4. **Run Database Migrations:**
   ```bash
   cd apps/web/server
   bun run generatee
   bun run migratee
   cd ../../..
   ```

5. **Start Dev Mode (Turbo-powered Concurrent Dev Servers):**
   ```bash
   bun run dev
   ```
   *This single command starts the React Client, Express Server, and Hono AI Server concurrently, with live hot-reloading!*

---

## 🎨 **Design System & Aesthetics**
Neptune's interface is custom-tailored to provide a premium SaaS feeling:
* **Typography:** Premium layout utilizing Inter & Gabarito Variable Fonts for readability.
* **Dynamic Animations:** Micro-interactions on buttons, card selections, and collapsible sidebars built using custom framer-motion setups.
* **Layout Integrity:** Responsive collapsible sheets and adaptive flex architectures ensuring a perfect desktop, tablet, and mobile interface.

---

*Engineered with 💻 & ☕ by Kunal Rathore. Connect with me on [GitHub](https://github.com/Kunal-Rathore-111) or [LinkedIn](https://www.linkedin.com/in/kunal-rathore-11-in).*
