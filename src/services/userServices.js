import api from "./api.js";

export const registerUser = async (data) => {
    const response = await api.post("/users/register", data);
    return response.data;
};

export const loginUser = async (data) => {
    const response = await api.post("/users/login", data);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post("/users/logout");
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get("/users/profile");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.put("/users/profile", data);
    return response.data;
};

export const changePassword = async (data) => {
    const response = await api.put("users/change-password", data);
    return response.data;
};