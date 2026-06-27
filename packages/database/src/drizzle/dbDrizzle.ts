import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL)
    throw new Error("DATABASE_URL not found in env");


const postgresClient = new Pool({ connectionString: DATABASE_URL });

let db: ReturnType<typeof drizzle>;

export function getDB() {
    if (!db)
        db = drizzle({ client: postgresClient });
    return db;
}