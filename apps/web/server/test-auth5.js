import express from 'express';
import { ExpressAuth } from '@auth/express';

const app = express();
app.use('/auth', (req, res, next) => {
  return ExpressAuth({
    basePath: "/auth",
    providers: [
      { id: 'google', name: 'Google', type: 'oauth', authorization: 'https://accounts.google.com/o/oauth2/v2/auth' }
    ],
    secret: "abcdefghijklmnopqrstuvwxyz123456",
    trustHost: true
  })(req, res, next);
});

app.listen(3001, () => {
  console.log('Test server started on 3001');
});
