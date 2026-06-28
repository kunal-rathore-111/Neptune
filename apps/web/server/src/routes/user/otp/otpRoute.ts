
import express from 'express';
import { emailController } from '../../../controllers/user/emailController';
import { emailOtpInputMiddleware } from '../../../middlewares/emailOtpInputMiddleware';
import { validateOtpInputMiddleware } from '../../../middlewares/validateOtpInputMiddleware';
import { otpController } from '../../../controllers/user/otpController';

export const otp = express();


otp.post('/email/send-otp', emailOtpInputMiddleware, emailController.sendOTP);

otp.post('/validate-otp', validateOtpInputMiddleware, otpController.validateOtp);