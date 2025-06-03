import { Hono } from "hono";
import { RouterManager } from "./RouterManager";
import { Log } from "./utils/Log/Log";
import { ConsoleLogManager } from "./utils/Log/ConsoleLogManager";
import { serve } from "bun";

// Initialize logging
Log.setLogManager(new ConsoleLogManager());

const app = new Hono();
const PORT = parseInt(process.env.API_PORT || "3000");

// Initialize router
const router = new RouterManager(app);

async function startServer() {
    try {
        await router.run();

        serve({
            port: PORT,
            fetch: app.fetch,
        });

        Log.info(`🚀 Server running on http://localhost:${PORT}`);
        Log.info(`📚 API endpoints:`);
        Log.info(`   GET    /api/products`);
        Log.info(`   POST   /api/products`);
        Log.info(`   GET    /api/drops`);
        Log.info(`   POST   /api/drops`);
        Log.info(`   GET    /health`);
    } catch (error) {
        Log.err("Failed to start server", { error: { error } });
        process.exit(1);
    }
}

startServer();

export default app;
