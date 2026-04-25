import api from "./api";

export const undoProjectState = async (id) => {
    const res = await api.put(`/states/undo/${id}`);
    return res.data;
};

export const redoProjectState = async (id, data) => {
    const res = await api.put(`/states/redo/${id}`);
    return res.data;
};