import { Context, Next } from "hono";
import { DatabaseManager } from "../../database/DatabaseManager";

export async function adminMiddleware(c: Context, next: Next) {
    try {
        // Obtener el ID del usuario del header
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

        // Verificar que el usuario existe y es admin
        const db = DatabaseManager.getInstance().getClient();
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, email: true },
        });

        if (!user) {
            return c.json(
                {
                    success: false,
                    error: "User not found",
                },
                404
            );
        }

        if (user.role !== "admin") {
            return c.json(
                {
                    success: false,
                    error: "Admin access required",
                },
                403
            );
        }

        // Agregar info del admin al contexto
        c.set("admin", user);

        await next();
    } catch (error) {
        console.error("❌ Admin middleware error:", error);
        return c.json(
            {
                success: false,
                error: "Authorization failed",
            },
            500
        );
    }
}
