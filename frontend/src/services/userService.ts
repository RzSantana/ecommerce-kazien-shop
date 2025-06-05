import type { User } from "@auth/core/types";
import { apiService } from "./api";
import type { DashboardStats } from "src/types/dashboard";


class UserService {
    private readonly ADMIN_ENDPOINT = "/api/admin";

    // Obtener estadísticas del dashboard (REQUIERE ADMIN AUTH)
    async getDashboardStats(userId: string): Promise<DashboardStats | null> {
        const response = await apiService.get<DashboardStats>(
            `${this.ADMIN_ENDPOINT}/dashboard`,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || null : null;
    }

    // Obtener todos los usuarios (REQUIERE ADMIN AUTH)
    async getAllUsers(userId: string): Promise<User[]> {
        const response = await apiService.get<User[]>(
            `${this.ADMIN_ENDPOINT}/users`,
            { requiresAuth: true, userId }
        );
        return response.success ? response.data || [] : [];
    }

    // Actualizar rol de usuario (REQUIERE ADMIN AUTH)
    async updateUserRole(
        targetUserId: string,
        newRole: string,
        adminUserId: string
    ): Promise<boolean> {
        const response = await apiService.put(
            `${this.ADMIN_ENDPOINT}/users/${targetUserId}/role`,
            { role: newRole },
            { requiresAuth: true, userId: adminUserId }
        );
        return response.success;
    }

    // Eliminar usuario (REQUIERE ADMIN AUTH)
    async deleteUser(
        targetUserId: string,
        adminUserId: string
    ): Promise<boolean> {
        const response = await apiService.delete(
            `${this.ADMIN_ENDPOINT}/users/${targetUserId}`,
            { requiresAuth: true, userId: adminUserId }
        );
        return response.success;
    }
}

export const userService = new UserService();
