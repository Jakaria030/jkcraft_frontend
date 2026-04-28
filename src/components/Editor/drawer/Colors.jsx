import { FiArrowLeft } from "react-icons/fi";
import Row from "./Row";
import { useEffect, useState } from "react";
import { useProject } from "../../../context/ProjectContext";
import { applyThemeToCanvas } from "../../../utils/applyThemeToCanvas";
import { useEditor } from "../../../context/EditorContext";

const DEFAULT_COLORS = {
    primary: "#3BC9A2",
    secondary: "#dddddd",
    background: "#ffffff",
    text: "#1F2937",
    accent: "#4B5563",
};

const Colors = ({ onBack }) => {
    const { project, updateTheme, saveProject } = useProject();
    const { editor } = useEditor();
    const [isThemeSaving, setIsThemeSaving] = useState(false);
    const [colors, setColors] = useState(DEFAULT_COLORS);

    useEffect(() => {
        setColors(project?.theme?.colors ?? colors);
    }, []);

    // Handle color change
    const handleColorChange = (key, value) => {
        setColors(prev => ({ ...prev, [key]: value }));
    };

    // Handle colors submit
    const handleSubmit = async () => {
        const theme = {
            ...project?.theme,
            colors,
        }

        applyThemeToCanvas(editor, theme);
        const gjsData = editor.getProjectData();

        setIsThemeSaving(true);
        try {
            await saveProject({ gjsData });
            await updateTheme({ theme });
        } finally {
            setIsThemeSaving(false);
        }

    };

    return (
        <div className="h-full flex flex-col">

            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-200">
                <button
                    onClick={onBack}
                    className="cursor-pointer"
                >
                    <FiArrowLeft size={20} />
                </button>

                <h2 className="font-medium">
                    Colors
                </h2>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4">
                {Object.entries({
                    primary: 'Primary',
                    secondary: 'Secondary',
                    background: 'Background',
                    text: 'Text',
                    accent: 'Accent',
                }).map(([key, label]) => (
                    <Row key={key} label={label}>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={colors[key]}
                                onChange={e => handleColorChange(key, e.target.value)}
                                className="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                            />
                            <input
                                type="text"
                                value={colors[key]}
                                onChange={e => handleColorChange(key, e.target.value)}
                                className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                            />
                        </div>
                    </Row>
                ))}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white py-1.5 rounded-md cursor-pointer">
                    {isThemeSaving ? "Applying Colors..." : "Apply Colors"}
                </button>

            </div>
        </div>
    );
};

export default Colors;