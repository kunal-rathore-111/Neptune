import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';

import { requestIdMiddleware } from './middlewares/requestIdMiddleware';

import { indexRoute } from './routes/indexRoute';
import { errorMiddleware } from './middlewares/errorMiddleware';

import { globalLimiter } from './utils/limiter';
import AppError from './middlewares/appError';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(helmet());
app.use(morgan('dev'));

//app.use(globalLimiter);

const origins = [process.env.Frontend_URL, 'http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow for postman and mobileapps
      if (origins.includes(origin))
        return callback(null, true); // allow the defined domains in origins array to access the server
      else return callback(new AppError('Invalid Origin', 500, 'CorsError')); // if any other origin then return with error
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    maxAge: 24 * 60 * 60, // 24 hours browser keep cache the cors so no options request for next 24 hrs again
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(cookieParser());


//initial route
app.get('/', (req, res) => {
  res.json({ message: 'Hii from initial route' });
});

app.use('/app/v3', requestIdMiddleware, indexRoute);

app.use(errorMiddleware); // catches all errors, apperror -- if we put it at top then all request will be considered as error

if (process.env.VERCEL !== 'true') {
  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
  });
}
export default app; // for deployment
