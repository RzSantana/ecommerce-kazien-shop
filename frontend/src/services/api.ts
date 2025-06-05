import { API_CONFIG } from "src/config/api";
import type { ApiResponse } from "src/types/api";

interface RequestOptions extends RequestInit {
    requiresAuth?: boolean;
    userId?: string;
}

class ApiService {
    private baseUrl: string;

    public constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
    }

    private async request<T>(
        endpoint: string,
        options: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseUrl}${endpoint}`;
            const { requiresAuth, userId, ...fetchOptions } = options;

            // Headers base
            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                ...((fetchOptions.headers as Record<string, string>) || {}),
            };

            // Agregar autenticación si es requerida
            if (requiresAuth && userId) {
                headers["X-User-ID"] = userId;
            }

            const response = await fetch(url, {
                ...fetchOptions,
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API Request failed: ", error);
            return {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error occurred",
            };
        }
    }

    // GET request
    async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "GET", ...options });
    }

    // POST request
    async post<T>(endpoint: string, data: any, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        });
    }

    // PUT request
    async put<T>(endpoint: string, data: any, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        });
    }

    // DELETE request
    async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: "DELETE", ...options });
    }

    // Health check
    async checkHealth(): Promise<boolean> {
        try {
            const response = await this.get(API_CONFIG.ENDPOINTS.HEALTH);
            return response.success;
        } catch {
            return false;
        }
    }
}

export const apiService = new ApiService();
