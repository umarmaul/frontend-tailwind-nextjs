import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    isOpen: boolean;
}

export default function Modal({ onClose, children, isOpen }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
                isOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                ref={modalRef}
                className={`bg-white rounded-lg p-8 transform transition-transform duration-300 ${
                    isOpen ? "scale-100" : "scale-95"
                }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-red-500"
                >
                    Close
                </button>
                {children}
            </div>
        </div>
    );
}
