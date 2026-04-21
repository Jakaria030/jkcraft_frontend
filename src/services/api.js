import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/users/login") || originalRequest.url.includes("/users/register")) {
        return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const refreshToken = localStorage.getItem("refreshToken");
            const res = await axios.post("http://localhost:3000/api/users/refresh-token", {
                refreshToken,
            });

            const newAccessToken = res.data.data.accessToken;
            localStorage.setItem("accessToken", newAccessToken);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (err) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
           window.location.href = "/";
        }
    }

    return Promise.reject(error);
});

export default api;