import type { Category, CreateCategoryData } from "src/types/category";
import { API_CONFIG } from "src/config/api";

class CategoryService {
    private readonly BASE_URL = API_CONFIG.BASE_URL;
    private readonly ENDPOINT = "/api/categories";

    // Realizar petición con manejo de errores
    private async makeRequest<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T | null> {
        try {
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error ||
                        `HTTP ${response.status}: ${response.statusText}`
                );
            }

            const data = await response.json();

            if (data.success === false) {
                throw new Error(data.error || "Request failed");
            }

            return data.success ? data.data : data;
        } catch (error) {
            console.error(`API Request failed for ${url}:`, error);
            throw error;
        }
    }

    async getAllCategories(): Promise<Category[]> {
        try {
            console.log("🔍 Fetching all categories...");
            const data = await this.makeRequest<Category[]>(
                `${this.BASE_URL}${this.ENDPOINT}`
            );
            console.log(`✅ Loaded ${data?.length || 0} categories`);
            return data || [];
        } catch (error) {
            console.error("❌ Error getting all categories:", error);
            return [];
        }
    }

    async getActiveCategories(): Promise<Category[]> {
        try {
            console.log("🔍 Fetching active categories...");
            const data = await this.makeRequest<Category[]>(
                `${this.BASE_URL}${this.ENDPOINT}/active`
            );
            console.log(`✅ Loaded ${data?.length || 0} active categories`);
            return data || [];
        } catch (error) {
            console.error("❌ Error getting active categories:", error);
            return [];
        }
    }

    async createCategory(data: CreateCategoryData): Promise<Category | null> {
        try {
            console.log("✅ Creating category with data:", data);

            const category = await this.makeRequest<Category>(
                `${this.BASE_URL}${this.ENDPOINT}`,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            );

            console.log("✅ Category created successfully:", category);
            return category;
        } catch (error) {
            console.error("❌ Error creating category:", error);
            throw error;
        }
    }

    async updateCategory(
        id: string,
        data: Partial<CreateCategoryData>
    ): Promise<Category | null> {
        try {
            console.log(`✅ Updating category ${id} with data:`, data);

            const category = await this.makeRequest<Category>(
                `${this.BASE_URL}${this.ENDPOINT}/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(data),
                }
            );

            console.log("✅ Category updated successfully:", category);
            return category;
        } catch (error) {
            console.error(`❌ Error updating category ${id}:`, error);
            throw error;
        }
    }

    async deleteCategory(id: string): Promise<boolean> {
        try {
            console.log(`🗑️ Deleting category ${id}`);

            await this.makeRequest(`${this.BASE_URL}${this.ENDPOINT}/${id}`, {
                method: "DELETE",
            });

            console.log("✅ Category deleted successfully");
            return true;
        } catch (error) {
            console.error(`❌ Error deleting category ${id}:`, error);
            return false;
        }
    }

    async getCategoryById(id: string): Promise<Category | null> {
        try {
            console.log(`🔍 Fetching category ${id}...`);
            const category = await this.makeRequest<Category>(
                `${this.BASE_URL}${this.ENDPOINT}/${id}`
            );
            console.log("✅ Category loaded:", category);
            return category;
        } catch (error) {
            console.error(`❌ Error getting category ${id}:`, error);
            return null;
        }
    }
}

export const categoryService = new CategoryService();
