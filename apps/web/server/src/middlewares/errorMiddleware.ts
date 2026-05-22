import type { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../utils/envVariables';

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  const isProduction = NODE_ENV === 'production';

  let message = err?.message || 'Something went wrong';
  let statusCode = Number(err?.statusCode || err?.status || 500);
  let errorType = err?.errorType || 'ServerError';

  let shouldShown = err?.shouldShown;

  let requestId = req?.requestId || 'unknown';

  const errorCode = err?.code || err?.cause?.code;
  const errorName = err?.name;

  // Postgres unique constraint error (23505)
  if (errorCode === '23505') {
    statusCode = 409;
    errorType = 'ConflictError';
    message = 'Data already exists';
    shouldShown = true;
  }
  // Drizzle errors
  else if (errorName === 'DrizzleError' || errorName === 'DrizzleQueryError' || errorName?.includes('Drizzle')) {
    statusCode = Math.max(400, statusCode);
    errorType = 'BadRequest';
    message = err?.message || message;
    shouldShown = true;
  }
  //jwt errors
  else if (errorName === 'JsonWebTokenError') {
    statusCode = 401;
    errorType = 'Unauthorized';
    message = 'Invalid token';
    shouldShown = true;
  } else if (errorName === 'TokenExpiredError') {
    statusCode = 401;
    errorType = 'Unauthorized';
    message = 'Token expired';
    shouldShown = true;
  }

  const isServerError = statusCode >= 500;
  // Use the calculated statusCode, but mask unexpected 500+ errors in production if desired.
  // Here we use the updated statusCode for the response.
  const responseStatus = isServerError ? 500 : statusCode;

  // common func. to use in both clientside and serverside errors
  function showErrors() {
    console.error('requestId: ', requestId);
    console.error('statusCode: ', statusCode);
    console.error('errorType: ', errorType);
    console.error('Message: ', message);

    // full log for server side error
    if (isServerError) {
      console.error('Stack:', err?.stack);
      console.error('\n\n\nCOMPLETE Error-\n', err);
    }

    console.error('-----------------------');
  }

  if (isServerError) {
    console.error('----Server Side Error----');
    showErrors();
  } else {
    console.error('----Client Side Error----');
    showErrors();
  }

  // if in production and the error was server error and the error is something except the all above possiblites then hard code the message to show to end user
  if (isProduction && isServerError && !shouldShown) {
    statusCode = 500;
    errorType = 'ServerError';
    message = 'Something went wrong';
  }

  res.status(responseStatus).json({
    requestId,
    errorType,
    message,
    status: 'error',
  });
};
