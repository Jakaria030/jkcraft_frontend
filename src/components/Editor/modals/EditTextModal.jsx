import { useEffect, useState } from "react";
import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
    FiAlignJustify,
} from "react-icons/fi";
import Divider from "../../Divider";
import DraggableModal from "./DraggableModal";
import { GOOGLE_FONTS } from "../../../constant/constant";
import { MdBorderColor, MdFormatColorFill } from "react-icons/md";
import { useEditor } from "../../../context/EditorContext";
import { fontStyleLabel } from "../../../utils/fontStyleLabel";


const EditTextModal = ({ onClose, theme, selectedComponent }) => {
    const { editor } = useEditor();

    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("Inter");
    const [selectedStyle, setSelectedStyle] = useState("p1");

    // State sync
    useEffect(() => {
        if (!selectedComponent || !theme?.typography) return;

        const tagName = selectedComponent.get("tagName");
        const classes = selectedComponent.getClasses();


        let styleKey = null;

        // paragraph style (p1, p2, p3)
        if (tagName === "p") {
            const pClass = classes.find((cls) =>
                ["p1", "p2", "p3"].includes(cls)
            );

            styleKey = pClass || "p1";
        }

        // heading style (h1-h6)
        else if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(tagName)) {
            styleKey = tagName;
        }

        if (!styleKey) return;

        const styleConfig =
            theme.typography.textProperties?.[styleKey];

        if (!styleConfig) return;

        setSelectedStyle(styleKey);
        setFontSize(styleConfig.fontSize);
        setFontFamily(theme.typography.fontFamily);
    }, [selectedComponent, theme]);

    // Handle text style change
    const handleTextStyleChange = (styleId) => {

        const selected = selectedComponent;
        if (!selected) return;

        const typography = theme?.typography;
        if (!typography) return;

        const styleConfig = typography.textProperties[styleId];
        if (!styleConfig) return;

        // If heading (h1-h6)
        if (styleId.startsWith("h")) {
            selected.set("tagName", styleId);

            selected.setAttributes({
                ...selected.getAttributes(),
                class: "",
            });
        }

        // If paragraph (p1-p3)
        if (styleId.startsWith("p")) {
            selected.set("tagName", "p");

            selected.setAttributes({
                ...selected.getAttributes(),
                class: styleId,
            });
        }

        selected.addStyle({
            fontSize: `${styleConfig.fontSize}px`,
            fontWeight: styleConfig.fontWeight,
            lineHeight: styleConfig.lineHeight,
            color: styleConfig.color,
            fontFamily: typography.fontFamily,
        });
    };


    return (
        <DraggableModal
            onClose={onClose}
            title="Text Settings"
            width="250px"
        >
            <div className="px-3 space-y-4">

                {/* TEXT STYLE */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Font Style
                    </h3>

                    <select
                        value={selectedStyle}
                        onChange={(e) => {
                            setSelectedStyle(e.target.value);
                            handleTextStyleChange(e.target.value);
                        }}
                        className="w-full border border-gray-200 rounded-sm p-2 text-sm outline-none"
                    >
                        {Object.entries(theme?.typography?.textProperties).map(([key, value]) => (
                            <option
                                key={key}
                                value={key}
                            >
                                {fontStyleLabel(key)}
                            </option>
                        ))}
                    </select>
                </div>

                <Divider />

                {/* FONT FAMILY */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Font Family
                    </h3>

                    <select
                        value={fontFamily}
                        onChange={(e) => { setFontFamily(e.target.value) }}
                        className="w-full border border-gray-200 rounded-md p-2 text-sm outline-none">
                        {GOOGLE_FONTS.map((font) => <option key={font} value={font}>{font}</option>)}
                    </select>
                </div>

                <Divider />

                {/* FONT SIZE */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Font Size
                    </h3>

                    <div className="flex items-center gap-3">
                        <input
                            type="range"
                            min="10"
                            max="80"
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(e.target.value)
                            }
                            className="w-full cursor-pointer"
                        />

                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) =>
                                setFontSize(e.target.value)
                            }
                            className="w-16 border border-gray-200 rounded-md px-2 py-1 text-center outline-none"
                        />
                    </div>
                </div>

                <Divider />

                {/* FORMATTING */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Formatting
                    </h3>

                    <div className="flex items-center justify-between gap-2">
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiBold />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiItalic />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiUnderline />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <MdFormatColorFill />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <MdBorderColor />
                        </button>

                    </div>
                </div>

                <Divider />

                {/* ALIGNMENT */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Alignment
                    </h3>

                    <div className="flex items-center justify-between gap-2">
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiAlignLeft />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiAlignCenter />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiAlignRight />
                        </button>

                        <button className="p-2 border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer">
                            <FiAlignJustify />
                        </button>
                    </div>
                </div>
            </div>
        </DraggableModal >
    );
};

export default EditTextModal;