import { DatabaseManager } from "../../database/DatabaseManager";
import { User } from "../../generated/prisma";

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

interface LoginData {
    email: string;
    password: string;
}

export class AuthService {
    private db = DatabaseManager.getInstance().getClient();

    // Hash simple (en producción usa bcrypt)
    private hashPassword(password: string): string {
        return Buffer.from(password).toString("base64");
    }

    private verifyPassword(password: string, hash: string): boolean {
        return Buffer.from(password).toString("base64") === hash;
    }

    public async register(data: RegisterData): Promise<User> {
        try {
            // Verificar si el usuario ya existe
            const existingUser = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (existingUser) {
                console.error(
                    "❌ AuthService: User already exists:",
                    data.email
                );
                throw new Error("User already exists");
            }

            // Crear nuevo usuario
            const hashedPassword = this.hashPassword(data.password);

            const newUser = await this.db.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    name: data.name,
                    role: "user",
                },
            });

            return newUser;
        } catch (error) {
            console.error("💥 AuthService Registration Error:", error);
            throw error;
        }
    }

    public async login(data: LoginData): Promise<User | null> {
        try {
            const user = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (!user) {
                console.error("❌ AuthService: User not found:", data.email);
                return null;
            }

            if (!this.verifyPassword(data.password, user.password)) {
                console.error("❌ AuthService: Password verification failed");
                return null;
            }

            return user;
        } catch (error) {
            console.error("💥 AuthService Login Error:", error);
            return null;
        }
    }

    public async getUserById(id: string): Promise<Object | null> {
        try {
            const user = await this.db.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    createdAt: true,
                    updatedAt: true,
                    password: false, // No incluir password
                },
            });

            if (user) {
            } else {
            }

            return user;
        } catch (error) {
            console.error("💥 AuthService GetUserById Error:", error);
            return null;
        }
    }
}
