import express from 'express';
import { ExpressAuth } from '@auth/express';

const app = express();
app.use('/auth', (req, res, next) => {
  console.log("URL:", req.url);
  console.log("Original URL:", req.originalUrl);
  console.log("Base URL:", req.baseUrl);
  console.log("Path:", req.path);
  return ExpressAuth({
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
