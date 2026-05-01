import axios from "axios";
// using interceptor for 401 error so can redirect fast , if use handleerror it was very late in the stack of API calling
export const axiosInstance = axios.create({ withCredentials: true });

axiosInstance.interceptors.response.use(
  (response) => response, //if successfull axios then return reponse as it is
  //if fails then
  (error) => {
    // console.error("----", );
    if (
      error.response.status === 401 &&
      error.response.data.message !== "Wrong password"
    ) {
      // redirect to signin
      //      window.location.href = "/sign-in";
    }
    return Promise.reject(error); // pass the error ahead
  },
);
