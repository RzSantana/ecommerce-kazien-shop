import { DatabaseManager } from "../../database/DatabaseManager";
import { Category } from "../../generated/prisma";
import { CreateCategoryData, UpdateCategoryData } from "./interfaces";

export class CategoryService {
    private db = DatabaseManager.getInstance().getClient();

    public async createCategory(data: CreateCategoryData): Promise<Category> {
        return await this.db.category.create({
            data: {
                name: data.name,
                description: data.description,
                isActive: data.isActive ?? true
            }
        });
    }

    public async getAllCategories(): Promise<Category[]> {
        return await this.db.category.findMany({
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: { name: 'asc' }
        });
    }

    public async getActiveCategories(): Promise<Category[]> {
        return await this.db.category.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: { products: true }
                }
            },
            orderBy: { name: 'asc' }
        });
    }

    public async getCategoryById(id: string): Promise<Category | null> {
        return await this.db.category.findUnique({
            where: { id },
            include: {
                products: true,
                _count: {
                    select: { products: true }
                }
            }
        });
    }

    public async updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
        return await this.db.category.update({
            where: { id },
            data
        });
    }

    public async deleteCategory(id: string): Promise<void> {
        // Verificar que no tenga productos asociados
        const categoryWithProducts = await this.db.category.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } }
        });

        if (categoryWithProducts && categoryWithProducts._count.products > 0) {
            throw new Error("Cannot delete category with associated products");
        }

        await this.db.category.delete({
            where: { id }
        });
    }
}
