import postgres from "postgres";
import AppError from "../middlewares/appError";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from '../drizzle/schema';
import { DATABASE_URL } from "../utils/envVariables";



const postgresClient = postgres(DATABASE_URL);

export const db = drizzle(postgresClient, { schema, logger: true }) 