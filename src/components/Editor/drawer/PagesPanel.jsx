import { useEffect, useState } from "react";
import { useEditor } from "../../../context/EditorContext";
import AddPageModal from "../modals/AddPageModal";
import { MdModeEdit } from "react-icons/md";
import { FiX } from "react-icons/fi";

const PagesPanel = ({ showAddPageModal, setShowAddPageModal }) => {
    const { editor } = useEditor();
    const [pages, setPages] = useState([]);
    const [activePageId, setActivePageId] = useState(null);
    const [renamePage, setRenamePage] = useState(null);

    // Load page
    const loadPages = () => {
        if (!editor) return;
        const pm = editor.Pages;

        setActivePageId(pm.getSelected()?.getId());

        setPages(pm.getAll().map(p => ({
            id: p.getId(),
            name: p.get("name") || "Untitled",
            slug: p.get("slug") || "",
            isMain: p.get("type") === "main",
        })));
    };

    // Handle switch page
    const handleSwitchPage = (pageId) => {
        if (!editor) return;

        editor.Pages.select(pageId);

        setActivePageId(pageId);
    };

    // Handle delete page
    const handleDelete = (e, pageId) => {
        e.stopPropagation();

        if (!editor) return;

        const pm = editor.Pages;

        const pageToDeleted = pm.get(pageId);

        if (!pageToDeleted) return;

        if (pageToDeleted.get("type") === "main") {
            alert("Cannot delete the Main page.");
            return;
        }

        const allPages = pm.getAll();
        const nextPage = allPages.find(p => p.getId() !== pageId);
        if (nextPage) {
            pm.select(nextPage.getId());
        }

        pm.remove(pageId);
        loadPages();
    };

    // Handle add page
    const handleAddPage = ({ name, slug }, renamePageId = null) => {
        if (!editor) return;

        const pm = editor.Pages;

        if (renamePageId) {
            const page = pm.get(renamePageId);
            if (page) {
                page.set("name", name);
                page.set("slug", slug);
            }
        } else {
            // create new page
            const newPage = pm.add({
                name,
                slug,
            });

            // select new page
            pm.select(newPage.getId());
        }

        // update local state
        loadPages();
    };

    useEffect(() => {
        if (!editor) return;

        loadPages();

        editor.on("page:add page:remove page:select", loadPages);
        return () => {
            editor.off("page:add page:remove page:select", loadPages);
        };
    }, [editor]);


    return (
        <>
            <div className="p-3 space-y-2">
                {pages.map(page => (
                    <div
                        key={page.id}
                        onClick={() => handleSwitchPage(page.id)}
                        className={`flex justify-between items-center px-2 py-1.5 border border-gray-200 text-md rounded-sm cursor-pointer ${activePageId === page.id
                            ? "bg-primary text-gray-800"
                            : "text-gray-600"
                            }`}
                    >
                        {/* Page Name */}
                        <span>
                            {page.name} {page.isMain && "(Main)"}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center gap-2">

                            {/* EDIT */}
                            <button
                                onClick={() => {
                                    setShowAddPageModal(true);
                                    setRenamePage(page);
                                }}
                                className="text-gray-800 cursor-pointer"
                            >
                                <MdModeEdit size={14} />
                            </button>

                            {/* DELETE */}
                            {!page.isMain && (
                                <button
                                    onClick={(e) => handleDelete(e, page.id)}
                                    className="text-red-600 cursor-pointer"
                                >
                                    <FiX size={14} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {showAddPageModal && (
                <AddPageModal
                    onClose={() => {
                        setShowAddPageModal(false);
                        setRenamePage(null);
                    }}
                    onSubmit={handleAddPage}
                    pages={pages}
                    renamePage={renamePage}
                />
            )}
        </>
    );
};

export default PagesPanel;