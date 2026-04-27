import { useState } from "react";
import { FiArrowLeft, FiDroplet, FiType } from "react-icons/fi";
import Typography from "./TypoGraphy";
import Colors from "./Colors";


const ThemeTypes = () => {
    const [activeTheme, setActiveTheme] = useState(null);


    return (
        <div className="relative w-full h-full overflow-hidden">

            {/* Main Wrapper */}
            <div
                className={`flex w-[200%] h-full transition-transform duration-300 ease-in-out
                ${activeTheme ? "-translate-x-1/2" : "translate-x-0"}`}
            >

                {/* Theme Type Panel */}
                <div className="w-1/2 p-4 space-y-3">

                    {/* Typography */}
                    <button
                        onClick={() => setActiveTheme("typography")}
                        className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                            <FiType size={20} />
                        </div>

                        <div className="text-left">
                            <h3 className="font-medium text-sm">
                                Typography
                            </h3>
                            <p className="text-xs text-gray-500">
                                Manage fonts, headings, and text styles
                            </p>
                        </div>
                    </button>

                    {/* Colors */}
                    <button
                        onClick={() => setActiveTheme("colors")}
                        className="w-full flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                        <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center">
                            <FiDroplet size={20} />
                        </div>

                        <div className="text-left">
                            <h3 className="font-medium text-sm">
                                Colors
                            </h3>
                            <p className="text-xs text-gray-500">
                                Manage brand colors and theme palette
                            </p>
                        </div>
                    </button>

                </div>

                {/* Detail Panel */}
                <div className="w-1/2 h-full border-l border-gray-200">

                    {/* Typography Panel */}
                    {activeTheme === "typography" && (
                        <Typography
                            onBack={() => setActiveTheme(null)}
                        />
                    )}

                    {/* Color Panel */}
                    {activeTheme === "colors" && (
                        <Colors onBack={() => setActiveTheme(null)} />
                    )}

                </div>

            </div>
        </div>
    );
};

export default ThemeTypes;