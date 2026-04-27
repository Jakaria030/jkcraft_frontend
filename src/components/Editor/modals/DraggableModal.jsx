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

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [zIndex, setZIndex] = useState(++modalZIndex);

    const dragOffset = useRef({ x: 0, y: 0 });

    // Center modal on mount
    useEffect(() => {
        if (!modalRef.current) return;

        const modalWidth = modalRef.current.offsetWidth;
        const modalHeight = modalRef.current.offsetHeight;

        setPosition({
            x: (window.innerWidth - modalWidth - 416) / 2,
            y: (window.innerHeight - modalHeight - 48) / 2,
        });
    }, []);

    // Outside click close
    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target)
            ) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, [onClose]);

    // Bring modal to top
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

    return (
        <div
            className="absolute inset-0"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                ref={modalRef}
                onMouseDown={bringToFront}
                className="absolute max-h-3/4 bg-white rounded shadow-xl border-t-4 border-primary overflow-hidden"
                style={{
                    width,
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    zIndex,
                }}
            >
                {/* Header */}
                <div
                    onMouseDown={handleMouseDown}
                    className="flex items-center justify-between px-4 py-2 border-b border-gray-200 cursor-move bg-white"
                >
                    <h3 className="text-sm font-semibold text-gray-800">
                        {title}
                    </h3>

                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                    >
                        <IoClose size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DraggableModal;