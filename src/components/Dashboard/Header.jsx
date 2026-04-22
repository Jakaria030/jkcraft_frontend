import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import useProjects from "../../hooks/useProjects";
import { FiPlus } from "react-icons/fi";

const Header = () => {
    const { createProject } = useProjects();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                    Your Projects
                </h2>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 cursor-pointer">
                    <FiPlus />
                    Create Project
                </button>
            </div>

            <CreateProjectModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={createProject}
            />
        </>
    );
};

export default Header;