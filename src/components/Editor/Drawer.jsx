import { FiX } from "react-icons/fi";
import BlockElements from "./drawer/BlockElements";
import ThemeTypes from "./drawer/ThemeTypes";
import SEO from "./drawer/SEO";

const Drawer = ({ activePanel, onActivePanel }) => {
    return (
        <div
            className={` bg-white border-r border-gray-200 transition-all duration-300 overflow-hidden
        ${activePanel ? "w-90" : "w-0"}`}
        >
            <div>
                {activePanel === "elements" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="font-semibold">Add Element</h2>
                            <button
                                onClick={() =>
                                    onActivePanel(null)
                                }
                                className="cursor-pointer">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Element blocks */}
                        <BlockElements />
                    </div>
                )}

                {activePanel === "pages" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="font-semibold">Add Layout</h2>
                            <button
                                onClick={() =>
                                    onActivePanel(null)
                                }
                                className="cursor-pointer">
                                <FiX size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 p-4">Layout list here...</p>
                    </div>
                )}

                {activePanel === "themes" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="font-semibold">Theme Settings</h2>
                            <button
                                onClick={() =>
                                    onActivePanel(null)
                                }
                                className="cursor-pointer">
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* Themes types */}
                        <ThemeTypes />
                    </div>
                )}

                {activePanel === "assets" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="font-semibold">Add Media</h2>
                            <button
                                onClick={() =>
                                    onActivePanel(null)
                                }
                                className="cursor-pointer">
                                <FiX size={24} />
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 p-4">Media list here...</p>
                    </div>
                )}

                {activePanel === "seo" && (
                    <div>
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <h2 className="font-semibold">Add SEO</h2>
                            <button onClick={() => onActivePanel(null)}>
                                <FiX size={24} />
                            </button>
                        </div>

                        {/* SEO */}
                        <SEO />
                    </div>
                )}

            </div>
        </div>
    );
};

export default Drawer;