import rateLimit from "express-rate-limit";


const defaultArgs = {
    message: "Your limit is reached, Please try after again after minutes",
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
}


export const globalLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5mints
    limit: 100,
    ...defaultArgs // auto includes the default arguments 
})

export const signLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3mints
    limit: 10,
    ...defaultArgs
})


