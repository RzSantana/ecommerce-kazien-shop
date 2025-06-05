import type { CreateProductData, Product } from "src/types/product";
import { apiService } from "./apiService";
import { API_CONFIG } from "src/config/api";

class ProductService {
    // Obtener todos los productos (público)
    async getAllProducts(): Promise<Product[]> {
        const response = await apiService.get<Product[]>(
            API_CONFIG.ENDPOINTS.PRODUCTS
        );
        return response.success ? response.data || [] : [];
    }

    // Obtener producto por ID (público)
    async getProductById(id: string): Promise<Product | null> {
        const response = await apiService.get<Product>(
            `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`
        );
        return response.success ? response.data || null : null;
    }

    // Buscar productos (público)
    async searchProducts(query: string): Promise<Product[]> {
        const response = await apiService.get<Product[]>(
            `${API_CONFIG.ENDPOINTS.PRODUCTS}/search?q=${encodeURIComponent(
                query
            )}`
        );
        return response.success ? response.data || [] : [];
    }

    // Obtener productos por categoría (público)
    async getProductsByCategory(category: string): Promise<Product[]> {
        const response = await apiService.get<Product[]>(
            `${API_CONFIG.ENDPOINTS.PRODUCTS}/category/${category}`
        );
        return response.success ? response.data || [] : [];
    }

    // Crear producto (REQUIERE ADMIN AUTH)
    async createProduct(
        data: CreateProductData,
        userId?: string
    ): Promise<Product | null> {
        const response = await apiService.post<Product>(
            API_CONFIG.ENDPOINTS.PRODUCTS,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Actualizar producto (REQUIERE ADMIN AUTH)
    async updateProduct(
        id: string,
        data: Partial<CreateProductData>,
        userId?: string
    ): Promise<Product | null> {
        const response = await apiService.put<Product>(
            `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Eliminar producto (REQUIERE ADMIN AUTH)
    async deleteProduct(id: string, userId?: string): Promise<boolean> {
        const response = await apiService.delete(
            `${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`,
            { requiresAuth: true, userId }
        );
        return response.success;
    }

    // Obtener productos nuevos (público)
    async getNewProducts(): Promise<Product[]> {
        const products = await this.getAllProducts();
        return products.filter((product) => product.isNew);
    }

    // Obtener productos más vendidos (público)
    async getTopSaleProducts(): Promise<Product[]> {
        const products = await this.getAllProducts();
        return products.filter((product) => product.isTopSale);
    }

    // Obtener productos limitados (público)
    async getLimitedProducts(): Promise<Product[]> {
        const products = await this.getAllProducts();
        return products.filter((product) => product.isLimited);
    }
}

export const productService = new ProductService();
