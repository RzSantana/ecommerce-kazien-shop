/**
 * Middleware for register requests
 */

import { Log } from "./Log";
import { Context, Next } from "hono";
import chalk from "chalk";
import { UUID } from "../types/uuid";

export async function logMiddleware(context: Context, next: Next) {
    const startTime = performance.now();
    const method = context.req.method;
    const path = context.req.path;
    const requestId = crypto.randomUUID();

    // Get userId
    let userId: UUID | undefined;
    try {
        const body = await context.req.parseBody();
        userId = body.userId as UUID;
    } catch (_) {}

    Log.setContext(`${method}:${path}`);

    try {
        await next();

        // Calculate request time
        const duration = performance.now() - startTime;
        const statusCode = context.res.status;

        logResponse(method, path, statusCode, duration, userId, requestId);
    } catch (error) {
        const durationStr = (performance.now() - startTime).toFixed(2);

        if (!userId) {
            Log.err(`${chalk.gray(`(${durationStr}ms)`)}`, {
                requestId,
            });
            return;
        }

        Log.err(`${chalk.gray(`(${durationStr}ms)`)}`, {
            userId,
            requestId,
        });
    }
}

function logResponse(
    method: string,
    path: string,
    statusCode: number,
    duration: number,
    userId?: UUID,
    requestId?: UUID
) {
    const durationStr = duration.toFixed(2);
    const metadata = {
        methadata: {
            requestId,
            userId,
            statusCode,
            duration: durationStr,
        },
    };

    // Server Error
    if (statusCode >= 500) {
        Log.err(
            `${statusCode} ${chalk.gray(
                `(${durationStr}ms)`
            )}`,
            metadata
        );
        return;
    }

    // Client Error
    if (statusCode >= 400) {
        Log.warn(
            `${statusCode} ${chalk.gray(
                `(${durationStr}ms)`
            )}`,
            metadata
        );
        return;
    }

    // Slowly response
    if (duration > 2000) {
        Log.warn(
            `${statusCode} ${chalk.gray(
                `(${durationStr}ms)`
            )}`,
            metadata
        );
        return;
    }

    // Ok all
    Log.info(
        `${statusCode} ${chalk.gray(`(${durationStr}ms)`)}`,
        metadata
    );
}
