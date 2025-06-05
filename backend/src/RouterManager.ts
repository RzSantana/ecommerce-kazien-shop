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
import { DatabaseManager } from "./database/DatabaseManager";
import { adminMiddleware } from "./utils/middleware/adminMiddleware";

export class RouterManager {
    private app: Hono;
    private productController = new ProductController();
    private dropController = new DropController();
    private authController = new AuthController();
    private adminController = new AdminController();
    private categoryController = new CategoryController();
    private dbManager = DatabaseManager.getInstance();

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
    }

    public async shutdown() {
        await this.dbManager.disconnect();
    }
}
