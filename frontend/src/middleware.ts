// frontend/src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";

export const onRequest = defineMiddleware(async (context, next) => {
    // Solo proteger rutas que empiecen con /admin
    if (context.url.pathname.startsWith("/admin")) {
        console.log(
            "🔐 Middleware: Protecting admin route:",
            context.url.pathname
        );

        try {
            const session = await getSession(context.request);

            // Si no hay sesión, redirigir al login
            if (!session?.user) {
                console.log("❌ Middleware: No session, redirecting to login");
                return context.redirect("/auth/login", 302);
            }

            // Verificar que sea admin
            const userWithRole = session.user as any;
            if (userWithRole.role !== "admin") {
                console.log("❌ Middleware: Not admin, redirecting to home");
                return context.redirect("/", 302);
            }

            console.log("✅ Middleware: Admin access granted");
        } catch (error) {
            console.error("❌ Middleware: Error checking session:", error);
            return context.redirect("/", 302);
        }
    }

    // Continuar con la petición normal
    return next();
});
