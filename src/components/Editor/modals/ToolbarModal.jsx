import { FiType, FiLink, FiZap, FiVideo, FiBox } from "react-icons/fi";
import { MdAnimation, MdOutlineVideoSettings, MdSmartButton } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import DraggableModal from "./DraggableModal";
import { generateModalTitle } from "../../../utils/generateModalTitle";
import { CiImageOn } from "react-icons/ci";
import { RiImageAddLine, RiTailwindCssFill, RiVideoAddLine } from "react-icons/ri";
import { TbLayoutGrid } from "react-icons/tb";
import { LuMapPinned } from "react-icons/lu";
import { FaMapMarkedAlt } from "react-icons/fa";

const ToolbarModal = ({ type = "text", onClose, initialPosition }) => {
    const menuByType = {
        "text": [
            {
                id: "edit-text",
                label: "Edit Text",
                icon: <FiType size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
            {
                id: "link",
                label: "Add Link",
                icon: <FiLink size={16} />,
            },
            {
                id: "ai-text",
                label: "Generate Text",
                icon: <BsStars size={16} />,
            },
        ],

        "my-button": [
            {
                id: "edit-button",
                label: "Edit Button",
                icon: <MdSmartButton size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
            {
                id: "button-link",
                label: "Button Link",
                icon: <FiLink size={16} />,
            },
        ],

        "my-image": [
            {
                id: "edit-image",
                label: "Edit Image",
                icon: <CiImageOn size={16} />,
            },
            {
                id: "add-image",
                label: "Add Image",
                icon: <RiImageAddLine size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
            {
                id: "image-link",
                label: "Add Link",
                icon: <FiLink size={16} />,
            },
        ],

        "my-video": [
            {
                id: "edit-video",
                label: "Edit Video",
                icon: <FiVideo size={16} />,
            },
            {
                id: "add-video",
                label: "Add Video",
                icon: <RiVideoAddLine size={16} />,
            },
            {
                id: "video-settings",
                label: "Video Settings",
                icon: <MdOutlineVideoSettings size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
        ],

        "my-map": [
            {
                id: "edit-map",
                label: "Edit Map",
                icon: <FaMapMarkedAlt size={16} />,
            },
            {
                id: "add-map-location",
                label: "Add Map Location",
                icon: <LuMapPinned size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
        ],

        "my-container": [
            {
                id: "edit-container",
                label: "Edit Container",
                icon: <TbLayoutGrid size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
        ],

        "my-div": [
            {
                id: "edit-div",
                label: "Edit Div",
                icon: <FiBox size={16} />,
            },
            {
                id: "tailwind-class",
                label: "Add Tailwind Class",
                icon: <RiTailwindCssFill size={16} />,
            },
        ],
    };

    const menus = menuByType[type] || [];
    const title = generateModalTitle(type);

    return (
        <DraggableModal onClose={onClose} title={title.toUpperCase()} initialPosition={initialPosition}>
            <div className="space-y-1">

                {menus.map((item) => (
                    <button
                        key={item.id}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-gray-100 transition text-sm text-gray-700 cursor-pointer"
                    >
                        <span className="text-gray-500">
                            {item.icon}
                        </span>

                        <span>{item.label}</span>
                    </button>
                ))}

            </div>
        </DraggableModal>
    );
};

export default ToolbarModal;