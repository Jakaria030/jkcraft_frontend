export const applyThemeToCanvas = (editor, theme) => {
    if (!editor || !theme) return;

    // Load Google Font into canvas iframe
    if (theme.typography?.fontFamily) {
        const fontFamily = theme.typography.fontFamily;
        const fontHref = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
            / /g,
            "+"
        )}:wght@300;400;500;600;700;800&display=swap`;

        const canvasDoc = editor.Canvas.getDocument();

        const existing = canvasDoc.querySelector(
            `link[data-font="${fontFamily}"]`
        );

        if (!existing) {
            const link = canvasDoc.createElement("link");
            link.rel = "stylesheet";
            link.href = fontHref;
            link.setAttribute("data-font", fontFamily);

            canvasDoc.head.appendChild(link);
        }
    }

    const cssRules = [];

    // Typography
    if (theme.typography) {
        const { fontFamily, textProperties } = theme.typography;

        cssRules.push(`
            body {
                font-family: '${fontFamily}', sans-serif;
            }
        `);

        Object.entries(textProperties).forEach(([tag, values]) => {
            const selector = tag.startsWith("p")
                ? `.${tag}`
                : tag;

            cssRules.push(`
                ${selector} {
                    font-size: ${values.fontSize}px;
                    font-weight: ${values.fontWeight};
                    line-height: ${values.lineHeight};
                    color: ${values.color};
                }
            `);
        });
    }

    // Colors
    if (theme.colors) {
        cssRules.push(`
            :root {
                --color-primary: ${theme.colors.primary};
                --color-secondary: ${theme.colors.secondary};
                --color-background: ${theme.colors.background};
                --color-text: ${theme.colors.text};
                --color-accent: ${theme.colors.accent};
            }
        `);
    }

    editor.setStyle(cssRules.join("\n"));
};