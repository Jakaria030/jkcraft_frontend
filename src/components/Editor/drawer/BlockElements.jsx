import { BsFileCode, BsFonts } from "react-icons/bs";
import { PiLinkSimpleLight, PiRectangleLight } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { RxButton, RxSection } from "react-icons/rx";
import { TbColumns1, TbColumns3, TbHeading, TbLayoutColumns } from "react-icons/tb";
import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { useEditor } from "../../../context/EditorContext";

// Block elements
export const BLOCKS = [
    { id: "text", label: "Text", icon: <BsFonts fontSize={28} className="text-gray-600" />, content: "<p class='p1'>Edit this text</p>" },
    { id: "heading", label: "Heading", icon: <TbHeading fontSize={28} className="text-gray-600" />, content: "<h1>Edit this heading</h1>" },
    { id: "link", label: "Link", icon: <PiLinkSimpleLight fontSize={28} className="text-gray-600" />, content: "<a href='#'>Click here</a>" },
    { id: "button", label: "Button", icon: <RxButton fontSize={28} className="text-gray-600" />, content: { type: "my-button" } },
    { id: "image", label: "Image", icon: <CiImageOn fontSize={28} className="text-gray-600" />, content: { type: "my-image" } },
    { id: "video", label: "Video", icon: <GoVideo fontSize={28} className="text-gray-600" />, content: { type: "my-video" } },
    { id: "map", label: "Map", icon: <GrMapLocation fontSize={28} className="text-gray-600" />, content: { type: "my-map" } },
    { id: "section", label: "Section", icon: <RxSection fontSize={28} className="text-gray-600" />, content: { type: "my-section" } },
    { id: "container", label: "Container", icon: <PiRectangleLight fontSize={28} className="text-gray-600" />, content: { type: "my-container" } },
    { id: "div", label: "Div", icon: <BsFileCode fontSize={28} className="text-gray-600" />, content: { type: "my-div" } },
    { id: "cols-1", label: "1 Column", icon: <TbColumns1 fontSize={28} className="text-gray-600" />, content: { type: "my-cols-1" } },
    { id: "cols-2", label: "2 Column", icon: <TbLayoutColumns fontSize={28} className="text-gray-600" />, content: { type: "my-cols-2" } },
    { id: "cols-3", label: "3 Column", icon: <TbColumns3 fontSize={28} className="text-gray-600" />, content: { type: "my-cols-3" } },
    { id: "slider", label: "Slider", icon: <TfiLayoutSliderAlt fontSize={28} className="text-gray-600" />, content: { type: "my-slider" } },
];

const BlockElements = () => {
    const { editor } = useEditor();

    if (!editor) return;

    // Block register
    const bm = editor.BlockManager;
    BLOCKS.forEach((block) => {
        bm.add(block.id, { label: block.label, content: block.content });
    });

    // Handle drag start
    const handleDragStart = (e, block) => {
        bm.startDrag(bm.get(block.id));
    };

    // Handle drag end
    const handleDragEnd = () => {
        bm.endDrag();
    };

    return (
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 p-4">
            {BLOCKS.map((block) => (
                <div
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                    onDragEnd={handleDragEnd}
                    className="flex flex-col items-center cursor-grab group"
                >
                    {/* Icon Box */}
                    <div className="w-full aspect-square flex items-center justify-center border border-gray-200 rounded-md group-hover:border-primary group-hover:shadow-sm transition">
                        <div className="text-2xl">
                            {block.icon}
                        </div>
                    </div>

                    {/* Label */}
                    <span className="mt-2 text-xs text-gray-600 text-center">
                        {block.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default BlockElements;