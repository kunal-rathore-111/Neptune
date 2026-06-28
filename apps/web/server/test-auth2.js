import express from 'express';
import { ExpressAuth } from '@auth/express';

const app = express();
app.use('/api/auth', ExpressAuth({
  providers: [],
  trustHost: true
}));

app.listen(3001, () => {
  console.log('Test server started on 3001');
});
