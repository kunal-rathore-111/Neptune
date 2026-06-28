import { ValidateOtpUrl } from "@/api/urls";
import axios from "axios";



export async function validateOtpService(formData: FormData) {
    const email = formData.get('email');
    const otp = formData.get('otp');
    const type = formData.get('type');

    const response = await axios(ValidateOtpUrl, {
        data: { email, otp, type },
        method: 'POST',
        withCredentials: true,
        validateStatus: () => true // no  error will thrown on 404, 403 etc
    });
    return response.data;

}