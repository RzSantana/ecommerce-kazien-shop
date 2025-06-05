export interface ToastConfig {
    id?: number;
    message: string;
    type: "success" | "error" | "warning" | "info";
    duration?: number;
}
