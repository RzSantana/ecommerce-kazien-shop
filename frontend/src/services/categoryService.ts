import type { Category, CreateCategoryData } from "src/types/category";
import { apiService } from "./api";

class CategoryService {
    private readonly ENDPOINT = "/api/categories";

    // Obtener todas las categorías (público)
    async getAllCategories(): Promise<Category[]> {
        const response = await apiService.get<Category[]>(this.ENDPOINT);
        return response.success ? response.data || [] : [];
    }

    // Obtener categorías activas (público)
    async getActiveCategories(): Promise<Category[]> {
        const response = await apiService.get<Category[]>(
            `${this.ENDPOINT}/active`
        );
        return response.success ? response.data || [] : [];
    }

    // Crear categoría (REQUIERE ADMIN AUTH)
    async createCategory(
        data: CreateCategoryData,
        userId?: string
    ): Promise<Category | null> {
        const response = await apiService.post<Category>(this.ENDPOINT, data, {
            requiresAuth: true,
            userId,
        });
        return response.success ? response.data || null : null;
    }

    // Actualizar categoría (REQUIERE ADMIN AUTH)
    async updateCategory(
        id: string,
        data: Partial<CreateCategoryData>,
        userId?: string
    ): Promise<Category | null> {
        const response = await apiService.put<Category>(
            `${this.ENDPOINT}/${id}`,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Eliminar categoría (REQUIERE ADMIN AUTH)
    async deleteCategory(id: string, userId?: string): Promise<boolean> {
        const response = await apiService.delete(`${this.ENDPOINT}/${id}`, {
            requiresAuth: true,
            userId,
        });
        return response.success;
    }
}

export const categoryService = new CategoryService();
