import express from 'express';
import { ExpressAuth } from '@auth/express';
import GitHub from '@auth/express/providers/github';

const app = express();
app.use('/api/auth', (req, res, next) => {
  return ExpressAuth({
    basePath: "/api/auth",
    trustHost: true,
    secret: "test_secret_123",
    providers: [GitHub({ clientId: "a", clientSecret: "b" })],
  })(req, res, next);
});

app.listen(3001, () => {
  console.log('Test server started on 3001');
});
