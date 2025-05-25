/**
 * Manages the routing of the application.
 */

import { Hono } from "hono";
import { logMiddleware } from "./Log/logMiddleware";

export class RouterManager {
    private app: Hono;

    public constructor(app: Hono) {
        this.app = app;
    }

    public run() {
        this.app.use(logMiddleware);


        this.app.get("/hello", (c) => {
            return c.json({ message: "Hello world" });
        });
    }
}
