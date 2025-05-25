/**
 * Defines the contract of manager class
 */

import { LogEntry } from "./LogEntry.interface";

export interface LogManager {
    log(entry: LogEntry): void;
}
