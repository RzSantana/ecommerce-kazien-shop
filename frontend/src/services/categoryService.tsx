import type { Category, CreateCategoryData } from "src/types/category";
import { apiService } from "./api";

class CategoryService {
    private readonly ENDPOINT = "/api/categories";

    async getAllCategories(): Promise<Category[]> {
        const response = await apiService.get<Category[]>(this.ENDPOINT);
        return response.success ? response.data || [] : [];
    }

    async getActiveCategories(): Promise<Category[]> {
        const response = await apiService.get<Category[]>(`${this.ENDPOINT}/active`);
        return response.success ? response.data || [] : [];
    }

    async createCategory(data: CreateCategoryData): Promise<Category | null> {
        const response = await apiService.post<Category>(this.ENDPOINT, data);
        return response.success ? response.data || null : null;
    }

    async updateCategory(id: string, data: Partial<CreateCategoryData>): Promise<Category | null> {
        const response = await apiService.put<Category>(`${this.ENDPOINT}/${id}`, data);
        return response.success ? response.data || null : null;
    }

    async deleteCategory(id: string): Promise<boolean> {
        const response = await apiService.delete(`${this.ENDPOINT}/${id}`);
        return response.success;
    }
}

export const categoryService = new CategoryService();
