import { BsFileCode, BsFonts } from "react-icons/bs";
import { PiLinkSimpleLight, PiRectangleLight } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import { GoVideo } from "react-icons/go";
import { GrMapLocation } from "react-icons/gr";
import { RxButton } from "react-icons/rx";
import { TbColumns1, TbColumns3, TbHeading, TbLayoutColumns } from "react-icons/tb";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

// Block elements
const BLOCKS = [
    { id: "text", label: "Text", icon: <BsFonts fontSize={28} className="text-gray-600" /> },
    { id: "heading", label: "Heading", icon: <TbHeading fontSize={28} className="text-gray-600" /> },
    { id: "link", label: "Link", icon: <PiLinkSimpleLight fontSize={28} className="text-gray-600" /> },
    { id: "button", label: "Button", icon: <RxButton fontSize={28} className="text-gray-600" /> },
    { id: "image", label: "Image", icon: <CiImageOn fontSize={28} className="text-gray-600" /> },
    { id: "video", label: "Video", icon: <GoVideo fontSize={28} className="text-gray-600" /> },
    { id: "map", label: "Map", icon: <GrMapLocation fontSize={28} className="text-gray-600" /> },
    { id: "container", label: "Container", icon: <PiRectangleLight fontSize={28} className="text-gray-600" /> },
    { id: "div", label: "Div", icon: <BsFileCode fontSize={28} className="text-gray-600" /> },
    { id: "col-1", label: "1 Column", icon: <TbColumns1 fontSize={28} className="text-gray-600" /> },
    { id: "col-2", label: "2 Column", icon: <TbLayoutColumns fontSize={28} className="text-gray-600" /> },
    { id: "col-3", label: "3 Column", icon: <TbColumns3 fontSize={28} className="text-gray-600" /> },
    { id: "slider", label: "Slider", icon: <TfiLayoutSliderAlt fontSize={28} className="text-gray-600" /> },
];

const BlockElements = () => {
    return (
        <div className="grid grid-cols-4 gap-x-2 gap-y-4 p-4">
            {BLOCKS.map((block) => (
                <div
                    key={block.id}
                    className="flex flex-col items-center cursor-pointer group"
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