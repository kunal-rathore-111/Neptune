import { Hono } from 'hono';

import 'dotenv/config';
import { secureHeaders } from 'hono/secure-headers';
import { magicRoute } from './routes/magic-fill';
import { embeddingRoute } from './routes/embedding';
import { chatRouter } from './routes/chat';

const app = new Hono(); // same as express just faster

app.use('*', secureHeaders()); //same as helmet in express



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

// bun modern way to run server on hono do not provide app.listen() like express
export default {
  port: 3002,
  fetch: app.fetch,
};
