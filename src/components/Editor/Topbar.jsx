import { FiSave, FiEye } from "react-icons/fi";
import JKCRAFTLogo from "../../assets/JKCRAFT-logo.png";
import { Link } from "react-router";
import { FaDesktop, FaFileDownload, FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { IoLayersOutline } from "react-icons/io5";
import { BiRedo, BiUndo } from "react-icons/bi";
import { GoFileCode } from "react-icons/go";

const Topbar = () => {
    return (
        <div className="w-full h-12 bg-white shadow flex items-center justify-between px-2 border-b border-gray-200">
            <Link to={"/dashboard"} className="w-32 h-auto">
                <img src={JKCRAFTLogo} alt="JKCRAFTLogo" />
            </Link>

            <div className="flex items-center gap-2">

                {/* Undo button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary/50 cursor-pointer transition" title="Undo">
                    <BiUndo size={16} className="text-gray-600" />
                </button>

                {/* Redo button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary/50 cursor-pointer transition" title="Redo">
                    <BiRedo size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Code preview button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary/50 cursor-pointer transition" title="Code Preview">
                    <GoFileCode size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Layer button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary/50 cursor-pointer transition" title="Layer">
                    <IoLayersOutline size={16} className="text-gray-600" />
                </button>

                {/* Save button */}
                <button className="text-sm text-gray-600 hover:text-primary cursor-pointer transition">
                    Save
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Preview Button */}
                <button className="text-sm text-gray-600 hover:text-primary cursor-pointer transition">
                    Preview
                </button>

                {/* Export file button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary/50 cursor-pointer transition" title="Export File">
                    <FaFileDownload size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Device group */}
                <div className="bg-gray-200 flex items-center justify-center rounded-md">
                    {/* Desktop */}
                    <button className="p-2 rounded hover:bg-primary/50 cursor-pointer transition" title="Desktop">
                        <FaDesktop size={16} className="text-gray-600" />
                    </button>

                    {/* Laptop */}
                    <button className="p-2  rounded hover:bg-primary/50 cursor-pointer transition" title="Laptop">
                        <FaLaptop size={16} className="text-gray-600" />
                    </button>

                    {/* Tablet */}
                    <button className="p-2 rounded hover:bg-primary/50 cursor-pointer transition" title="Tablet">
                        <FaTabletAlt size={16} className="text-gray-600" />
                    </button>

                    {/* Mobile */}
                    <button className="p-2 rounded hover:bg-primary/50 cursor-pointer transition" title="Mobile">
                        <FaMobileAlt size={16} className="text-gray-600" />
                    </button>
                </div>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Publish button */}
                <button
                    className="bg-gray-200 text-gray-600 px-4 py-1 rounded-md hover:opacity-90 cursor-pointer"
                >
                    Publish
                </button>

                {/* Go Live button */}
                <button
                    className="bg-gray-200 text-gray-600 px-4 py-1 rounded-md hover:opacity-90 cursor-pointer"
                >
                    Go Live
                </button>
            </div>

        </div>
    );
};

export default Topbar;