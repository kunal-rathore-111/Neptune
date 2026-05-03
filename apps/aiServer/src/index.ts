import { Hono } from 'hono';

import dotenv from 'dotenv';
import { secureHeaders } from 'hono/secure-headers';
import { magicRoute } from './routes/magic-fill';

const app = new Hono(); // same as express just faster

dotenv.config();
app.use('*', secureHeaders()); //same as helmet in express

app.route('/magic-fill', magicRoute);

app.get('/', (c) => {
  return c.json(
    {
      message: 'On initial route of aiServer',
    },
    200,
  );
});

// bun modern way to run server as hono don't provide app.listen()
export default {
  port: 3002,
  fetch: app.fetch,
};
