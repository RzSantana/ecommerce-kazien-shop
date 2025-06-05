import type { ToastConfig } from "src/types/toast";

export class ToastManager {
    private static toasts: ToastConfig[] = [];
    private static listeners: ((toasts: ToastConfig[]) => void)[] = [];

    static show(config: ToastConfig) {
        const toast = { ...config, id: Date.now() };
        this.toasts.push(toast);
        this.notifyListeners();

        // Auto remove after duration
        setTimeout(() => {
            this.remove(toast.id);
        }, config.duration || 3000);
    }

    static remove(id: number) {
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifyListeners();
    }

    static subscribe(listener: (toasts: ToastConfig[]) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private static notifyListeners() {
        this.listeners.forEach(listener => listener([...this.toasts]));
    }

    // Convenience methods
    static success(message: string, duration?: number) {
        this.show({ message, type: "success", duration });
    }

    static error(message: string, duration?: number) {
        this.show({ message, type: "error", duration });
    }

    static warning(message: string, duration?: number) {
        this.show({ message, type: "warning", duration });
    }

    static info(message: string, duration?: number) {
        this.show({ message, type: "info", duration });
    }
}
