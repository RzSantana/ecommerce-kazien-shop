import { DatabaseManager } from "../../database/DatabaseManager";
import { User } from "../../generated/prisma";
import {
    LoginData,
    RegisterData,
    UpdateProfileData,
    ChangePasswordData,
} from "./interfaces";

export class AuthService {
    private db = DatabaseManager.getInstance().getClient();

    // Hash simple (en producción usa bcrypt)
    private hashPassword(password: string): string {
        return Buffer.from(password).toString("base64");
    }

    private verifyPassword(password: string, hash: string): boolean {
        const hashedInput = Buffer.from(password).toString("base64");
        return hashedInput === hash;
    }

    public async register(data: RegisterData): Promise<User> {
        try {
            console.log(
                "🔐 AuthService: Registration attempt for:",
                data.email
            );

            // Verificar si el usuario ya existe
            const existingUser = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (existingUser) {
                console.error(
                    "❌ AuthService: User already exists:",
                    data.email
                );
                throw new Error("User already exists");
            }

            // Crear nuevo usuario
            const hashedPassword = this.hashPassword(data.password);

            const newUser = await this.db.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                    role: "user",
                },
            });

            console.log(
                "✅ AuthService: User registered successfully:",
                newUser.id
            );
            return newUser;
        } catch (error) {
            console.error("💥 AuthService Registration Error:", error);
            throw error;
        }
    }

    public async login(data: LoginData): Promise<User | null> {
        try {
            console.log("🔐 AuthService: Login attempt for:", data.email);

            const user = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (!user) {
                console.error("❌ AuthService: User not found:", data.email);
                return null;
            }

            console.log("🔍 AuthService: User found, verifying password...");

            if (!this.verifyPassword(data.password, user.password)) {
                console.error(
                    "❌ AuthService: Password verification failed for:",
                    data.email
                );
                return null;
            }

            console.log(
                "✅ AuthService: Login successful for:",
                data.email,
                "Role:",
                user.role
            );
            return user;
        } catch (error) {
            console.error("💥 AuthService Login Error:", error);
            return null;
        }
    }

    // Método para verificar/crear usuarios de Google OAuth
    public async findOrCreateGoogleUser(data: {
        email: string;
        name: string;
        googleId: string;
    }): Promise<User | null> {
        try {
            console.log(
                "🔐 AuthService: Finding/creating Google user:",
                data.email
            );

            // Verificar si el usuario ya existe por email
            let user = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (user) {
                console.log("✅ AuthService: Google user found:", user.id);
                return user;
            }

            // Si no existe, crear nuevo usuario OAuth
            console.log(
                "🔐 AuthService: Creating new Google user:",
                data.email
            );
            user = await this.db.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    password: "", // Usuarios OAuth no tienen password local
                    role: "user",
                },
            });

            console.log(
                "✅ AuthService: Google user created successfully:",
                user.id
            );
            return user;
        } catch (error) {
            console.error(
                "💥 AuthService FindOrCreateGoogleUser Error:",
                error
            );
            return null;
        }
    }

    public async getUserById(id: string): Promise<Object | null> {
        try {
            const user = await this.db.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false, // No incluir password
                },
            });

            if (user) {
                console.log("✅ AuthService: User found by ID:", id);
            } else {
                console.log("❌ AuthService: User not found by ID:", id);
            }

            return user;
        } catch (error) {
            console.error("💥 AuthService GetUserById Error:", error);
            return null;
        }
    }

    public async updateProfile(
        userId: string,
        data: UpdateProfileData
    ): Promise<User | null> {
        try {
            console.log("📝 AuthService: Updating profile for user:", userId);

            // Verificar que el usuario existe
            const existingUser = await this.db.user.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                console.error(
                    "❌ AuthService: User not found for profile update:",
                    userId
                );
                throw new Error("User not found");
            }

            // Si se está cambiando el email, verificar que no esté en uso
            if (data.email && data.email !== existingUser.email) {
                const emailInUse = await this.db.user.findUnique({
                    where: { email: data.email },
                });

                if (emailInUse) {
                    console.error(
                        "❌ AuthService: Email already in use:",
                        data.email
                    );
                    throw new Error("Email already in use");
                }
            }

            // Actualizar perfil
            const updatedUser = await this.db.user.update({
                where: { id: userId },
                data: {
                    ...(data.name && { name: data.name }),
                    ...(data.email && { email: data.email }),
                    updatedAt: new Date(),
                },
            });

            console.log(
                "✅ AuthService: Profile updated successfully for:",
                userId
            );
            return updatedUser;
        } catch (error) {
            console.error("💥 AuthService UpdateProfile Error:", error);
            throw error;
        }
    }

    public async changePassword(
        userId: string,
        data: ChangePasswordData
    ): Promise<boolean> {
        try {
            console.log("🔐 AuthService: Changing password for user:", userId);

            // Obtener usuario con password
            const user = await this.db.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.error(
                    "❌ AuthService: User not found for password change:",
                    userId
                );
                throw new Error("User not found");
            }

            // Verificar contraseña actual
            if (!this.verifyPassword(data.currentPassword, user.password)) {
                console.error(
                    "❌ AuthService: Current password verification failed for:",
                    userId
                );
                throw new Error("Current password is incorrect");
            }

            // Hashear nueva contraseña
            const newHashedPassword = this.hashPassword(data.newPassword);

            // Actualizar contraseña
            await this.db.user.update({
                where: { id: userId },
                data: {
                    password: newHashedPassword,
                    updatedAt: new Date(),
                },
            });

            console.log(
                "✅ AuthService: Password changed successfully for:",
                userId
            );
            return true;
        } catch (error) {
            console.error("💥 AuthService ChangePassword Error:", error);
            throw error;
        }
    }

    public async deleteAccount(
        userId: string,
        password: string
    ): Promise<boolean> {
        try {
            console.log("🗑️ AuthService: Deleting account for user:", userId);

            // Obtener usuario con password
            const user = await this.db.user.findUnique({
                where: { id: userId },
            });

            if (!user) {
                console.error(
                    "❌ AuthService: User not found for account deletion:",
                    userId
                );
                throw new Error("User not found");
            }

            // Verificar contraseña para seguridad
            if (!this.verifyPassword(password, user.password)) {
                console.error(
                    "❌ AuthService: Password verification failed for account deletion:",
                    userId
                );
                throw new Error("Password is incorrect");
            }

            // Eliminar cuenta
            await this.db.user.delete({
                where: { id: userId },
            });

            console.log(
                "✅ AuthService: Account deleted successfully for:",
                userId
            );
            return true;
        } catch (error) {
            console.error("💥 AuthService DeleteAccount Error:", error);
            throw error;
        }
    }

    // Método para verificar si una cuenta es local (tiene password) o de OAuth
    public async isLocalAccount(userId: string): Promise<boolean> {
        try {
            const user = await this.db.user.findUnique({
                where: { id: userId },
                select: { password: true },
            });

            // Si tiene password, es cuenta local
            return user ? user.password.length > 0 : false;
        } catch (error) {
            console.error("💥 AuthService IsLocalAccount Error:", error);
            return false;
        }
    }

    // Métodos existentes que mantienen compatibilidad...
    public async testCredentials(
        email: string,
        password: string
    ): Promise<boolean> {
        try {
            console.log("🧪 AuthService: Testing credentials for:", email);
            const user = await this.login({ email, password });
            return user !== null;
        } catch (error) {
            console.error("🧪 AuthService: Test credentials failed:", error);
            return false;
        }
    }

    public async getAllUsers(): Promise<any[]> {
        try {
            const users = await this.db.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    password: true, // Para debugging
                },
            });

            console.log("🔍 AuthService: All users in database:");
            users.forEach((user) => {
                console.log(
                    `  - ${user.email} (${user.role}) - Hash: ${user.password}`
                );
            });

            return users;
        } catch (error) {
            console.error("💥 AuthService: Error getting all users:", error);
            return [];
        }
    }
}
