import { Hono } from "hono";
import { RouterManager } from "./utils/RouterManager";
import { Log } from "./utils/Log/Log";
import { ConsoleLogManager } from "./utils/Log/ConsoleLogManager";

const app = new Hono();

Log.setLogManager(new ConsoleLogManager());

const router = new RouterManager(app);
router.run();

//? No se del todo si esto es necsario, si peta descomentar
export default app;
