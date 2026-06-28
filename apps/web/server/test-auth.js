import express from 'express';
const app = express();
app.use('/auth/*', (req, res, next) => {
  console.log("req.originalUrl:", req.originalUrl);
  console.log("req.url:", req.url);
  console.log("req.path:", req.path);
  res.send('ok');
});
app.listen(3001, () => {
  console.log('Test server started on 3001');
});
