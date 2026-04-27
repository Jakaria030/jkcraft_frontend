export const generateModalTitle = (type) => {
    if (type === "text") return "Edit Text";
    if (type === "my-button") return "Edit Button";
    if (type === "my-image") return "Edit Image";
    if (type === "my-video") return "Edit Video";
    if (type === "my-map") return "Edit Map";
    if (type === "my-container") return "Edit Container";
    if (type === "my-div") return "Edit Div";

    return "Modal";
};