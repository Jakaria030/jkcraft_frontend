export const addCustomBlocks = (editor) => {

    // Button
    editor.DomComponents.addType("my-button", {
        extends: "button",

        model: {
            defaults: {
                tagName: "button",
                draggable: true,
                droppable: false,

                attributes: {
                    type: "button",
                    class: "my-button",
                },

                components: [
                    {
                        type: "text",
                        content: "Click me",
                        editable: true,
                        selectable: false,
                        hoverable: false,
                    },
                ],
            },
        },

        view: {
            events: {
                click: "handleClick",
            },

            handleClick(e) {
                e.stopPropagation();
                this.em.get("Editor").select(this.model);
            },
        },
    });

    // Image
    editor.DomComponents.addType("my-image", {
        model: {
            defaults: {
                tagName: "img",
                draggable: true,
                droppable: false,
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
                tagName: "div",
                selectable: true,
                draggable: true,
                droppable: false,

                components: [
                    {
                        tagName: "video",
                        attributes: {
                            src: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
                            controls: true,
                        },
                        style: {
                            width: "100%",
                            height: "100%",
                            "pointer-events": "none",
                        },
                    },
                ],

                style: {
                    width: "600px",
                    height: "300px",
                },
            },
        },
    });

    // Map
    editor.DomComponents.addType("my-map", {
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: false,
                selectable: true,
                hoverable: true,

                attributes: {
                    class: "my-map-wrapper",
                },

                style: {
                    width: "100%",
                    height: "250px",
                    overflow: "hidden",
                    position: "relative",
                },

                components: [
                    {
                        tagName: "iframe",
                        attributes: {
                            src: "https://www.google.com/maps/embed?pb=",
                            loading: "lazy",
                        },
                        style: {
                            width: "100%",
                            height: "100%",
                            border: "0",
                            "pointer-events": "none",
                        },
                    },
                ],
            },
        },

        isComponent: (el) => {
            if (el.classList?.contains("my-map-wrapper")) {
                return { type: "my-map" };
            }
        },
    });

    // Section
    editor.DomComponents.addType("my-section", {
        model: {
            defaults: {
                tagName: "section",
                draggable: true,
                droppable: true,
                attributes: {
                    class: "my-section",
                },
                style: {
                    height: "300px",
                },
            },
        },
    });

    // Container
    editor.DomComponents.addType("my-container", {
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                attributes: {
                    class: "my-container",
                },
                style: {
                    width: "1440px",
                    height: "300px",
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
                    class: "my-div",
                },
                style: {
                    width: "100%",
                    height: "300px",
                },
            },
        },
    });

    // Columns 1
    editor.DomComponents.addType("my-cols-1", {
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                attributes: {
                    class: "my-cols-1",
                },
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
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
                draggable: true,
                droppable: true,
                attributes: {
                    class: "my-cols-2",
                },
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
                    },
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
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
                droppable: true,
                attributes: {
                    class: "my-cols-3",
                },
                style: {
                    display: "flex",
                    gap: "10px",
                },
                components: [
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
                    },
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
                    },
                    {
                        type: "my-div",
                        attributes: { class: "my-div" },
                        style: { flex: 1, height: "300px" },
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