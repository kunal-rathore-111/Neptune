import express from 'express';
import { ExpressAuth } from '@auth/express';
import GitHub from '@auth/express/providers/github';

const app = express();
app.use('/api/auth', (req, res, next) => {
  return ExpressAuth({
    basePath: "/api/auth",
    trustHost: true,
    providers: [GitHub],
  })(req, res, next);
});

app.listen(3001, () => {
  console.log('Test server started on 3001');
});
