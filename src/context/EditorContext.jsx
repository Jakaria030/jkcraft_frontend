import { createContext, useContext, useEffect, useState } from "react";

const EditorContext = createContext(null);

export const EditorProvider = ({ children }) => {
    const [editor, setEditor] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    useEffect(() => {
        if (!editor) return;

        editor.on("component:selected", (component) => {
            const type = component.get("type");

            if (type === "text" || type === "link" || type === "my-button") {
                setSelectedType(type === "link" ? "text" : type);
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