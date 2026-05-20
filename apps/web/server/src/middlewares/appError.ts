
// global apperror class for differ the backend or user errors
export default class AppError extends Error {

    statusCode: number;
    errorType: string;
    shouldShown: boolean;

    constructor(message: string, statusCode: number, errorType: string, shouldShown?: boolean) {
        super(message); // set the err.message of Error class
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.shouldShown = shouldShown ?? true;

        Error.captureStackTrace(this, this.constructor); // it given correct stack of lines from where error thrown after skipping the between consturctor
    }
}
