import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: "./src/drizzle/migrations",
    schema: "./src/drizzle/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL as string
    },
    dialect: 'postgresql',
    verbose: true,
    strict: true
})

