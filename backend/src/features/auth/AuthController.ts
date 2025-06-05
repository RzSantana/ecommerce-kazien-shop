import { Context } from "hono";
import { AuthService } from "./AuthService";

export class AuthController {
    private authService = new AuthService();

    // POST /api/auth/register
    public async register(c: Context) {
        try {
            console.log("🔐 AuthController: Register attempt");
            const { email, password, name } = await c.req.json();

            if (!email || !password || !name) {
                console.log("❌ AuthController: Missing required fields");
                return c.json(
                    {
                        success: false,
                        error: "Email, password and name are required",
                    },
                    400
                );
            }

            console.log("🔐 AuthController: Registering user:", email);
            const user = await this.authService.register({
                email,
                password,
                name,
            });

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            console.log(
                "✅ AuthController: User registered successfully:",
                user.id
            );
            return c.json(
                {
                    success: true,
                    data: userWithoutPassword,
                },
                201
            );
        } catch (error) {
            console.error("❌ AuthController: Registration error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Registration failed";
            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                400
            );
        }
    }

    // POST /api/auth/login
    public async login(c: Context) {
        try {
            console.log("🔐 AuthController: Login attempt");
            const { email, password } = await c.req.json();

            console.log("🔐 AuthController: Login data received:", {
                email,
                password: "***",
            });

            if (!email || !password) {
                console.log("❌ AuthController: Missing email or password");
                return c.json(
                    {
                        success: false,
                        error: "Email and password are required",
                    },
                    400
                );
            }

            console.log("🔐 AuthController: Attempting login for:", email);
            const user = await this.authService.login({ email, password });

            if (!user) {
                console.log(
                    "❌ AuthController: Invalid credentials for:",
                    email
                );
                return c.json(
                    {
                        success: false,
                        error: "Invalid credentials",
                    },
                    401
                );
            }

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            console.log(
                "✅ AuthController: Login successful for user:",
                user.id,
                "Role:",
                user.role
            );
            return c.json({
                success: true,
                data: userWithoutPassword,
            });
        } catch (error) {
            console.error("❌ AuthController: Login error:", error);
            const errorMessage =
                error instanceof Error ? error.message : "Login failed";
            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                500
            );
        }
    }

    // GET /api/auth/me
    public async me(c: Context) {
        try {
            const userId = c.req.header("X-User-ID"); // O como manejes la autenticación

            if (!userId) {
                return c.json(
                    {
                        success: false,
                        error: "Not authenticated",
                    },
                    401
                );
            }

            const user = await this.authService.getUserById(userId);

            if (!user) {
                return c.json(
                    {
                        success: false,
                        error: "User not found",
                    },
                    404
                );
            }

            return c.json({
                success: true,
                data: user,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Failed to get user";
            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                500
            );
        }
    }

    // ===== NUEVOS ENDPOINTS PARA GESTIÓN DE PERFILES =====

    // PUT /api/auth/profile
    public async updateProfile(c: Context) {
        try {
            console.log("📝 AuthController: Update profile attempt");

            const userId = c.req.header("X-User-ID");
            if (!userId) {
                return c.json(
                    {
                        success: false,
                        error: "Authentication required",
                    },
                    401
                );
            }

            const { name, email } = await c.req.json();

            // Validaciones básicas
            if (name && name.trim().length < 2) {
                return c.json(
                    {
                        success: false,
                        error: "Name must be at least 2 characters long",
                    },
                    400
                );
            }

            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                return c.json(
                    {
                        success: false,
                        error: "Invalid email format",
                    },
                    400
                );
            }

            const updatedUser = await this.authService.updateProfile(userId, {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.trim().toLowerCase() }),
            });

            if (!updatedUser) {
                return c.json(
                    {
                        success: false,
                        error: "Failed to update profile",
                    },
                    500
                );
            }

            // No devolver la password
            const { password: _, ...userWithoutPassword } = updatedUser;

            console.log("✅ AuthController: Profile updated successfully");
            return c.json({
                success: true,
                data: userWithoutPassword,
                message: "Profile updated successfully",
            });
        } catch (error) {
            console.error("❌ AuthController: Update profile error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to update profile";
            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                error instanceof Error &&
                    error.message.includes("Email already in use")
                    ? 409
                    : 500
            );
        }
    }

    // PUT /api/auth/change-password
    public async changePassword(c: Context) {
        try {
            console.log("🔐 AuthController: Change password attempt");

            const userId = c.req.header("X-User-ID");
            if (!userId) {
                return c.json(
                    {
                        success: false,
                        error: "Authentication required",
                    },
                    401
                );
            }

            const { currentPassword, newPassword } = await c.req.json();

            // Validaciones
            if (!currentPassword || !newPassword) {
                return c.json(
                    {
                        success: false,
                        error: "Current password and new password are required",
                    },
                    400
                );
            }

            if (newPassword.length < 6) {
                return c.json(
                    {
                        success: false,
                        error: "New password must be at least 6 characters long",
                    },
                    400
                );
            }

            if (currentPassword === newPassword) {
                return c.json(
                    {
                        success: false,
                        error: "New password must be different from current password",
                    },
                    400
                );
            }

            // Verificar que es una cuenta local (no OAuth)
            const isLocal = await this.authService.isLocalAccount(userId);
            if (!isLocal) {
                return c.json(
                    {
                        success: false,
                        error: "Password change is not available for OAuth accounts",
                    },
                    400
                );
            }

            await this.authService.changePassword(userId, {
                currentPassword,
                newPassword,
            });

            console.log("✅ AuthController: Password changed successfully");
            return c.json({
                success: true,
                message: "Password changed successfully",
            });
        } catch (error) {
            console.error("❌ AuthController: Change password error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to change password";
            const statusCode =
                error instanceof Error &&
                error.message.includes("Current password is incorrect")
                    ? 400
                    : 500;

            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                statusCode
            );
        }
    }

    // DELETE /api/auth/account
    public async deleteAccount(c: Context) {
        try {
            console.log("🗑️ AuthController: Delete account attempt");

            const userId = c.req.header("X-User-ID");
            if (!userId) {
                return c.json(
                    {
                        success: false,
                        error: "Authentication required",
                    },
                    401
                );
            }

            const { password } = await c.req.json();

            if (!password) {
                return c.json(
                    {
                        success: false,
                        error: "Password is required to delete account",
                    },
                    400
                );
            }

            await this.authService.deleteAccount(userId, password);

            console.log("✅ AuthController: Account deleted successfully");
            return c.json({
                success: true,
                message: "Account deleted successfully",
            });
        } catch (error) {
            console.error("❌ AuthController: Delete account error:", error);
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Failed to delete account";
            const statusCode =
                error instanceof Error &&
                error.message.includes("Password is incorrect")
                    ? 400
                    : 500;

            return c.json(
                {
                    success: false,
                    error: errorMessage,
                },
                statusCode
            );
        }
    }

    // GET /api/auth/account-type
    public async getAccountType(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");
            if (!userId) {
                return c.json(
                    {
                        success: false,
                        error: "Authentication required",
                    },
                    401
                );
            }

            const isLocal = await this.authService.isLocalAccount(userId);

            return c.json({
                success: true,
                data: {
                    isLocal,
                    type: isLocal ? "local" : "oauth",
                },
            });
        } catch (error) {
            console.error("❌ AuthController: Get account type error:", error);
            return c.json(
                {
                    success: false,
                    error: "Failed to get account type",
                },
                500
            );
        }
    }
}
