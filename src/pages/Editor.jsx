import { useState } from "react";
import Topbar from "../components/Editor/Topbar";
import Sidebar from "../components/Editor/Sidebar";
import Drawer from "../components/Editor/Drawer";
import Canvas from "../components/Editor/Canvas";
import { EditorProvider } from "../context/EditorContext";
import { useParams } from "react-router";
import Spinner from "../components/Spinner";
import { ProjectProvider } from "../context/ProjectContext";

const Editor = () => {
    const { id } = useParams();
    const [activePanel, setActivePanel] = useState("elements");

    return (
        <EditorProvider>
            <ProjectProvider projectId={id} >
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
            </ProjectProvider>
        </EditorProvider>
    );
};

export default Editor;