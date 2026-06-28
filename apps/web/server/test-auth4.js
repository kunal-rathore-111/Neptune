import express from 'express';
import { ExpressAuth } from '@auth/express';

const app = express();
app.use('/auth', (req, res, next) => {
  return ExpressAuth({
    providers: [
      { id: 'github', name: 'GitHub', type: 'oauth', authorization: 'https://github.com/login/oauth/authorize' }
    ],
    secret: "abcdefghijklmnopqrstuvwxyz123456",
    trustHost: true
  })(req, res, next);
});

app.listen(3001, () => {
  console.log('Test server started on 3001');
});
