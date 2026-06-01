import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-library-management-system-4g73.onrender.com",
});


API.interceptors.request.use((req: any) => {

  const token =
    localStorage.getItem("token");

  if (token) {

    req.headers.Authorization =
      `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(

  (response) => response,

  async (error) => {

    const originalRequest =
      error.config;


    if (
      error.response?.status === 401
      &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      try {

        const refreshToken =
          localStorage.getItem(
            "refreshToken"
          );

        const res = await axios.post(

          "https://smart-library-management-system-4g73.onrender.com/auth/refresh",

          {
            refreshToken
          }

        );

        const newAccessToken =
          res.data.accessToken;

        localStorage.setItem(
          "token",
          newAccessToken
        );


        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;


        return API(originalRequest);

      } catch (refreshError) {

        localStorage.removeItem("token");

        localStorage.removeItem(
          "refreshToken"
        );

        localStorage.removeItem("user");

        window.location.href =
          "/login";

        return Promise.reject(
          refreshError
        );
      }
    }

    return Promise.reject(error);
  }
);

export default API;
