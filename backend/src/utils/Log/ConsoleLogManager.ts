/**
 * Manages the print log for console output
 */

import chalk from "chalk";
import { LogEntry } from "./LogEntry.interface";
import { LogLevel } from "./LogLevel.enum";
import { LogManager } from "./LogManage.interface";

export class ConsoleLogManager implements LogManager {
    private color = {
        [LogLevel.DEBUG]: chalk.cyan,
        [LogLevel.INFO]: chalk.green,
        [LogLevel.WARN]: chalk.yellow,
        [LogLevel.ERR]: chalk.red,
        [LogLevel.CRITICAL]: chalk.magenta,
    };

    private reset = chalk.reset;

    public log(entry: LogEntry): void {
        const color = this.color[entry.level];
        const levelName = LogLevel[entry.level];
        const timestamp = entry.timestamp.toISOString();

        let logMessage = color(`[${timestamp}] ${levelName}`) + this.reset() + ' ';

        if (entry.context) {
            logMessage += `[${entry.context}]`;
        }

        if (entry.requestId) {
            logMessage += `[ReqID: ${entry.requestId}]`;
        }

        if (entry.userId) {
            logMessage += `[User: ${entry.userId}]`;
        }

        logMessage += `: ${entry.message}`;

        if (entry.metedata && Object.keys(entry.metedata).length > 0) {
            logMessage += `\n Metadata: ${JSON.stringify(
                entry.message,
                null,
                2
            )}`;
        }

        console.log(logMessage);
    }
}
