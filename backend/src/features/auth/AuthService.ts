import { DatabaseManager } from "../../database/DatabaseManager";
import { User } from "../../generated/prisma";
import { LoginData, RegisterData } from "./interfaces";

export class AuthService {
    private db = DatabaseManager.getInstance().getClient();

    // Hash simple (en producción usa bcrypt)
    private hashPassword(password: string): string {
        return Buffer.from(password).toString("base64");
    }

    private verifyPassword(password: string, hash: string): boolean {
        const hashedInput = Buffer.from(password).toString("base64");
        return hashedInput === hash;
    }

    public async register(data: RegisterData): Promise<User> {
        try {
            console.log("🔐 AuthService: Registration attempt for:", data.email);

            // Verificar si el usuario ya existe
            const existingUser = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (existingUser) {
                console.error("❌ AuthService: User already exists:", data.email);
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

            console.log("✅ AuthService: User registered successfully:", newUser.id);
            return newUser;
        } catch (error) {
            console.error("💥 AuthService Registration Error:", error);
            throw error;
        }
    }

    public async login(data: LoginData): Promise<User | null> {
        try {
            console.log("🔐 AuthService: Login attempt for:", data.email);

            const user = await this.db.user.findUnique({
                where: { email: data.email },
            });

            if (!user) {
                console.error("❌ AuthService: User not found:", data.email);
                return null;
            }

            console.log("🔍 AuthService: User found, verifying password...");
            console.log("🔍 AuthService: Stored hash:", user.password);
            console.log("🔍 AuthService: Input password:", data.password);

            // Hash the input password and compare
            const inputHash = this.hashPassword(data.password);
            console.log("🔍 AuthService: Input hash:", inputHash);
            console.log("🔍 AuthService: Hashes match:", inputHash === user.password);

            if (!this.verifyPassword(data.password, user.password)) {
                console.error("❌ AuthService: Password verification failed for:", data.email);
                return null;
            }

            console.log("✅ AuthService: Login successful for:", data.email, "Role:", user.role);
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
                console.log("✅ AuthService: User found by ID:", id);
            } else {
                console.log("❌ AuthService: User not found by ID:", id);
            }

            return user;
        } catch (error) {
            console.error("💥 AuthService GetUserById Error:", error);
            return null;
        }
    }

    // Método para verificar credenciales específicas (para testing)
    public async testCredentials(email: string, password: string): Promise<boolean> {
        try {
            console.log("🧪 AuthService: Testing credentials for:", email);
            const user = await this.login({ email, password });
            return user !== null;
        } catch (error) {
            console.error("🧪 AuthService: Test credentials failed:", error);
            return false;
        }
    }

    // Método para listar usuarios (para debugging)
    public async getAllUsers(): Promise<any[]> {
        try {
            const users = await this.db.user.findMany({
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                    password: true, // Para debugging
                }
            });

            console.log("🔍 AuthService: All users in database:");
            users.forEach(user => {
                console.log(`  - ${user.email} (${user.role}) - Hash: ${user.password}`);
            });

            return users;
        } catch (error) {
            console.error("💥 AuthService: Error getting all users:", error);
            return [];
        }
    }
}
