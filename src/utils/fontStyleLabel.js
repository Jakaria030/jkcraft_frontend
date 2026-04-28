export const fontStyleLabel = (tag) => {
    if (tag === "h1") return "Heading 1";
    if (tag === "h2") return "Heading 2";
    if (tag === "h3") return "Heading 3";
    if (tag === "h4") return "Heading 4";
    if (tag === "h5") return "Heading 5";
    if (tag === "h6") return "Heading 6";
    if (tag === "p1") return "Paragraph 1";
    if (tag === "p2") return "Paragraph 2";
    if (tag === "p3") return "Paragraph 3";

    return "Select Style";
};