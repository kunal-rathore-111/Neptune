


if (!process.env.AI_SERVER_URL) throw new Error('AI_Server_URL is not found in Environment');

export const AI_Server_URL = process.env.AI_SERVER_URL;


if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not found in Environment');

export const DATABASE_URL = process.env.DATABASE_URL;



if (!process.env.NODE_ENV) throw new Error('DATABASE_URL is not found in Environment');
else if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'development')
    throw new Error('NODE_ENV is not configured correctly in Environment');

export const NODE_ENV = process.env.DATABASE_URL; 