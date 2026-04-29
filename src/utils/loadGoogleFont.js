export const loadGoogleFont = (editor, font) => {
    if (!editor || !font) return;

    const canvasDoc = editor.Canvas.getDocument();
    const id = `font-${font.replace(/\s+/g, "-")}`;

    // prevent duplicate loading
    if (canvasDoc.getElementById(id)) return;

    const link = canvasDoc.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
        /\s+/g,
        "+"
    )}:wght@300;400;500;600;700&display=swap`;

    canvasDoc.head.appendChild(link);
};