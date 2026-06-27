import { ResetPasswordUrl } from "@/api/urls";
import axios from "axios";



export async function resetPasswordService(formData: FormData) {

    const email = formData.get('email');
    const password = formData.get('password');
    const response = await axios(ResetPasswordUrl,
        {
            method: "POST",
            data: { email, password },
            withCredentials: true,
            validateStatus: () => true, // skip from throwing error on 404, 403 etc
        }
    )

    return response.data;
}