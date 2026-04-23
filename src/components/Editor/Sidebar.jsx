import { FaBrush } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { FiImage } from "react-icons/fi";
import { LuCircleFadingPlus } from "react-icons/lu";
import { TbWorldSearch } from "react-icons/tb";

const Sidebar = ({ activePanel, onActivePanel }) => {
    const menu = [
        { id: "elements", icon: <LuCircleFadingPlus /> },
        { id: "pages", icon: <FaFileCirclePlus /> },
        { id: "themes", icon: <FaBrush /> },
        { id: "assets", icon: <FiImage /> },
        { id: "seo", icon: <TbWorldSearch /> },
    ];

    return (
        <div className="w-14 bg-white border-r border-gray-200">

            {menu.map((item) => (
                <div key={item.id} className="w-full flex flex-col items-center justify-center gap-2 border-b border-gray-200 py-3">
                    <button
                        onClick={() =>
                            onActivePanel(activePanel === item.id ? null : item.id)
                        }
                        className={`w-8 h-8 flex items-center justify-center rounded-md transition text-gray-600 border cursor-pointer
                        ${activePanel === item.id
                                ? "bg-primary/30 border-primary/70"
                                : "hover:bg-primary/30 border-white hover:border-primary/70"
                            }`}
                    >
                        {item.icon}
                    </button>
                </div>
            ))}

        </div>
    );
};

export default Sidebar;