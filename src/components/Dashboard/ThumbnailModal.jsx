import { FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import ErrorCard from "../ErrorCard";

const ThumbnailModal = ({ isOpen, onClose, project, onUpdateThumbnail }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setPreview(project?.thumbnail);
    }, [project]);

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", image);

            const res = await onUpdateThumbnail(id, formData);

            if (res.success) {
                onClose();
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Thumbnail update failed");
        } finally {
            setLoading(false);
        }
    };

    const disableButton = !image;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-md rounded-lg shadow-lg">

                {/* Header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Update Thumbnail</h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <FiX />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">

                    {/* Preview + Upload */}
                    <label className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden cursor-pointer border border-dashed hover:bg-gray-200 transition">

                        {/* hidden input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />

                        {preview ? (
                            <img
                                src={preview}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm text-gray-500">
                                Upload Image
                            </span>
                        )}
                    </label>

                    {error && <ErrorCard message={error} />}

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
                        onClick={() => handleSubmit(project._id)}
                        disabled={disableButton}
                        className={`px-4 py-1.5 bg-primary text-white rounded-md disabled:bg-gray-400 ${disableButton ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        {loading ? "Uploading..." : "Upload"}
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ThumbnailModal;