export const smartTruncate = (text, maxLength = 20) => {
    if (!text) return "";

    if (text.length <= maxLength) return text;

    return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
};