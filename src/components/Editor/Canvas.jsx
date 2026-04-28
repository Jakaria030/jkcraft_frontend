import { Component, useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import { useEditor } from "../../context/EditorContext";
import tailwindPlugin from 'grapesjs-tailwindcss-plugin';
import { addCustomBlocks } from "../../lib/addCustomBlocks";
import { useProject } from "../../context/ProjectContext";
import ToolbarModal from "./modals/ToolbarModal";
import { applyThemeToCanvas } from "../../utils/applyThemeToCanvas";


const Canvas = () => {
    const { project } = useProject();
    const { editor, setEditor, selectedType, setSelectedType } = useEditor();
    const containerRef = useRef(null);

    // Init editor
    useEffect(() => {
        if (!editor) {
            const e = grapesjs.init({
                container: containerRef.current,
                height: "100%",
                width: "100%",
                fromElement: false,
                storageManager: false,

                panels: {
                    defaults: [],
                },

                blockManager: {
                    appendTo: null,
                    blocks: [],
                },

                styleManager: {
                    appendTo: null,
                    sectors: [],
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

                deviceManager: {
                    devices: [
                        { name: "desktop", width: "" },
                        { name: "laptop", width: "1024px" },
                        { name: "tablet", width: "768px" },
                        { name: "mobile", width: "375px" },
                    ],
                },

                plugins: [tailwindPlugin],
                pluginsOpts: {
                    [tailwindPlugin]: {
                        autobuild: true,
                        autocomplete: false,
                    },
                },
            });

            // Add custom block add 
            addCustomBlocks(e);

            setEditor(e);
        }
    }, [editor, setEditor]);

    // Load project
    useEffect(() => {
        if (!editor || !project?.gjsData) return;

        editor.loadProjectData(project.gjsData);
    }, [editor, project?.gjsData]);


    return (
        <div className="relative h-full w-full">
            <div ref={containerRef} className="h-full w-full" />

            {/* Open toolbar modal */}
            {selectedType && (
                <ToolbarModal
                    type={selectedType}
                    onClose={() => setSelectedType(null)}
                />
            )}
        </div>
    );
};

export default Canvas;