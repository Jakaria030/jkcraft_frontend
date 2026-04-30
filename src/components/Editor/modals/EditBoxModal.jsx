import DraggableModal from "./DraggableModal";
import Divider from "../../Divider";
import { FiAlignCenter, FiAlignJustify, FiAlignLeft, FiAlignRight, FiArrowDown, FiArrowRight, FiArrowUp, FiColumns, FiMinus, FiSquare } from "react-icons/fi";
import { BsGrid } from "react-icons/bs";
import { MdBorderColor, MdFormatColorFill } from "react-icons/md";

const EditBoxModal = ({ onClose }) => {
    return (
        <DraggableModal
            onClose={onClose}
            title="Box Design"
            width="260px"
        >
            <div className="px-3 space-y-4">

                {/* SIZE */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Size
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="text"
                            placeholder="Width (100%, px)"
                            className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <input
                            type="text"
                            placeholder="Height"
                            className="border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />
                    </div>
                </div>

                <Divider />

                {/* FLEX */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Direction
                    </h3>

                    {/* direction */}
                    <div className="flex justify-between gap-2">
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiArrowRight /> {/* row */}
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiArrowDown /> {/* column */}
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Justify
                    </h3>

                    {/* justify */}
                    <div className="flex justify-between gap-2">
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiAlignLeft />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiAlignCenter />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiAlignRight />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiAlignJustify />
                        </button>
                    </div>
                </div>

                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Flex Alignment
                    </h3>

                    {/* align items */}
                    <div className="flex justify-between gap-2">
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiArrowUp />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiMinus />
                        </button>
                        <button className="p-2 border border-gray-200 rounded-md hover:bg-primary text-gray-600 cursor-pointer">
                            <FiArrowDown />
                        </button>
                    </div>
                </div>

                <Divider />

                {/* BOX MODEL */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Spacing
                    </h3>

                    <div className="grid grid-cols-2 gap-3">

                        {/* MARGIN */}
                        <div className="border border-gray-200 rounded-sm p-2 text-xs">
                            <p className="text-gray-400 mb-1 text-center">Margin</p>

                            <div className="grid grid-cols-3 gap-1 text-center">
                                <div></div>
                                <input className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="T" />
                                <div></div>

                                <input className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="L" />
                                <div className="text-[10px] text-gray-400 mt-2">Box</div>
                                <input className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="R" />

                                <div></div>
                                <input className="border border-gray-200  p-1 rounded outline-none text-center" placeholder="B" />
                                <div></div>
                            </div>
                        </div>

                        {/* PADDING */}
                        <div className="border border-gray-200 rounded-sm p-2 text-xs">
                            <p className="text-gray-400 mb-1 text-center">Padding</p>

                            <div className="grid grid-cols-3 gap-1 text-center">
                                <div></div>
                                <input className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="T" />
                                <div></div>

                                <input className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="L" />
                                <div className="text-[10px] text-gray-400 mt-2">Box</div>
                                <input className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="R" />

                                <div></div>
                                <input className="border border-gray-200 p-1 rounded outline-none text-center" placeholder="B" />
                                <div></div>
                            </div>
                        </div>

                    </div>
                </div>

                <Divider />

                {/* BORDER */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Border
                    </h3>

                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Border Width"
                            className="w-42 border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <div className="relative">
                            <button className="p-2 border border-gray-200 rounded-sm text-gray-600">
                                <MdFormatColorFill />
                            </button>

                            <input
                                type="color"
                                className="absolute inset-0 size-8 opacity-0 cursor-pointer outline-none"
                            />
                        </div>
                    </div>
                </div>

                <Divider />

                {/* BACKGROUND */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-600 mb-2">
                        Background
                    </h3>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="#ffffff"
                            className="w-42 border border-gray-200 p-2 rounded-sm text-sm outline-none"
                        />

                        <div className="relative">
                            <button className="p-2 border border-gray-200 rounded-sm text-gray-600">
                                <MdFormatColorFill />
                            </button>

                            <input
                                type="color"
                                className="absolute inset-0 opacity-0 cursor-pointer outline-none"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </DraggableModal>
    );
};

export default EditBoxModal;