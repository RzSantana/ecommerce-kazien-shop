// backend/src/RouterManager.ts - VERSIÓN COMPLETA CON CARRITO
/**
 * Manages the routing of the application.
 */

import { Hono } from "hono";
import { cors } from "hono/cors";
import { ProductController } from "./features/product/ProductController";
import { DropController } from "./features/drop/DropController";
import { AuthController } from "./features/auth/AuthController";
import { AdminController } from "./features/admin/AdminController";
import { CategoryController } from "./features/category/CategoryController";
import { CartController } from "./features/cart/CartController";
import { DatabaseManager } from "./database/DatabaseManager";
import { adminMiddleware } from "./utils/middleware/adminMiddleware";
import { AuthService } from "./features/auth/AuthService";

export class RouterManager {
    private app: Hono;
    private productController = new ProductController();
    private dropController = new DropController();
    private authController = new AuthController();
    private adminController = new AdminController();
    private categoryController = new CategoryController();
    private cartController = new CartController();
    private dbManager = DatabaseManager.getInstance();
    private authService = new AuthService();

    public constructor(app: Hono) {
        this.app = app;
    }

    public async run() {
        // Conectar a la base de datos
        await this.dbManager.connect();

        // CORS simplificado
        this.app.use(
            "*",
            cors({
                origin: "*",
                credentials: true,
            })
        );

        // Rutas básicas
        this.app.get("/", (ctx) =>
            ctx.json({ message: "Kaizen Shop API", status: "running" })
        );
        this.app.get("/health", (ctx) =>
            ctx.json({ status: "ok", timestamp: new Date() })
        );

        // DEBUG ENDPOINT - Para verificar usuarios y autenticación
        this.app.get("/debug/users", async (ctx) => {
            try {
                const users = await this.authService.getAllUsers();
                return ctx.json({
                    success: true,
                    users: users.map((u) => ({
                        id: u.id,
                        email: u.email,
                        name: u.name,
                        role: u.role,
                        hasPassword: !!u.password,
                        passwordHash: u.password,
                    })),
                });
            } catch (error) {
                return ctx.json({ success: false, error: { error } }, 500);
            }
        });

        // DEBUG ENDPOINT - Para probar credenciales específicas
        this.app.post("/debug/test-login", async (ctx) => {
            try {
                const { email, password } = await ctx.req.json();
                console.log("🧪 Testing login for:", email);

                const result = await this.authService.testCredentials(
                    email,
                    password
                );
                const user = await this.authService.login({ email, password });

                return ctx.json({
                    success: true,
                    credentialsValid: result,
                    user: user
                        ? {
                              id: user.id,
                              email: user.email,
                              name: user.name,
                              role: user.role,
                          }
                        : null,
                });
            } catch (error) {
                return ctx.json({ success: false, error: { error } }, 500);
            }
        });

        // TEST ENDPOINT para verificar JSON
        this.app.post("/test-json", async (ctx) => {
            try {
                const data = await ctx.req.json();
                console.log("✅ Test JSON received:", data);
                return ctx.json({ success: true, received: data });
            } catch (error) {
                console.error("❌ Test JSON failed:", error);
                return ctx.json({ success: false, error: { error } }, 400);
            }
        });

        // Rutas de autenticación (SIN MIDDLEWARE adicional)
        this.app.post("/api/auth/register", (ctx) =>
            this.authController.register(ctx)
        );
        this.app.post("/api/auth/login", (ctx) =>
            this.authController.login(ctx)
        );
        this.app.get("/api/auth/me", (ctx) => this.authController.me(ctx));

        // Rutas de gestión de perfil (REQUIEREN AUTH)
        this.app.put("/api/auth/profile", (ctx) =>
            this.authController.updateProfile(ctx)
        );
        this.app.put("/api/auth/change-password", (ctx) =>
            this.authController.changePassword(ctx)
        );
        this.app.delete("/api/auth/account", (ctx) =>
            this.authController.deleteAccount(ctx)
        );
        this.app.get("/api/auth/account-type", (ctx) =>
            this.authController.getAccountType(ctx)
        );

        // Rutas de carrito (REQUIEREN AUTH)
        this.app.get("/api/cart", (ctx) => this.cartController.getCart(ctx));
        this.app.post("/api/cart/items", (ctx) =>
            this.cartController.addToCart(ctx)
        );
        this.app.put("/api/cart/items/:productId", (ctx) =>
            this.cartController.updateCartItem(ctx)
        );
        this.app.delete("/api/cart/items/:productId", (ctx) =>
            this.cartController.removeFromCart(ctx)
        );
        this.app.delete("/api/cart", (ctx) =>
            this.cartController.clearCart(ctx)
        );

        // Rutas de productos
        this.app.get("/api/products", (ctx) =>
            this.productController.getAllProducts(ctx)
        );
        this.app.get("/api/products/search", (ctx) =>
            this.productController.searchProducts(ctx)
        );
        this.app.get("/api/products/category/:category", (ctx) =>
            this.productController.getProductsByCategory(ctx)
        );
        this.app.get("/api/products/:id", (ctx) =>
            this.productController.getProductById(ctx)
        );
        this.app.post("/api/products", (ctx) =>
            this.productController.createProduct(ctx)
        );
        this.app.put("/api/products/:id", (ctx) =>
            this.productController.updateProduct(ctx)
        );
        this.app.delete("/api/products/:id", (ctx) =>
            this.productController.deleteProduct(ctx)
        );

        // Rutas de drops
        this.app.get("/api/drops", (ctx) =>
            this.dropController.getAllDrops(ctx)
        );
        this.app.get("/api/drops/active", (ctx) =>
            this.dropController.getActiveDrops(ctx)
        );
        this.app.get("/api/drops/:id", (ctx) =>
            this.dropController.getDropById(ctx)
        );
        this.app.post("/api/drops", (ctx) =>
            this.dropController.createDrop(ctx)
        );
        this.app.put("/api/drops/:id", (ctx) =>
            this.dropController.updateDrop(ctx)
        );
        this.app.delete("/api/drops/:id", (ctx) =>
            this.dropController.deleteDrop(ctx)
        );

        // Rutas de drop-products
        this.app.post("/api/drops/:dropId/products", (ctx) =>
            this.dropController.addProductToDrop(ctx)
        );
        this.app.delete("/api/drops/:dropId/products/:productId", (ctx) =>
            this.dropController.removeProductFromDrop(ctx)
        );
        this.app.get("/api/drops/:dropId/products", (ctx) =>
            this.dropController.getDropProducts(ctx)
        );

        // Rutas de administración (PROTEGIDAS)
        this.app.get("/api/admin/dashboard", adminMiddleware, (ctx) =>
            this.adminController.getDashboard(ctx)
        );
        this.app.get("/api/admin/users", adminMiddleware, (ctx) =>
            this.adminController.getAllUsers(ctx)
        );
        this.app.put("/api/admin/users/:id/role", adminMiddleware, (ctx) =>
            this.adminController.updateUserRole(ctx)
        );
        this.app.delete("/api/admin/users/:id", adminMiddleware, (ctx) =>
            this.adminController.deleteUser(ctx)
        );

        // Rutas de categorías
        this.app.get("/api/categories", (ctx) =>
            this.categoryController.getAllCategories(ctx)
        );
        this.app.get("/api/categories/active", (ctx) =>
            this.categoryController.getActiveCategories(ctx)
        );
        this.app.post("/api/categories", adminMiddleware, (ctx) =>
            this.categoryController.createCategory(ctx)
        );
        this.app.put("/api/categories/:id", adminMiddleware, (ctx) =>
            this.categoryController.updateCategory(ctx)
        );
        this.app.delete("/api/categories/:id", adminMiddleware, (ctx) =>
            this.categoryController.deleteCategory(ctx)
        );

        // Manejo de errores
        this.app.notFound((ctx) =>
            ctx.json({ success: false, error: "Not found" }, 404)
        );
        this.app.onError((err, ctx) => {
            console.error("🔥 Server Error:", err);
            return ctx.json(
                { success: false, error: "Internal server error" },
                500
            );
        });

        console.log("✅ RouterManager configured successfully");
        console.log("🔒 Admin routes protected with adminMiddleware");
        console.log("📦 Product routes configured");
        console.log("📂 Category routes configured");
        console.log("🛒 Cart routes configured");
        console.log("🧪 Debug routes enabled:");
        console.log("   GET  /debug/users - List all users");
        console.log("   POST /debug/test-login - Test credentials");
    }

    public async shutdown() {
        await this.dbManager.disconnect();
    }
}
