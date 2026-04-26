import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import useProjects from "../../hooks/useProjects";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
    const { user } = useAuth();
    const { createProject } = useProjects();
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    {user?.role === "admin" ? "Your Templates" : "Your Projects"}
                </h2>

                <button
                    onClick={() => setOpenModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 cursor-pointer">
                    <FiPlus />
                    {user?.role === "admin" ? "Create Template" : "Create Project"}
                </button>
            </div>

            <CreateProjectModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onCreate={createProject}
                modalFor={user?.role === "admin" ? "template" : "project"}
            />
        </>
    );
};

export default Header;