import { DatabaseManager } from "../../database/DatabaseManager";

export class AdminService {
    private db = DatabaseManager.getInstance().getClient();

    // Estadísticas del dashboard
    public async getDashboardStats() {
        const [
            totalUsers,
            totalProducts,
            totalDrops,
            activeDrops,
            lowStockProducts
        ] = await Promise.all([
            this.db.user.count(),
            this.db.product.count(),
            this.db.drop.count(),
            this.db.drop.count({ where: { status: 'ACTIVE' } }),
            this.db.product.count({ where: { stock: { lt: 5 } } })
        ]);

        return {
            users: {
                total: totalUsers,
                label: "Total Users"
            },
            products: {
                total: totalProducts,
                lowStock: lowStockProducts,
                label: "Products"
            },
            drops: {
                total: totalDrops,
                active: activeDrops,
                label: "Collections"
            }
        };
    }

    // Obtener todos los usuarios
    public async getAllUsers() {
        return await this.db.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
                updatedAt: true
                // No incluir password
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    // Actualizar rol de usuario
    public async updateUserRole(userId: string, role: string) {
        return await this.db.user.update({
            where: { id: userId },
            data: { role },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                updatedAt: true
            }
        });
    }

    // Eliminar usuario
    public async deleteUser(userId: string) {
        // Verificar que no se esté eliminando a sí mismo sería ideal
        // pero para simplicidad lo omitimos por ahora
        return await this.db.user.delete({
            where: { id: userId }
        });
    }
}
