import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const RenameModal = ({ isOpen, onClose, project }) => {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [slugError, setSlugError] = useState("");
    const [checking, setChecking] = useState(false);

    const userEmail = "useremail"; // replace with real user email

    useEffect(() => {
        if (project) {
            setName(project.name);
            setSlug(project.slug);
        }
    }, [project]);

    // 🔥 convert name → slug
    const generateSlug = (value) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");
    };

    // 🔹 handle name change
    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        const newSlug = generateSlug(value);
        setSlug(newSlug);
    };

    // 🔹 handle slug change (manual)
    const handleSlugChange = (e) => {
        const value = generateSlug(e.target.value);
        setSlug(value);
    };

    // 🔹 check slug availability (API placeholder)
    useEffect(() => {
        if (!slug) return;

        const delay = setTimeout(async () => {
            try {
                setChecking(true);
                setSlugError("");

                // 🚀 CALL API HERE
                // const res = await checkSlugAPI(slug);

                // ❌ Example logic
                // if (!res.available) {
                //     setSlugError("This URL is already taken");
                // }

            } catch (err) {
                console.error(err);
            } finally {
                setChecking(false);
            }
        }, 500); // debounce

        return () => clearTimeout(delay);
    }, [slug]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b">
                    <h2 className="text-lg font-semibold">Rename Site</h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>

                    {/* URL */}
                    <div>
                        <label className="text-sm text-gray-600">URL</label>

                        <div className="flex items-center mt-1 border rounded-md overflow-hidden">
                            <span className="px-3 text-sm text-gray-500 bg-gray-100 border-r">
                                /{userEmail}/
                            </span>

                            <input
                                type="text"
                                value={slug}
                                onChange={handleSlugChange}
                                className="flex-1 px-3 py-2 outline-none"
                            />
                        </div>

                        {/* status */}
                        {checking && (
                            <p className="text-xs text-gray-500 mt-1">
                                Checking availability...
                            </p>
                        )}

                        {slugError && (
                            <p className="text-xs text-red-500 mt-1">
                                {slugError}
                            </p>
                        )}
                    </div>

                </div>

                {/* Footer */}
                <div className="flex justify-end gap-2 px-5 py-3 border-t">

                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        // 🔥 SUBMIT API CALL HERE
                        // onClick={handleRenameSubmit}
                        disabled={!name || !slug || slugError}
                        className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
                    >
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RenameModal;