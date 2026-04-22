import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import ErrorCard from "../ErrorCard";

const RenameModal = ({ isOpen, onClose, project, onUpdateProject }) => {
    const { user } = useAuth();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (project) {
            setName(project.name);
            setDescription(project.description);
            setSlug(project.slug);
            setError(null);
        }
    }, [project]);

    // convert name → slug
    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    };

    // handle name change
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        const newSlug = generateSlug(value);
        setSlug(newSlug);
    };

    // handle slug change
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    // handle slug change
    const handleSlugChange = (e) => {
        const value = generateSlug(e.target.value);
        setSlug(value);
    };

    // handle submit
    const handleRenameSubmit = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const res = await onUpdateProject(id, { name, description, slug });

            if (res.success) {
                onClose();
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Rename failed")
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const disableButton = !name || !slug;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-lg shadow-lg">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Rename Site</h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">

                    {/* Site Name */}
                    <div>
                        <label className="text-sm text-gray-600">Site Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* Site Description */}
                    <div>
                        <label className="text-sm text-gray-600">Site Description</label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <label className="text-sm text-gray-600">URL</label>

                        <div className="flex items-center mt-1 rounded-md overflow-hidden">
                            <span className="px-3 py-2 text-sm text-gray-500 bg-gray-200 rounded-l-md">
                                /{user.email}/
                            </span>

                            <input
                                type="text"
                                value={slug}
                                onChange={handleSlugChange}
                                className="flex-1 px-3 py-2 outline-none"
                            />
                        </div>

                        {/* status */}
                        {error && (
                            <ErrorCard message={error} />
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-200">

                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 border rounded-md cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => handleRenameSubmit(project._id)}
                        disabled={disableButton}
                        className={`px-4 py-1.5 bg-primary text-white rounded-md disabled:bg-gray-400 ${disableButton ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RenameModal;