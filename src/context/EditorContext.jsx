import { createContext, useContext, useEffect, useState } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
    const [editor, setEditor] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        if (!editor) return;

        editor.on("component:selected", (component) => {
            const type = component.get("type");

            const types = ["text", "link", "my-button", "my-image", "my-video", "my-map", "my-container", "my-cols-1", "my-cols-2", "my-cols-3", "my-div"];
            if (types.includes(type)) {
                let selectedType = null;
                if (type === "link") selectedType = "text";
                else if (type === "my-cols-1" || type === "my-cols-2" || type === "my-cols-3") selectedType = "my-container";
                else selectedType = type;

                setSelectedType(selectedType);
            } else {
                setSelectedType(null);
            }
        });

        editor.on("component:deselected", () => {
            setSelectedType(null);
        });
    }, [editor]);

    return (
        <EditorContext.Provider value={{
            editor, setEditor,
            selectedType, setSelectedType,
        }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => useContext(EditorContext);