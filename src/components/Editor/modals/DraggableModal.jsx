import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

let modalZIndex = 1000;

const DraggableModal = ({
    title,
    children,
    onClose,
    width = "220px",
}) => {
    const modalRef = useRef(null);
    const dragOffset = useRef({ x: 0, y: 0 });

    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const [dragging, setDragging] = useState(false);
    const [zIndex, setZIndex] = useState(++modalZIndex);

    // Center on mount
    useEffect(() => {
        if (!modalRef.current) return;

        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;

        setPosition({
            x: (window.innerWidth - modalWidth) / 2,
            y: (window.innerHeight - modalHeight) / 2,
        });
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging) return;

            setPosition({
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            });
        };

        const handleMouseUp = () => {
            setDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging]);

    const bringToFront = () => {
        setZIndex(++modalZIndex);
    };

    const handleMouseDown = (e) => {
        bringToFront();
        setDragging(true);

        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        };
    };

    return (
        <div
            className="absolute inset-0 bg-gray-100/30"
            style={{ zIndex }}
        >
            <div
                ref={modalRef}
                onMouseDown={bringToFront}
                className="absolute bg-white rounded shadow-xl border-t-4 border-primary overflow-hidden"
                style={{
                    width,
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                }}
            >
                {/* Header */}
                <div
                    onMouseDown={handleMouseDown}
                    className="flex items-center justify-between px-3 py-2 border-b border-gray-200 cursor-move bg-white"
                >
                    <h3 className="text-sm font-semibold text-gray-800">
                        {title?.toUpperCase()}
                    </h3>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    >
                        <IoClose size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-2 max-h-[500px] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DraggableModal;