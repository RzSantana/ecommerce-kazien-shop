import { useState, useEffect } from "react";

interface ToastProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
    onClose: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getToastStyles = () => {
        const baseStyles = "fixed top-4 right-4 z-50 p-4 rounded-md font-medium text-white shadow-lg transition-all duration-300 max-w-sm";

        switch (type) {
            case "success":
                return `${baseStyles} bg-green-500`;
            case "error":
                return `${baseStyles} bg-red-500`;
            case "warning":
                return `${baseStyles} bg-yellow-500`;
            case "info":
                return `${baseStyles} bg-blue-500`;
            default:
                return `${baseStyles} bg-gray-500`;
        }
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return "✓";
            case "error":
                return "✕";
            case "warning":
                return "⚠";
            case "info":
                return "ℹ";
            default:
                return "";
        }
    };

    return (
        <div
            className={`${getToastStyles()} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
        >
            <div className="flex items-center">
                <span className="mr-2 text-lg">{getIcon()}</span>
                <span>{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 300);
                    }}
                    className="ml-4 text-white hover:text-gray-200"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
