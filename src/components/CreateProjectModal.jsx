import { useState } from "react";
import defaultThumbnail from "../assets/thumbnail.jpg";
import { FiX } from "react-icons/fi";
import useTemplatesInfo from "../hooks/useTemplatesInfo";
import ErrorCard from "./ErrorCard";
import { useNavigate } from "react-router";

const CreateProjectModal = ({ isOpen, onClose, onCreate }) => {
    const { templatesInfo, loadingTemplatesInfo } = useTemplatesInfo();
    const [form, setForm] = useState({
        name: "",
        description: "",
        templateId: "",
    });
    const [loadin, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTemplateSelect = (id) => {
        setForm({ ...form, templateId: id });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.templateId) return;

        setLoading(true);
        setError(null);
        try {
            const res = await onCreate(form);

            setForm({
                name: "",
                description: "",
                templateId: "",
            });

            onClose();
            navigate(`/editor/${res?.data?._id}`);
        } catch (err) {
            console.log(err)
            setError(err?.response?.data?.message || "Project create failed.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const disableButton = !form.name || !form.templateId;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            <div className="bg-white w-full max-w-lg p-6 rounded-lg">

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        Create Project
                    </h2>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition cursor-pointer"
                    >
                        <FiX size={16} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="text-sm text-gray-600">Project Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm text-gray-600">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Template Selection */}
                    <div>
                        <label className="text-sm text-gray-600 block mb-2">
                            Select Template *
                        </label>

                        <div className="grid grid-cols-2 gap-4">

                            {templatesInfo.map((template) => (
                                <label
                                    key={template._id}
                                    className={`border rounded-lg cursor-pointer overflow-hidden transition 
                                        ${form.templateId === template.currentVersionId ? "border-primary ring-2 ring-primary" : "hover:border-gray-400"}`}
                                >
                                    {/* hidden radio */}
                                    <input
                                        type="radio"
                                        name="templateId"
                                        value={template.currentVersionId}
                                        checked={form.templateId === template.currentVersionId}
                                        onChange={() => handleTemplateSelect(template.currentVersionId)}
                                        className="hidden"
                                    />

                                    {/* image */}
                                    <img
                                        src={template?.thumbnail ? template?.thumbnail : defaultThumbnail}
                                        alt={template.name}
                                        className="w-full h-24 object-cover"
                                    />

                                    {/* name */}
                                    <div className="p-2 text-sm font-medium text-center">
                                        {template.name}
                                    </div>
                                </label>
                            ))}

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-1.5 border rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className={`bg-primary text-white px-4 py-1.5 rounded-md disabled:bg-gray-400 ${disableButton ? "cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={disableButton}
                        >
                            Create
                        </button>
                    </div>

                </form>

                {error && (
                    <ErrorCard message={error} />
                )}
            </div>
        </div>
    );
};

export default CreateProjectModal;