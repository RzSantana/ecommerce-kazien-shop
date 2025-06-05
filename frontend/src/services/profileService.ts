import { API_CONFIG } from "src/config/api";
import { apiService } from "./apiService";
import type {
    AccountTypeInfo,
    ChangePasswordData,
    ProfileData,
    UpdateProfileData,
} from "src/types/profile";

class ProfileService {
    private readonly AUTH_ENDPOINT = "/api/auth";

    // Obtener información del perfil actual
    async getProfile(userId: string): Promise<ProfileData | null> {
        try {
            console.log("👤 ProfileService: Getting profile for user:", userId);
            const response = await apiService.get<ProfileData>(
                `${this.AUTH_ENDPOINT}/me`,
                { requiresAuth: true, userId }
            );

            if (response.success && response.data) {
                console.log("✅ ProfileService: Profile loaded successfully");
                return response.data;
            }

            return null;
        } catch (error) {
            console.error("❌ ProfileService: Error getting profile:", error);
            return null;
        }
    }

    // Actualizar información del perfil
    async updateProfile(
        data: UpdateProfileData,
        userId: string
    ): Promise<ProfileData | null> {
        try {
            console.log("📝 ProfileService: Updating profile with data:", data);

            const response = await apiService.put<ProfileData>(
                `${this.AUTH_ENDPOINT}/profile`,
                data,
                { requiresAuth: true, userId }
            );

            if (response.success && response.data) {
                console.log("✅ ProfileService: Profile updated successfully");
                return response.data;
            }

            throw new Error(response.error || "Failed to update profile");
        } catch (error) {
            console.error("❌ ProfileService: Error updating profile:", error);
            throw error;
        }
    }

    // Cambiar contraseña
    async changePassword(
        data: ChangePasswordData,
        userId: string
    ): Promise<boolean> {
        try {
            console.log("🔐 ProfileService: Changing password");

            const response = await apiService.put(
                `${this.AUTH_ENDPOINT}/change-password`,
                data,
                { requiresAuth: true, userId }
            );

            if (response.success) {
                console.log("✅ ProfileService: Password changed successfully");
                return true;
            }

            throw new Error(response.error || "Failed to change password");
        } catch (error) {
            console.error("❌ ProfileService: Error changing password:", error);
            throw error;
        }
    }

    // Eliminar cuenta
    async deleteAccount(password: string, userId: string): Promise<boolean> {
        try {
            console.log("🗑️ ProfileService: Deleting account");

            const response = await apiService.delete(
                `${this.AUTH_ENDPOINT}/account`,
                {
                    requiresAuth: true,
                    userId,
                    body: JSON.stringify({ password }),
                }
            );

            if (response.success) {
                console.log("✅ ProfileService: Account deleted successfully");
                return true;
            }

            throw new Error(response.error || "Failed to delete account");
        } catch (error) {
            console.error("❌ ProfileService: Error deleting account:", error);
            throw error;
        }
    }

    // Obtener tipo de cuenta (local vs OAuth)
    async getAccountType(userId: string): Promise<AccountTypeInfo | null> {
        try {
            console.log("🔍 ProfileService: Getting account type");

            const response = await apiService.get<AccountTypeInfo>(
                `${this.AUTH_ENDPOINT}/account-type`,
                { requiresAuth: true, userId }
            );

            if (response.success && response.data) {
                console.log(
                    "✅ ProfileService: Account type loaded:",
                    response.data.type
                );
                return response.data;
            }

            return null;
        } catch (error) {
            console.error(
                "❌ ProfileService: Error getting account type:",
                error
            );
            return null;
        }
    }

    // Validaciones del lado cliente
    validateProfileData(data: UpdateProfileData): string[] {
        const errors: string[] = [];

        if (data.name !== undefined) {
            if (!data.name || data.name.trim().length < 2) {
                errors.push("Name must be at least 2 characters long");
            }
            if (data.name.trim().length > 50) {
                errors.push("Name must be less than 50 characters");
            }
        }

        if (data.email !== undefined) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!data.email || !emailRegex.test(data.email)) {
                errors.push("Please enter a valid email address");
            }
        }

        return errors;
    }

    validatePasswordData(data: ChangePasswordData): string[] {
        const errors: string[] = [];

        if (!data.currentPassword) {
            errors.push("Current password is required");
        }

        if (!data.newPassword) {
            errors.push("New password is required");
        } else {
            if (data.newPassword.length < 6) {
                errors.push("New password must be at least 6 characters long");
            }
            if (data.newPassword.length > 128) {
                errors.push("New password must be less than 128 characters");
            }
            if (data.currentPassword === data.newPassword) {
                errors.push(
                    "New password must be different from current password"
                );
            }
        }

        return errors;
    }
}

export const profileService = new ProfileService();
