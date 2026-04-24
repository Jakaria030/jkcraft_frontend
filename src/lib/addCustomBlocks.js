export const addCustomBlocks = (editor) => {
    // Text 
    editor.DomComponents.addType("my-text", {
        model: {
            defaults: {
                tagName: "p",
                content: "Text here",
                attributes: {
                    class: "p1",
                },
                draggable: true,
                droppable: false,
            },
        },
    });

    // Heading
    editor.DomComponents.addType("my-heading", {
        model: {
            defaults: {
                tagName: "h1",
                content: "Heading",
                attributes: {
                    class: "h1",
                },
            },
        },
    });

    // Link
    editor.DomComponents.addType("my-link", {
        model: {
            defaults: {
                tagName: "a",
                content: "Link",
                attributes: {
                    class: "a",
                },
            },
        },
    });

    // Button
    editor.DomComponents.addType("my-button", {
        model: {
            defaults: {
                tagName: "button",
                content: "Click me",
                attributes: {
                    class: "btn-primary",
                },
            },
        },
    });

    // Image
    editor.DomComponents.addType("my-image", {
        model: {
            defaults: {
                tagName: "img",
                draggable: true,
                attributes: {
                    src: "https://placehold.co/400x200",
                },
            },
        },
    });

    // Video
    editor.DomComponents.addType("my-video", {
        model: {
            defaults: {
                tagName: "iframe",
                draggable: true,
                droppable: false,
                attributes: {
                    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                    frameborder: "0",
                    allow:
                        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                    allowfullscreen: true,
                },
                style: {
                    width: "100%",
                    height: "315px",
                },
            },
        },
    });

    // Map
    editor.DomComponents.addType("my-map", {
        model: {
            defaults: {
                tagName: "iframe",
                draggable: true,
                droppable: false,
                attributes: {
                    src: "https://www.google.com/maps/embed?pb=",
                    width: "100%",
                    height: "250",
                    loading: "lazy",
                    style: "border:0",
                },
                style: {
                    width: "100%",
                    height: "250px",
                },
            },
        },
    });

    // Container
    editor.DomComponents.addType("my-container", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                attributes: {
                    class: "main-container",
                },
                style: {
                    height: "300px",
                    background: "#ddd",
                },
            },
        },
    });

    // Div
    editor.DomComponents.addType("my-div", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                draggable: true,
                attributes: {
                    class: "div",
                },
                style: {
                    height: "300px",
                    background: "#ddd",
                },
            },
        },
    });

    // Columns 1
    editor.DomComponents.addType("my-cols-1", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                ],
            },
        },
    });

    // Columns 2
    editor.DomComponents.addType("my-cols-2", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                ],
            },
        },
    });

    // Columns 3
    editor.DomComponents.addType("my-cols-3", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                    {
                        type: "my-container",
                        style: { flex: 1, height: "200px", background: "#ddd" },
                    },
                ],
            },
        },
    });

    // Slider
    editor.DomComponents.addType("my-slider", {
        model: {
            defaults: {
                tagName: "div",
                droppable: true,
                draggable: true,
                attributes: {
                    class: "slider-wrapper",
                },
                style: {
                    display: "flex",
                    gap: "10px",
                    overflowX: "auto",
                },
                components: [
                    {
                        tagName: "div",
                        attributes: { class: "slide" },
                        content: "Slide 1",
                        style: {
                            padding: "20px",
                            background: "#eee",
                        },
                    },
                    {
                        tagName: "div",
                        attributes: { class: "slide" },
                        content: "Slide 2",
                        style: {
                            padding: "20px",
                            background: "#ddd",
                        },
                    },
                ],
            },
        },
    });
};