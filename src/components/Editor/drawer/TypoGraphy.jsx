import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Row from "./Row";
import { useProject } from "../../../context/ProjectContext";
import { applyThemeToCanvas } from "../../../utils/applyThemeToCanvas";
import { useEditor } from "../../../context/EditorContext";
import { DEFAULT_TEXTS_PROPERTIES, GOOGLE_FONTS, HEADINGS_PARAGRAPS } from "../../../constant/constant";


// Heading row component
const HeadingParagraphRow = ({ tag, values, onChange }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center px-3 py-1.5 cursor-pointer bg-gray-100"
            >
                <span className="text-gray-600 text-sm font-medium uppercase">
                    {tag}
                </span>
                <span className="text-gray-600 text-sm">
                    {open ? "▾" : "▸"}
                </span>
            </div>

            {open && (
                <div className="p-3 flex flex-col gap-2 bg-white">
                    <Row label="Font Size (px)">
                        <input
                            type="number"
                            value={values.fontSize}
                            onChange={(e) => onChange(tag, "fontSize", e.target.value)}
                            className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                        />
                    </Row>

                    <Row label="Font Weight">
                        <select
                            value={values.fontWeight}
                            onChange={(e) => onChange(tag, "fontWeight", e.target.value)}
                            className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                        >
                            {["300", "400", "500", "600", "700", "800"].map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </Row>

                    <Row label="Line Height">
                        <input
                            type="number"
                            step="0.1"
                            value={values.lineHeight}
                            onChange={(e) => onChange(tag, "lineHeight", e.target.value)}
                            className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                        />
                    </Row>

                    <Row label="Color">
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={values.color}
                                onChange={(e) => onChange(tag, "color", e.target.value)}
                                className="w-16 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                            />
                            <input
                                type="text"
                                value={values.color}
                                onChange={(e) => onChange(tag, "color", e.target.value)}
                                className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm outline-none"
                            />
                        </div>
                    </Row>
                </div>
            )}
        </div>
    );
};

const Typography = ({ onBack }) => {
    const { project, updateTheme, saveProject } = useProject();
    const { editor } = useEditor();
    const [isThemeSaving, setIsThemeSaving] = useState(false);
    const [fontFamily, setFontFamily] = useState("Inter");
    const [textProperties, setTextProperties] = useState(DEFAULT_TEXTS_PROPERTIES);

    useEffect(() => {
        setFontFamily(project?.theme?.typography?.fontFamily ?? fontFamily);
        setTextProperties(project?.theme?.typography?.textProperties ?? textProperties);
    }, []);

    // Handle font family change
    const handleFontFamiliyChange = (e) => {
        setFontFamily(e.target.value);
    };

    // Handle heading change
    const handleHeadingChange = (tag, prop, value) => {
        setTextProperties(prev => ({
            ...prev,
            [tag]: { ...prev[tag], [prop]: value }
        }));
    };

    // Handle typography submit
    const handleSubmit = async () => {
        const typography = {
            fontFamily,
            textProperties,
        };

        const theme = {
            ...project?.theme,
            typography,
        }

        applyThemeToCanvas(editor, theme)
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
                    Typography
                </h2>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-162px)]">

                {/* Font Family */}
                <Row label="Font Family">
                    <select
                        value={fontFamily}
                        onChange={handleFontFamiliyChange}
                        className="flex-1 px-2 py-1.5 bg-white border border-gray-300 rounded-md text-gray-600 text-sm outline-none"
                    >
                        {GOOGLE_FONTS.map(font => (
                            <option key={font} value={font}>{font}</option>
                        ))}
                    </select>
                </Row>

                {/* Headings label */}
                <p className="text-sm shrink-0 font-medium text-gray-600">
                    Headings and Paragraphs
                </p>

                {HEADINGS_PARAGRAPS.map(tag => (
                    <HeadingParagraphRow
                        key={tag}
                        tag={tag}
                        values={textProperties[tag]}
                        onChange={handleHeadingChange}
                    />
                ))}

                {/* Apply theme button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white py-1.5 rounded-md cursor-pointer">
                    {isThemeSaving ? "Applying Typography..." : "Apply Typography"}
                </button>

            </div>
        </div>
    );
};

export default Typography;