import { useEffect, useRef } from "react";
import grapesjs from "grapesjs";

const Canvas = () => {
    const editorRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!editorRef.current) {
            const editor = grapesjs.init({
                container: containerRef.current,
                height: "100%",
                fromElement: false,

                storageManager: false,

                // remove all default UI
                panels: { defaults: [] },

                blockManager: {
                    appendTo: null,
                },

                styleManager: {
                    appendTo: null,
                },

                layerManager: {
                    appendTo: null,
                },

                selectorManager: {
                    appendTo: null,
                },

                traitManager: {
                    appendTo: null,
                },
            });

            editorRef.current = editor;

            // expose globally for testing
            window.editor = editor;
        }
    }, []);

    return (
        <div className="h-full w-full">
            <div ref={containerRef} className="h-full w-full" />
        </div>
    );
};

export default Canvas;