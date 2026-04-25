import { FiSave, FiEye } from "react-icons/fi";
import JKCRAFTLogo from "../../assets/JKCRAFT-logo.png";
import { Link, useParams } from "react-router";
import { FaDesktop, FaFileDownload, FaLaptop, FaMobileAlt, FaTabletAlt } from "react-icons/fa";
import { IoLayersOutline } from "react-icons/io5";
import { BiRedo, BiUndo } from "react-icons/bi";
import { GoFileCode } from "react-icons/go";
import { useEditor } from "../../context/EditorContext";
import { useState } from "react";
import { useProject } from "../../context/ProjectContext";


// Device group
const DEVICES = [
    { id: "desktop", label: "Desktop", icon: <FaDesktop size={16} className="text-gray-600" /> },
    { id: "laptop", label: "Laptop", icon: <FaLaptop size={16} className="text-gray-600" /> },
    { id: "tablet", label: "Tablet", icon: <FaTabletAlt size={16} className="text-gray-600" /> },
    { id: "mobile", label: "Mobile", icon: <FaMobileAlt size={16} className="text-gray-600" /> },
];

const Topbar = () => {
    const { editor } = useEditor();
    const { project, saveProject, isSaving } = useProject();
    const [activeDevice, setActiveDevice] = useState("desktop");

    // Handle device change
    const handleDeviceChange = (device) => {
        if (!editor) return;

        editor.setDevice(device);
        setActiveDevice(device);
    };

    // Handle save
    const handleSave = async () => {
        if (!editor) return;
        const gjsData = editor.getProjectData();

        try {
            await saveProject(project._id, { gjsData });
        } catch (err) {
            console.log(err?.response?.data?.message);
        }
    };

    return (
        <div className="w-full h-12 bg-white shadow flex items-center justify-between px-2 border-b border-gray-200">
            <Link to={"/dashboard"} className="w-32 h-auto">
                <img src={JKCRAFTLogo} alt="JKCRAFTLogo" />
            </Link>

            <div className="flex items-center gap-2">

                {/* Undo button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary cursor-pointer transition" title="Undo">
                    <BiUndo size={16} className="text-gray-600" />
                </button>

                {/* Redo button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary cursor-pointer transition" title="Redo">
                    <BiRedo size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Code preview button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary cursor-pointer transition" title="Code Preview">
                    <GoFileCode size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Layer button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary cursor-pointer transition" title="Layer">
                    <IoLayersOutline size={16} className="text-gray-600" />
                </button>

                {/* Save button */}
                <button
                    onClick={handleSave}
                    className={`text-sm text-gray-600 hover:text-primary cursor-pointer transition ${isSaving ? "text-primary" : ""}`}>
                    {isSaving ? "Saving..." : "Save"}
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Preview Button */}
                <button className="text-sm text-gray-600 hover:text-primary cursor-pointer transition">
                    Preview
                </button>

                {/* Export file button */}
                <button className="p-2 rounded bg-gray-200 hover:bg-primary cursor-pointer transition" title="Export File">
                    <FaFileDownload size={16} className="text-gray-600" />
                </button>

                {/* Divider */}
                <div className="bg-gray-200 w-[1px] h-8"></div>

                {/* Device group */}
                <div className="bg-gray-200 flex items-center justify-center rounded-md">
                    {
                        DEVICES.map((device) => (
                            <button
                                key={device.id}
                                onClick={() => handleDeviceChange(device.id)}
                                className={`p-2 rounded hover:bg-primary cursor-pointer transition ${activeDevice === device.id ? "bg-primary" : ""}`} title={device.label}>
                                {device.icon}
                            </button>
                        ))
                    }
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