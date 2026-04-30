import { useEffect, useState } from "react";
import { useEditor } from "../../../context/EditorContext";
import { useProject } from "../../../context/ProjectContext";

const SEO = ({ pageId }) => {
    const { editor } = useEditor();
    const { project, saveProject, updateSEO } = useProject();
    const [isSaving, setIsSaving] = useState(false);
    const [seoData, setSeoData] = useState({
        id: pageId,
        title: "",
        description: "",
        keywords: "",
    });

    const applySEO = (editor, seo) => {
        const doc = editor.Canvas.getDocument();

        // Title
        if (seo?.title) {
            doc.title = seo.title;
        }

        // Meta description
        let metaDesc = doc.querySelector('meta[name="description"]');

        if (!metaDesc) {
            metaDesc = doc.createElement("meta");
            metaDesc.setAttribute("name", "description");
            doc.head.appendChild(metaDesc);
        }

        metaDesc.setAttribute("content", seo?.description || "");

        // Keywords
        let metaKey = doc.querySelector('meta[name="keywords"]');

        if (!metaKey) {
            metaKey = doc.createElement("meta");
            metaKey.setAttribute("name", "keywords");
            doc.head.appendChild(metaKey);
        }

        metaKey.setAttribute("content", seo?.keywords || "");

        setSeoData({ ...seo })
    };

    // Handle SEO Submit
    const handleSubmit = async () => {
        if (!editor) return;
        setIsSaving(true);

        const seo = { ...seoData, id: pageId }

        setSeoData(seo);

        try {
            await updateSEO({ seo: seoData });
        } finally {
            setIsSaving(false);
        }
    };


    useEffect(() => {
        if (!editor || !project) return;

        const seo = project?.seo.find(seo => seo.id === pageId);

        if (!seo) return;

        applySEO(editor, seo);
    }, [pageId]);

    return (
        <div className="px-4 py-2 space-y-3">

            {/* Title */}
            <div>
                <label className="text-xs text-gray-600">Page Title</label>
                <input
                    type="text"
                    value={seoData.title}
                    onChange={(e) =>
                        setSeoData({ ...seoData, title: e.target.value })
                    }
                    className="w-full text-gray-600 border border-gray-200 p-2 rounded outline-none"
                />
            </div>

            {/* Description */}
            <div>
                <label className="text-xs text-gray-500">Meta Description</label>
                <textarea
                    value={seoData.description}
                    onChange={(e) =>
                        setSeoData({ ...seoData, description: e.target.value })
                    }
                    className="w-full text-gray-600 border border-gray-200 p-2 rounded outline-none"
                />
            </div>

            {/* Keywords */}
            <div>
                <label className="text-xs text-gray-500">Keywords</label>
                <input
                    type="text"
                    value={seoData.keywords}
                    onChange={(e) =>
                        setSeoData({ ...seoData, keywords: e.target.value })
                    }
                    className="w-full text-gray-600 border border-gray-200 p-2 rounded outline-none"
                    placeholder="comma separated"
                />
            </div>

            {/* Apply seo button */}
            <button
                onClick={handleSubmit}
                className="w-full bg-primary text-white py-1.5 rounded-md cursor-pointer">
                {isSaving ? "Applying SEO..." : "Apply SEO"}
            </button>

        </div>
    );
};

export default SEO;