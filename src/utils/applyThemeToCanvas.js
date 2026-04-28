export const applyThemeToCanvas = (editor, theme) => {
    if (!editor || !theme) return;

    const css = editor.Css;

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

    // Typography
    // ---------------------------
    if (theme.typography) {
        const { fontFamily, textProperties } = theme.typography;

        css.setRule('body', {
            'font-family': `'${fontFamily}', sans-serif`,
        });

        if (textProperties) {
            Object.entries(textProperties).forEach(([tag, values]) => {
                const selector = tag.startsWith("p")
                    ? `.${tag}`
                    : tag;

                css.setRule(selector, {
                    'font-size': `${values.fontSize}px`,
                    'font-weight': values.fontWeight,
                    'line-height': values.lineHeight,
                    color: values.color,
                });
            });
        }
    }

    // Colors (CSS Variables)
    if (theme.colors) {
        css.setRule(':root', {
            '--color-primary': theme.colors.primary,
            '--color-secondary': theme.colors.secondary,
            '--color-background': theme.colors.background,
            '--color-text': theme.colors.text,
            '--color-accent': theme.colors.accent,
        });

        // Button
        css.setRule('.my-button', {
            padding: '8px 16px',
            'border-radius': '5px',
            'background-color': 'var(--color-primary)',
            color: 'var(--color-text)',
        });

        // Section
        css.setRule('.my-section', {
            height: '300px',
            'background-color': 'var(--color-background)',
        });

        // Container
        css.setRule('.my-container', {
            width: '1440px',
            height: '300px',
            'background-color': 'var(--color-secondary)',
        });

        // Div
        css.setRule('.my-div', {
            height: '300px',
            'background-color': 'var(--color-secondary)',
        });

        // Columns
        css.setRule('.my-cols-1, .my-cols-2, .my-cols-3', {
            display: 'flex',
            gap: '10px',
        });
    }
};