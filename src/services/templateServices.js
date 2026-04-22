import api from "./api";

export const getTemplatesInfo = async () => {
    const res = await api.get("/projects/templates");
    return res.data;
};