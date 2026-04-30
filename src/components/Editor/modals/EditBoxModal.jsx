import DraggableModal from "./DraggableModal";
import Divider from "../../Divider";
import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight, FiArrowDown, FiArrowRight, FiArrowUp, FiColumns, FiMinus, FiSquare } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import { MdBorderColor, MdFormatColorFill } from "react-icons/md";
import { useEditor } from "../../../context/EditorContext";
import { useEffect, useState } from "react";

const EditBoxModal = ({ onClose, selectedComponent }) => {
    const editor = useEditor();

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");

    const [flexDirection, setFlexDirection] = useState("");
    const [justify, setJustify] = useState("");
    const [alignment, setAlignment] = useState("");

    const [gap, setGap] = useState("");
    const [rowGap, setRowGap] = useState("");
    const [columnGap, setColumnGap] = useState("");

    const [margin, setMargin] = useState({ "margin-top": "", "margin-right": "", "margin-bottom": "", "margin-left": "" });
    const [padding, setPadding] = useState({ "padding-top": "", "padding-right": "", "padding-bottom": "", "padding-left": "" });

    const [borderWidth, setBorderWidth] = useState("");
    const [borderRadius, setBorderRadius] = useState("");
    const [borderColor, setBorderColor] = useState("");

    const [bgColor, setBgColor] = useState("");


    const syncStylesFromSelected = () => {
        const selected = selectedComponent;
        if (!selected) return;

        const styles = selected.getStyle() || {};

        setWidth(styles.width || "");
        setHeight(styles.height || "");

        setFlexDirection(styles["flex-direction"] || "");
        setJustify(styles["justify-content"] || "");
        setAlignment(styles["align-items"] || "");

        setGap(styles.gap?.replace("px", "") || "");
        setRowGap(styles["row-gap"]?.replace("px", "") || "");
        setColumnGap(styles["column-gap"]?.replace("px", "") || "");

        setMargin({
            "margin-top": styles["margin-top"]?.replace("px", "") || "",
            "margin-right": styles["margin-right"]?.replace("px", "") || "",
            "margin-bottom": styles["margin-bottom"]?.replace("px", "") || "",
            "margin-left": styles["margin-left"]?.replace("px", "") || "",
        });

        setMargin({
            "padding-top": styles["padding-top"]?.replace("px", "") || "",
            "padding-right": styles["padding-right"]?.replace("px", "") || "",
            "padding-bottom": styles["padding-bottom"]?.replace("px", "") || "",
            "padding-left": styles["padding-left"]?.replace("px", "") || "",
        });

        setBorderWidth(styles["border-width"]?.replace("px", "") || "");
        setBorderRadius(styles["border-radius"]?.replace("px", "") || "");
        setBorderColor(styles["border-color"] || "");

        setBgColor(styles["background-color"] || "");

    };

    // update style
    const updateStyle = (newStyles) => {
        const selected = selectedComponent;

        if (!selected) return;

        const prevStyles = selected.getStyle() || {};

        selected.setStyle({
            ...prevStyles,
            ...newStyles,
        });
    };

    // Helper for unit px
    const withUnit = (val) => {
        if (!val) return "";
        return isNaN(val) ? val : `${val}px`;
    };

    // Handle size
    const handleWidth = (e) => {
        setWidth(e.target.value);
        updateStyle({ width: withUnit(e.target.value) });
    };
    const handleHeight = (e) => {
        setHeight(e.target.value);
        updateStyle({ height: withUnit(e.target.value) });
    };

    // Handle flex 
    const handleFlexRow = () => {
        setFlexDirection("row");
        updateStyle({ display: "flex", "flex-direction": "row" });
    };
    const handleFlexColumn = () => {
        setFlexDirection("column");
        updateStyle({ display: "flex", "flex-direction": "column" });
    };

    // Handle Justify
    const handleJustifyStart = () => {
        setJustify("flex-start");
        updateStyle({ "justify-content": "flex-start" });
    };
    const handleJustifyCenter = () => {
        setJustify("center");
        updateStyle({ "justify-content": "center" });
    };
    const handleJustifyEnd = () => {
        setJustify("flex-end");
        updateStyle({ "justify-content": "flex-end" });
    };
    const handleJustifyBetween = () => {
        setJustify("space-between");;
        updateStyle({ "justify-content": "space-between" });
    };

    // Handle alignment
    const handleAlignStart = () => {
        setAlignment("flex-start")
        updateStyle({ "align-items": "flex-start" });
    };
    const handleAlignCenter = () => {
        setAlignment("center")
        updateStyle({ "align-items": "center" });
    };
    const handleAlignEnd = () => {
        setAlignment("flex-end")
        updateStyle({ "align-items": "flex-end" });
    };

    // Handle gap
    const handleGap = (e) => {
        setGap(e.target.value);
        updateStyle({ gap: withUnit(e.target.value) });
    };
    const handleRowGap = (e) => {
        setRowGap(e.target.value);
        updateStyle({ "row-gap": withUnit(e.target.value) });
    };
    const handleColumnGap = (e) => {
        setColumnGap(e.target.value);
        updateStyle({ "column-gap": withUnit(e.target.value) });
    };

    // Handle margin
    const handleMarginTop = (e) => {
        setMargin({ ...margin, "margin-top": e.target.value });
        updateStyle({ "margin-top": withUnit(e.target.value) });
    };
    const handleMarginLeft = (e) => {
        setMargin({ ...margin, "margin-left": e.target.value });
        updateStyle({ "margin-left": withUnit(e.target.value) });
    };
    const handleMarginRight = (e) => {
        setMargin({ ...margin, "margin-right": e.target.value });
        updateStyle({ "margin-right": withUnit(e.target.value) });
    };
    const handleMarginBottom = (e) => {
        setMargin({ ...margin, "margin-bottom": e.target.value });
        updateStyle({ "margin-bottom": withUnit(e.target.value) });
    };

    // Handle padding
    const handlePaddingTop = (e) => {
        setPadding({ ...padding, "padding-top": e.target.value });
        updateStyle({ "padding-top": withUnit(e.target.value) });
    };
    const handlePaddingLeft = (e) => {
        setPadding({ ...padding, "padding-left": e.target.value });
        updateStyle({ "padding-left": withUnit(e.target.value) });
    };
    const handlePaddingRight = (e) => {
        setPadding({ ...padding, "padding-right": e.target.value });
        updateStyle({ "padding-right": withUnit(e.target.value) });
    };
    const handlePaddingBottom = (e) => {
        setPadding({ ...padding, "padding-bottom": e.target.value });
        updateStyle({ "padding-bottom": withUnit(e.target.value) });
    };

    // Handle border
    const handleBorderWidth = (e) => {
        setBorderWidth(e.target.value);
        updateStyle({ "border-width": withUnit(e.target.value), "border-style": "solid" });
    };
    const handleBorderRadius = (e) => {
        setBorderRadius(e.target.value);
        updateStyle({ "border-radius": withUnit(e.target.value) });
    };
    const handleBorderColor = (e) => {
        setBorderColor(e.target.value);
        updateStyle({ "border-color": e.target.value });
    };

    // Handle background color
    const handleColorChange = (value) => {
        setBgColor(value);

        updateStyle({ "background-color": value });
    };

    useEffect(() => {
        if (!selectedComponent) return;
        syncStylesFromSelected();
    }, [selectedComponent]);

    return (
        <DraggableModal
            onClose={onClose}
            title="Box Design"
            width="260px"
        >
            <div className="px-3 space-y-4">

                {/* SIZE */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Size
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            onChange={handleWidth}
                            type="text"
                            value={width}
                            placeholder="Width (100%, px)"
                            className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <input
                            onChange={handleHeight}
                            type="text"
                            value={height}
                            placeholder="Height"
                            className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />
                    </div>
                </div>

                <Divider />

                {/* FLEX */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Direction
                    </h3>

                    {/* direction */}
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={handleFlexRow}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${flexDirection === "row" ? "bg-primary" : ""}`}>
                            <FiArrowRight /> {/* row */}
                        </button>
                        <button
                            onClick={handleFlexColumn}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${flexDirection === "column" ? "bg-primary" : ""}`}>
                            <FiArrowDown /> {/* column */}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Justify
                    </h3>

                    {/* justify */}
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={handleJustifyStart}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${justify === "flex-start" ? "bg-primary" : ""}`}>
                            <FiAlignLeft />
                        </button>
                        <button
                            onClick={handleJustifyCenter}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${justify === "center" ? "bg-primary" : ""}`}>
                            <FiAlignCenter />
                        </button>
                        <button
                            onClick={handleJustifyEnd}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${justify === "flex-end" ? "bg-primary" : ""}`}>
                            <FiAlignRight />
                        </button>
                        <button
                            onClick={handleJustifyBetween}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${justify === "flex-between" ? "bg-primary" : ""}`}>
                            <FiAlignJustify />
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Alignment
                    </h3>

                    {/* align items */}
                    <div className="flex justify-between gap-2">
                        <button
                            onClick={handleAlignStart}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${alignment === "flex-start" ? "bg-primary" : ""}`}>
                            <FiArrowUp />
                        </button>
                        <button
                            onClick={handleAlignCenter}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${alignment === "center" ? "bg-primary" : ""}`}>
                            <FiMinus />
                        </button>
                        <button
                            onClick={handleAlignEnd}
                            className={`p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer ${alignment === "flex-end" ? "bg-primary" : ""}`}>
                            <FiArrowDown />
                        </button>
                    </div>
                </div>

                {/* GAP */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Gap
                    </h3>

                    <div className="space-y-2">

                        {/* GAP ALL */}
                        <div className="flex items-center gap-2">
                            <input
                                onChange={handleGap}
                                type="number"
                                value={gap}
                                placeholder="Gap All Side"
                                className="w-full border border-gray-200 p-2 rounded-sm text-sm outline-none"
                            />
                        </div>

                        {/* ROW / COLUMN GAP */}
                        <div className="grid grid-cols-2 gap-2">
                            <input
                                onChange={handleRowGap}
                                type="number"
                                value={rowGap}
                                placeholder="Row Gap"
                                className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                            />

                            <input
                                onChange={handleColumnGap}
                                type="number"
                                value={columnGap}
                                placeholder="Column Gap"
                                className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                            />
                        </div>

                    </div>
                </div>

                <Divider />

                {/* BOX MODEL */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Spacing
                    </h3>

                    <div className="grid grid-cols-2 gap-3">

                        {/* MARGIN */}
                        <div className="border border-gray-200 rounded-sm p-2 text-xs">
                            <p className="text-gray-400 mb-1 text-center">Margin</p>

                            <div className="grid grid-cols-3 gap-1 text-center">
                                <div></div>
                                <input
                                    onChange={handleMarginTop}
                                    type="text"
                                    value={margin["margin-top"]}
                                    className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="T" />
                                <div></div>

                                <input
                                    onChange={handleMarginLeft}
                                    type="text"
                                    value={margin["margin-left"]}
                                    className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="L" />
                                <div className="text-[10px] text-gray-400 mt-2">Box</div>
                                <input
                                    onChange={handleMarginRight}
                                    type="text"
                                    value={margin["margin-right"]}
                                    className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="R" />

                                <div></div>
                                <input
                                    onChange={handleMarginBottom}
                                    type="text"
                                    value={margin["margin-bottom"]}
                                    className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="B" />
                                <div></div>
                            </div>
                        </div>

                        {/* PADDING */}
                        <div className="border border-gray-200 rounded-sm p-2 text-xs">
                            <p className="text-gray-400 mb-1 text-center">Padding</p>

                            <div className="grid grid-cols-3 gap-1 text-center">
                                <div></div>
                                <input
                                    onChange={handlePaddingTop}
                                    type="text"
                                    value={padding["padding-top"]}
                                    className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="T" />
                                <div></div>

                                <input
                                    onChange={handlePaddingLeft}
                                    type="text"
                                    value={padding["left"]}
                                    className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="L" />
                                <div className="text-[10px] text-gray-400 mt-2">Box</div>
                                <input
                                    onChange={handlePaddingRight}
                                    type="text"
                                    value={padding["padding-right"]}
                                    className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="R" />

                                <div></div>
                                <input
                                    onChange={handlePaddingBottom}
                                    type="text"
                                    value={padding["padding-bottom"]}
                                    className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="B" />
                                <div></div>
                            </div>
                        </div>

                    </div>
                </div>

                <Divider />

                {/* BORDER */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Border
                    </h3>

                    <div className="flex items-center gap-2">
                        <input
                            onChange={handleBorderWidth}
                            type="number"
                            value={borderWidth}
                            placeholder="Width"
                            className="w-20 border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <input
                            onChange={handleBorderRadius}
                            type="number"
                            value={borderRadius}
                            placeholder="Radius"
                            className="w-20 border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <div className="relative">
                            <button className="p-2 border border-gray-200 rounded-sm text-gray-600">
                                <MdFormatColorFill />
                            </button>

                            <input
                                onChange={handleBorderColor}
                                type="color"
                                value={borderColor}
                                className="absolute inset-0 size-8 opacity-0 cursor-pointer outline-none"
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* BACKGROUND */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Background
                    </h3>

                    <div className="flex items-center gap-2">
                        <input
                            onChange={(e) => setBgColor(e.target.value)}
                            onChange={(e) => handleColorChange(e.target.value)}
                            type="text"
                            value={bgColor}
                            placeholder="#ffffff"
                            className="w-42 border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <div className="relative">
                            <button className="p-2 border border-gray-200 rounded-sm text-gray-600">
                                <MdFormatColorFill />
                            </button>

                            <input
                                onChange={(e) => handleColorChange(e.target.value)}
                                type="color"
                                value={bgColor}
                                className="absolute inset-0 opacity-0 cursor-pointer outline-none"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </DraggableModal >
    );
};

export default EditBoxModal;