/**
 * Defines the contract of a log entry
 */

import { LogLevel } from "./LogLevel.enum";

export interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    context?: string;
    message: string;
    metadata?: Record<string, Object>
    userId?: UUID;
    requestId?: UUID;
}
