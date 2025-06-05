import { useState, useEffect } from "react";
import type { ToastConfig } from "src/types/toast";
import { ToastManager } from "src/utils/toast";

export function useToast() {
    const [toasts, setToasts] = useState<ToastConfig[]>([]);

    useEffect(() => {
        return ToastManager.subscribe(setToasts);
    }, []);

    return {
        toasts,
        show: ToastManager.show,
        success: ToastManager.success,
        error: ToastManager.error,
        warning: ToastManager.warning,
        info: ToastManager.info
    };
}
