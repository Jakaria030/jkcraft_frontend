import { useState } from "react";
import { FiX } from "react-icons/fi";

const MenuModal = ({ isOpen, onClose, menuPosition, project, onDeleteProject, onSetRenameModal }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed z-50"
            style={{ top: menuPosition.top, left: menuPosition.left }}
        >
            <div className="w-42 bg-white rounded-lg shadow-lg">

                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
                    <span className="text-sm font-semibold text-gray-700 uppercase">
                        Site settings
                    </span>

                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                        <FiX size={14} />
                    </button>
                </div>

                {/* Menu items */}
                <div className="py-1">

                    <button
                        onClick={() => {
                            onClose();
                            onSetRenameModal();
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                        Rename Site
                    </button>

                    <button
                        onClick={() => {
                            onClose()
                            // open thumbnail modal later
                        }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                        Update Thumbnail
                    </button>

                    <button
                        onClick={() => {
                            onClose()
                            onDeleteProject(project._id)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                        Delete Site
                    </button>

                </div>

            </div>
        </div>
    );
};

export default MenuModal;