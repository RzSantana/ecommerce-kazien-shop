import { Context, Next } from "hono";
import { DatabaseManager } from "../../database/DatabaseManager";

export async function adminMiddleware(c: Context, next: Next) {
    try {
        console.log("🔐 AdminMiddleware: Starting authentication check");

        // Obtener el ID del usuario del header
        const userId = c.req.header("X-User-ID");
        console.log("🔍 AdminMiddleware: User ID from header:", userId);

        if (!userId) {
            console.log("❌ AdminMiddleware: No X-User-ID header found");
            return c.json(
                {
                    success: false,
                    error: "Authentication required - No user ID provided",
                },
                401
            );
        }

        // Verificar que el usuario existe y es admin
        const db = DatabaseManager.getInstance().getClient();
        console.log("🔍 AdminMiddleware: Checking user in database...");

        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, email: true },
        });

        console.log("🔍 AdminMiddleware: User found:", user);

        if (!user) {
            console.log("❌ AdminMiddleware: User not found in database");
            return c.json(
                {
                    success: false,
                    error: "User not found",
                },
                404
            );
        }

        if (user.role !== "admin") {
            console.log(
                "❌ AdminMiddleware: User is not admin. Role:",
                user.role
            );
            return c.json(
                {
                    success: false,
                    error: "Admin access required",
                },
                403
            );
        }

        console.log("✅ AdminMiddleware: User authenticated successfully");

        // Agregar info del admin al contexto
        c.set("admin", user);

        await next();
    } catch (error) {
        console.error(
            "❌ AdminMiddleware: Error during authentication:",
            error
        );
        return c.json(
            {
                success: false,
                error: "Authorization failed",
            },
            500
        );
    }
}
