import { useState } from "react";
import Topbar from "../components/Editor/Topbar";
import Sidebar from "../components/Editor/Sidebar";
import Drawer from "../components/Editor/Drawer";
import Canvas from "../components/Editor/Canvas";

const Editor = () => {
    const [activePanel, setActivePanel] = useState(null);

    return (
        <div className="h-screen flex flex-col">

            {/* Topbar */}
            <Topbar />

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">

                {/* Sidebar */}
                <Sidebar activePanel={activePanel} onActivePanel={setActivePanel} />

                {/* Drawer */}
                <Drawer activePanel={activePanel} onActivePanel={setActivePanel} />

                {/* Main Canvas */}
                <div className="flex-1 bg-gray-100">
                    <Canvas />
                </div>

            </div>
        </div>
    );
};

export default Editor;