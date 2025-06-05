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
                return c.json({
                    success: false,
                    error: 'Email, password and name are required'
                }, 400);
            }

            console.log("🔐 AuthController: Registering user:", email);
            const user = await this.authService.register({ email, password, name });

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            console.log("✅ AuthController: User registered successfully:", user.id);
            return c.json({
                success: true,
                data: userWithoutPassword
            }, 201);
        } catch (error) {
            console.error("❌ AuthController: Registration error:", error);
            const errorMessage = error instanceof Error ? error.message : "Registration failed";
            return c.json({
                success: false,
                error: errorMessage
            }, 400);
        }
    }

    // POST /api/auth/login
    public async login(c: Context) {
        try {
            console.log("🔐 AuthController: Login attempt");
            const { email, password } = await c.req.json();

            console.log("🔐 AuthController: Login data received:", { email, password: "***" });

            if (!email || !password) {
                console.log("❌ AuthController: Missing email or password");
                return c.json({
                    success: false,
                    error: 'Email and password are required'
                }, 400);
            }

            console.log("🔐 AuthController: Attempting login for:", email);
            const user = await this.authService.login({ email, password });

            if (!user) {
                console.log("❌ AuthController: Invalid credentials for:", email);
                return c.json({
                    success: false,
                    error: 'Invalid credentials'
                }, 401);
            }

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            console.log("✅ AuthController: Login successful for user:", user.id, "Role:", user.role);
            return c.json({
                success: true,
                data: userWithoutPassword
            });
        } catch (error) {
            console.error("❌ AuthController: Login error:", error);
            const errorMessage = error instanceof Error ? error.message : "Login failed";
            return c.json({
                success: false,
                error: errorMessage
            }, 500);
        }
    }

    // GET /api/auth/me
    public async me(c: Context) {
        try {
            const userId = c.req.header('X-User-ID'); // O como manejes la autenticación

            if (!userId) {
                return c.json({
                    success: false,
                    error: 'Not authenticated'
                }, 401);
            }

            const user = await this.authService.getUserById(userId);

            if (!user) {
                return c.json({
                    success: false,
                    error: 'User not found'
                }, 404);
            }

            return c.json({
                success: true,
                data: user
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to get user";
            return c.json({
                success: false,
                error: errorMessage
            }, 500);
        }
    }
}
