import { useEffect, useRef, useState } from "react";
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
import { loadGoogleFont } from "../../../utils/loadGoogleFont";


const EditTextModal = ({ onClose, theme, selectedComponent, updateFont }) => {
    const { editor } = useEditor();

    const [selectedStyle, setSelectedStyle] = useState("p1");
    const [fontSize, setFontSize] = useState(16);
    const [fontFamily, setFontFamily] = useState("Inter");
    const textColorRef = useRef(null);
    const highlightColorRef = useRef(null);

    const [formatting, setFormatting] = useState({ bold: false, italic: false, underline: false });
    const [alignment, setAlignment] = useState({ left: false, center: false, right: false, justify: false });

    // State sync
    useEffect(() => {
        if (!selectedComponent || !theme?.typography) return;

        const tagName = selectedComponent.get("tagName");
        const classes = selectedComponent.getClasses();
        const inlineStyle = selectedComponent.getStyle();


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
        setFontSize(Number(inlineStyle["font-size"]?.split("px")[0]) || styleConfig?.fontSize);
        setFontFamily(inlineStyle["font-family"] ?? theme.typography.fontFamily);

        const bold = inlineStyle["font-weight"] === "700" || inlineStyle["font-weight"] === "bold";
        const italic = inlineStyle["font-style"] === "italic";
        const underline = inlineStyle["text-decoration"]?.includes("underline");
        setFormatting({ bold, italic, underline });

        const align = inlineStyle["text-align"];
        setAlignment({
            left: align === "left",
            center: align === "center",
            right: align === "right",
            justify: align === "justify",
        });

    }, [selectedComponent, theme]);

    // Handle text style change
    const handleTextStyleChange = (e) => {
        const styleId = e.target.value;
        setSelectedStyle(styleId);

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

        const style = selectedComponent.getStyle();

        selected.setStyle({
            ...style,
            "font-size": `${styleConfig.fontSize}px`,
            "font-weight": styleConfig.fontWeight,
            "line-height": styleConfig.lineHeight,
            "color": styleConfig.color,
            "font-family": typography.fontFamily,
        });
    };

    // Handle font family change
    const handleFontFamilyChange = async (e) => {
        const newFont = e.target.value;

        setFontFamily(newFont);

        loadGoogleFont(editor, newFont);

        if (!selectedComponent) return;
        const style = selectedComponent.getStyle();

        selectedComponent.setStyle({
            ...style,
            "font-family": `${newFont}`,
        });

        try {
            await updateFont({ font: newFont });
        } catch (err) {
            console.log(err);
        }
    };

    // Hangle font size change
    const handleFontSizeChange = (e) => {
        const newFontSize = e.target.value;

        setFontSize(newFontSize);
        const style = selectedComponent.getStyle();

        if (!selectedComponent) return;

        selectedComponent.setStyle({
            ...style,
            "font-size": `${newFontSize}px`,
        });
    };

    // Handle text bold
    const handleFontBold = () => {
        if (!selectedComponent) return;

        setFormatting({ ...formatting, bold: !formatting.bold });

        const style = selectedComponent.getStyle();
        const isBold = style["font-weight"] === "700" || style["font-weight"] === "bold";

        selectedComponent.setStyle({
            ...style,
            "font-weight": isBold ? "400" : "700",
        });
    };

    // Handle text italic
    const handleFontItalic = () => {
        if (!selectedComponent) return;

        setFormatting({ ...formatting, italic: !formatting.italic });

        const style = selectedComponent.getStyle();
        const isItalic = style["font-style"] === "italic";

        selectedComponent.setStyle({
            ...style,
            "font-style": isItalic ? "normal" : "italic",
        });
    };

    // Handle text underline
    const handleFondUnderLine = () => {
        if (!selectedComponent) return;

        setFormatting({ ...formatting, underline: !formatting.underline });

        const style = selectedComponent.getStyle();
        const isUnderlined = style["text-decoration"]?.includes("underline");

        selectedComponent.setStyle({
            ...style,
            "text-decoration": isUnderlined ? "none" : "underline",
        });
    };

    // Handle text color
    const handleFontColor = (color) => {
        if (!selectedComponent || !color) return;

        const style = selectedComponent.getStyle();

        selectedComponent.setStyle({
            ...style,
            color,
        });
    };

    // Handle text highlight color
    const handleFontHighLightColor = (color) => {
        if (!selectedComponent || !color) return;

        const style = selectedComponent.getStyle();

        selectedComponent.setStyle({
            ...style,
            "background-color": color,
        });
    };

    // Handle text alignment
    const handleTextAlignment = (align) => {
        if (!selectedComponent) return;

        setAlignment({
            left: align === "left",
            center: align === "center",
            right: align === "right",
            justify: align === "justify",
        });

        const validAligns = ["left", "center", "right", "justify"];
        if (!validAligns.includes(align)) return;

        const style = selectedComponent.getStyle();

        selectedComponent.setStyle({
            ...style,
            "text-align": align,
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
                        onChange={handleTextStyleChange}
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
                        onChange={handleFontFamilyChange}
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
                            onChange={handleFontSizeChange}
                            className="w-full cursor-pointer"
                        />

                        <input
                            type="number"
                            value={fontSize}
                            onChange={handleFontSizeChange}
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
                        <button onClick={handleFontBold} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${formatting.bold ? "bg-primary" : ""}`}>
                            <FiBold />
                        </button>

                        <button onClick={handleFontItalic} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${formatting.italic ? "bg-primary" : ""}`}>
                            <FiItalic />
                        </button>

                        <button onClick={handleFondUnderLine} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${formatting.underline ? "bg-primary" : ""}`}>
                            <FiUnderline />
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => textColorRef.current?.click()}
                                className="p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer"
                            >
                                <MdFormatColorFill />
                            </button>

                            <input
                                ref={textColorRef}
                                type="color"
                                className="absolute left-0 top-0 size-0"
                                onChange={(e) => handleFontColor(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => highlightColorRef.current?.click()}
                                className="p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer"
                            >
                                <MdBorderColor />
                            </button>

                            <input
                                ref={highlightColorRef}
                                type="color"
                                className="absolute left-0 top-0 size-0"
                                onChange={(e) => handleFontHighLightColor(e.target.value)}
                            />
                        </div>

                    </div>
                </div>

                <Divider />

                {/* ALIGNMENT */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 mb-2">
                        Alignment
                    </h3>

                    <div className="flex items-center justify-between gap-2">
                        <button onClick={() => handleTextAlignment("left")} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${alignment.left ? "bg-primary" : ""}`}>
                            <FiAlignLeft />
                        </button>

                        <button onClick={() => handleTextAlignment("center")} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${alignment.center ? "bg-primary" : ""}`}>
                            <FiAlignCenter />
                        </button>

                        <button onClick={() => handleTextAlignment("right")} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${alignment.right ? "bg-primary" : ""}`}>
                            <FiAlignRight />
                        </button>

                        <button onClick={() => handleTextAlignment("justify")} className={`p-2 border border-gray-200 rounded-md hover:bg-primary cursor-pointer ${alignment.justify ? "bg-primary" : ""}`}>
                            <FiAlignJustify />
                        </button>
                    </div>
                </div>
            </div>
        </DraggableModal >
    );
};

export default EditTextModal;