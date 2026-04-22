import useProjects from "../../hooks/useProjects";
import { formatDateTime } from "../../utils/formatDateTime";
import Spinner from "../Spinner";
import defaultThumbnail from "../../assets/thumbnail.jpg";
import { FiMoreVertical } from "react-icons/fi";

const Projects = () => {
    const { projects, projectsLoading } = useProjects();


    if (projectsLoading) {
        return (<div className="h-[calc(100vh-200px)] flex items-center justify-center">
            <Spinner />
        </div>);
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {
                projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
                    >

                        {/* Image */}
                        <div
                            className="relative group cursor-pointer border-b border-gray-200"
                            onClick={() => handleEdit(project._id)}
                        >
                            <img
                                src={project.image || defaultThumbnail}
                                alt="project"
                                className="w-full h-32 object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                                <span className="text-white text-sm font-medium">
                                    Edit Site
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 space-y-2">

                            {/* Title + Menu */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-800 truncate">
                                    {project.name}
                                </h3>


                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition cursor-pointer">
                                    <FiMoreVertical size={16} />
                                </button>
                            </div>

                            {/* Dates */}
                            <div className="text-xs text-gray-500">
                                <p>Created: {formatDateTime(project.createdAt)}</p>
                                <p>Updated: {formatDateTime(project.updatedAt)}</p>
                            </div>

                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Projects;