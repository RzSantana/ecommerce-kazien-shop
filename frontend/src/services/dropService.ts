import { API_CONFIG } from "src/config/api";
import type { CreateDropData, Drop, DropProduct } from "src/types/drop";
import { apiService } from "./api";

class DropService {
    // Obtener todos los drops (público)
    async getAllDrops(): Promise<Drop[]> {
        const response = await apiService.get<Drop[]>(
            API_CONFIG.ENDPOINTS.DROPS
        );
        return response.success ? response.data || [] : [];
    }

    // Obtener drops activos (público)
    async getActiveDrops(): Promise<Drop[]> {
        const response = await apiService.get<Drop[]>(
            `${API_CONFIG.ENDPOINTS.DROPS}/active`
        );
        return response.success ? response.data || [] : [];
    }

    // Obtener drop por ID (público)
    async getDropById(id: string): Promise<Drop | null> {
        const response = await apiService.get<Drop>(
            `${API_CONFIG.ENDPOINTS.DROPS}/${id}`
        );
        return response.success ? response.data || null : null;
    }

    // Crear drop (REQUIERE ADMIN AUTH)
    async createDrop(
        data: CreateDropData,
        userId?: string
    ): Promise<Drop | null> {
        const response = await apiService.post<Drop>(
            API_CONFIG.ENDPOINTS.DROPS,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Actualizar drop (REQUIERE ADMIN AUTH)
    async updateDrop(
        id: string,
        data: Partial<CreateDropData>,
        userId?: string
    ): Promise<Drop | null> {
        const response = await apiService.put<Drop>(
            `${API_CONFIG.ENDPOINTS.DROPS}/${id}`,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Eliminar drop (REQUIERE ADMIN AUTH)
    async deleteDrop(id: string, userId?: string): Promise<boolean> {
        const response = await apiService.delete(
            `${API_CONFIG.ENDPOINTS.DROPS}/${id}`,
            { requiresAuth: true, userId }
        );
        return response.success;
    }

    // Obtener productos de un drop (público)
    async getDropProducts(dropId: string): Promise<DropProduct[]> {
        const response = await apiService.get<DropProduct[]>(
            `${API_CONFIG.ENDPOINTS.DROPS}/${dropId}/products`
        );
        return response.success ? response.data || [] : [];
    }

    // Agregar producto a drop (REQUIERE ADMIN AUTH)
    async addProductToDrop(
        dropId: string,
        data: {
            productId: string;
            dropPrice?: number;
            isLimited?: boolean;
        },
        userId?: string
    ): Promise<DropProduct | null> {
        const response = await apiService.post<DropProduct>(
            `${API_CONFIG.ENDPOINTS.DROPS}/${dropId}/products`,
            data,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Remover producto de drop (REQUIERE ADMIN AUTH)
    async removeProductFromDrop(
        dropId: string,
        productId: string,
        userId?: string
    ): Promise<boolean> {
        const response = await apiService.delete(
            `${API_CONFIG.ENDPOINTS.DROPS}/${dropId}/products/${productId}`,
            { requiresAuth: true, userId }
        );
        return response.success;
    }

    // Convertir drops de API a formato del frontend
    transformDropsToFrontend(drops: Drop[]): any[] {
        return drops.map((drop) => ({
            id: drop.id,
            name: drop.name,
            description: drop.description,
            status: drop.status.toLowerCase().replace("_", "-"),
            releaseDate: new Date(drop.releaseDate),
            endDate: drop.endDate ? new Date(drop.endDate) : undefined,
            bannerImage: drop.bannerImage,
            themeColors: {
                primary: drop.primaryColor,
                secondary: drop.secondaryColor,
                accent: drop.accentColor,
            },
            products: drop.products.map((dp) => ({
                id: dp.product.id,
                name: dp.product.name,
                price: dp.dropPrice || dp.product.price,
                cover: dp.product.cover,
                category: dp.product.category,
                isLimited: dp.isLimited || dp.product.isLimited,
                stock: dp.product.stock,
            })),
        }));
    }
}

export const dropService = new DropService();
