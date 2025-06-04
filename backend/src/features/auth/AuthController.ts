import { Context } from "hono";
import { AuthService } from "./AuthService";

export class AuthController {
    private authService = new AuthService();

    // POST /api/auth/register
    public async register(c: Context) {
        try {
            const { email, password, name } = await c.req.json();

            if (!email || !password || !name) {
                return c.json({
                    success: false,
                    error: 'Email, password and name are required'
                }, 400);
            }

            const user = await this.authService.register({ email, password, name });

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            return c.json({
                success: true,
                data: userWithoutPassword
            }, 201);
        } catch (error) {
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
            const { email, password } = await c.req.json();

            if (!email || !password) {
                return c.json({
                    success: false,
                    error: 'Email and password are required'
                }, 400);
            }

            const user = await this.authService.login({ email, password });

            if (!user) {
                return c.json({
                    success: false,
                    error: 'Invalid credentials'
                }, 401);
            }

            // No devolver la password
            const { password: _, ...userWithoutPassword } = user;

            return c.json({
                success: true,
                data: userWithoutPassword
            });
        } catch (error) {
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
