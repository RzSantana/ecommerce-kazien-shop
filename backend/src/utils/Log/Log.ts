/**
 * Register events, messages and other data relevants
 * for the execution
 */

import { UUID } from "../types/uuid";
import { LogEntry } from "./LogEntry.interface";
import { LogLevel } from "./LogLevel.enum";
import { LogManager } from "./LogManage.interface";

export class Log {
    private static manager: LogManager;
    private static context: string;

    // Set log manager
    public static setLogManager(manager: LogManager): void {
        this.manager = manager;
    }

    // Log a message
    public static log(entry: LogEntry): void {
        try {
            if (!this.manager) {
                throw new Error("Not set log manager");
            }

            this.manager.log(entry);
        } catch (error) {
            console.error(`Error in log manager: `, error);
        }
    }

    // Log a debug level message
    public static debug(
        message: string,
        metadata?: Record<string, Object>,
        userId?: UUID,
        requestId?: UUID
    ): void {
        this.log({
            timestamp: new Date(),
            level: LogLevel.DEBUG,
            context: this.getContext(),
            message,
            metadata,
            userId,
            requestId,
        });
    }

    // Log a info level message
    public static info(
        message: string,
        metadata?: Record<string, Object>,
        userId?: UUID,
        requestId?: UUID
    ): void {
        this.log({
            timestamp: new Date(),
            level: LogLevel.INFO,
            context: this.getContext(),
            message,
            metadata,
            userId,
            requestId,
        });
    }

    // Log a warning level message
    public static warn(
        message: string,
        metadata?: Record<string, Object>,
        userId?: UUID,
        requestId?: UUID
    ): void {
        this.log({
            timestamp: new Date(),
            level: LogLevel.WARN,
            context: this.getContext(),
            message,
            metadata,
            userId,
            requestId,
        });
    }

    // Log a error level message
    public static err(
        message: string,
        metadata?: Record<string, Object>,
        userId?: UUID,
        requestId?: UUID
    ): void {
        this.log({
            timestamp: new Date(),
            level: LogLevel.ERR,
            context: this.getContext(),
            message,
            metadata,
            userId,
            requestId,
        });
    }

    // Log a critical level message
    public static critical(
        message: string,
        metadata?: Record<string, Object>,
        userId?: UUID,
        requestId?: UUID
    ): void {
        this.log({
            timestamp: new Date(),
            level: LogLevel.CRITICAL,
            context: this.getContext(),
            message,
            metadata,
            userId,
            requestId,
        });
    }

    public static setContext(context: string): void {
        this.context = context;
    }

    public static getContext(): string {
        return this.context;
    }
}
