import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

const AddPageModal = ({ onClose, onSubmit, pages, renamePage }) => {
    const [name, setName] = useState(renamePage?.name ?? "");
    const [slug, setSlug] = useState(renamePage?.slug ?? "");
    const [error, setError] = useState("");


    useEffect(() => {
        const generated = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "");

        setSlug(generated);
    }, [name]);

    useEffect(() => {
        if (!slug) return;

        if (pages.find(page => page.id != renamePage?.id && page.slug === slug)) {
            setError("Slug already exists");
        } else {
            setError("");
        }
    }, [slug]);

    // Handle submit
    const handleSubmit = () => {
        if (!name || !slug || error) return;

        onSubmit({ name, slug }, renamePage?.id);

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="w-[380px] bg-white rounded-lg shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-800">
                        {renamePage ? "✏️ Edit Page" : "📄 New Page"}
                    </span>

                    <button
                        className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                        onClick={onClose}
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-4 space-y-4">

                    {/* Page Name */}
                    <div>
                        <label className="text-xs font-medium text-gray-600">
                            Page Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. About Us"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full text-gray-600 px-3 py-2 text-sm border border-gray-200 rounded-md outline-none"
                        />
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="text-xs font-medium text-gray-600">
                            Slug / Endpoint
                        </label>

                        <div className="mt-1 flex items-center border border-gray-200 rounded-md overflow-hidden">

                            <span className="px-3 text-gray-400 text-sm bg-gray-50 border-r border-gray-200">
                                /
                            </span>

                            <input
                                type="text"
                                placeholder="e.g. about-us"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-3 py-2 text-gray-600 text-sm outline-none"
                            />
                        </div>

                        {error ? (<p className="mt-1 text-xs text-red-500">
                            slug already exist
                        </p>) : (<p className="mt-1 text-xs text-gray-400">
                            This will be the URL path for this page
                        </p>)}
                    </div>

                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-200">

                    <button
                        className="px-3 py-1.5 text-sm text-gray-800 transition cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-1.5 text-sm bg-primary text-white rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
                        onClick={handleSubmit}
                        disabled={!name.trim()}
                    >
                        {renamePage ? "Update Page" : "Create Page"}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default AddPageModal;