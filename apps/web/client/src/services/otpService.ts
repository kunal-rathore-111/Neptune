import { SendOtpUrl } from "@/api/urls";
import axios from "axios";



export async function otpService(email: string, type: 'forgotPassword' | 'createAccount') {

    const response = await axios(SendOtpUrl,
        {
            method: "POST",
            data: { email, type },
            validateStatus: () => true //  Prevents Axios from throwing errors on 404, 400, etc.
        }
    )

    return response.data;
}