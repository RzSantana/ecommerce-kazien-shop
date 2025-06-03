import { PrismaClient } from "../generated/prisma";

export class DatabaseManager {
    private static instance: DatabaseManager;
    private prisma: PrismaClient;

    private constructor() {
        this.prisma = new PrismaClient();
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    public getClient(): PrismaClient {
        return this.prisma;
    }

    public async connect(): Promise<void> {
        await this.prisma.$connect();
    }

    public async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
}
