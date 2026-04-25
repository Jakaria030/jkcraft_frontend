import api from "./api";

export const getCurrentVersionProject = async (id) => {
    const res = await api.get(`/versions/${id}`);
    return res.data;
};

export const updateCurrentVersionProject = async (id, data) => {
    const res = await api.put(`/versions/${id}`, data);
    return res.data;
};