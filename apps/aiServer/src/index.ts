import { Hono } from 'hono';
import { cors } from 'hono/cors';

import 'dotenv/config';
import { secureHeaders } from 'hono/secure-headers';
import { magicRoute } from './routes/magic-fill';
import { embeddingRoute } from './routes/embedding';
import { chatRouter } from './routes/chat';

const app = new Hono(); // same as express just faster

app.use('*', secureHeaders()); //same as helmet in express

const origins = [process.env.Frontend_URL, 'http://localhost:5173'].filter((origin): origin is string =>
  Boolean(origin),
);

app.use('*', async (c, next) => {
  const origin = c.req.header('origin');

  if (origin && !origins.includes(origin)) {
    return c.json({ message: 'Invalid Origin' }, 500);
  }

  await next();
});

app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return '';
      if (origins.includes(origin)) return origin;
      return '';
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE'],
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

if (process.env.VERCEL !== 'true') {
  Bun.serve({
    port: 3002,
    fetch: app.fetch,
  });
  console.log('aiServer started at port 3002');
}

export default app;
