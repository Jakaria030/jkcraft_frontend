import { FiType, FiLink, FiZap } from "react-icons/fi";
import { MdAnimation } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import DraggableModal from "./DraggableModal";
import { generateModalTitle } from "../../../utils/generateModalTitle";

const ToolbarModal = ({ type = "text", onClose, initialPosition }) => {
    const menuByType = {
        "text": [
            {
                id: "edit-text",
                label: "Edit Text",
                icon: <FiType size={16} />,
            },
            {
                id: "animation",
                label: "Animation",
                icon: <MdAnimation size={16} />,
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
                icon: <FiType size={16} />,
            },
            {
                id: "animation",
                label: "Animation",
                icon: <MdAnimation size={16} />,
            },
            {
                id: "button-link",
                label: "Button Link",
                icon: <FiLink size={16} />,
            },
            {
                id: "ai-button",
                label: "Generate Text",
                icon: <BsStars size={16} />,
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
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm text-gray-700 cursor-pointer"
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