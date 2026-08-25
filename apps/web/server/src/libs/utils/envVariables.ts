


if (!process.env.AI_SERVER_URL) {
  console.warn('[Warning] AI_SERVER_URL is missing in environment variables');
}

if (!process.env.DATABASE_URL) {
  console.warn('[Warning] DATABASE_URL is missing in environment variables');
}

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const NODE_ENV = process.env.NODE_ENV || 'production';
export const AI_Server_URL = process.env.AI_SERVER_URL || '';

