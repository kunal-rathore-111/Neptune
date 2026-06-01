import { Hono } from 'hono';
import { cors } from 'hono/cors';

import 'dotenv/config';
import { secureHeaders } from 'hono/secure-headers';
import { magicRoute } from './routes/magic-fill';
import { embeddingRoute } from './routes/embedding';
import { chatRouter } from './routes/chat';

const app = new Hono(); // same as express just faster

app.use('*', secureHeaders()); //same as helmet in express

const BACKEND_URL = process.env.BACKEND_URL;

if (!BACKEND_URL) throw new Error("BACKEND_URL not found in aiServer");

const origins = [process.env.BACKEND_URL, 'http://localhost:5173'].filter(
  (o): o is string => Boolean(o),
);

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return origin; // allow Postman
      if (origins.includes(origin)) return origin; // allow known origins
      return ''; // block everything else
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    maxAge: 24 * 60 * 60,
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.get('/', (c) => {
  return c.json(
    {
      message: 'On initial route of aiServer',
    },
    200,
  );
});

app.route('/magic-fill', magicRoute);
app.route('/embedding', embeddingRoute);
app.route('/chat', chatRouter);

export default {
  port: 3002,
  fetch: app.fetch,
};

