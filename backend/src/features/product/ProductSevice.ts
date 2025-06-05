import { DatabaseManager } from "../../database/DatabaseManager";
import { Product } from "../../generated/prisma";
import { CreateProductData, UpdateProductData } from "./interfaces";

export class ProductService {
    private db = DatabaseManager.getInstance().getClient();

    public async createProduct(data: CreateProductData): Promise<Product> {
        return await this.db.product.create({
            data: {
                name: data.name,
                price: data.price,
                cover: data.cover,
                categoryId: data.categoryId,
                description: data.description,
                stock: data.stock || 0,
                isNew: data.isNew || false,
                isTopSale: data.isTopSale || false,
                isLimited: data.isLimited || false,
                currencyType: data.currencyType || "€"
            },
            include: {
                category: true // Incluir información de la categoría
            }
        });
    }

    public async getAllProducts(): Promise<Product[]> {
        return await this.db.product.findMany({
            include: {
                category: true // Incluir información de la categoría
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    public async getProductById(id: string): Promise<Product | null> {
        return await this.db.product.findUnique({
            where: { id },
            include: {
                category: true, // Incluir información de la categoría
                dropProducts: {
                    include: {
                        drop: true
                    }
                }
            }
        });
    }

    public async updateProduct(id: string, data: UpdateProductData): Promise<Product> {
        return await this.db.product.update({
            where: { id },
            data,
            include: {
                category: true // Incluir información de la categoría
            }
        });
    }

    public async deleteProduct(id: string): Promise<void> {
        await this.db.product.delete({
            where: { id }
        });
    }

    public async getProductsByCategory(categoryId: string): Promise<Product[]> {
        return await this.db.product.findMany({
            where: { categoryId },
            include: {
                category: true // Incluir información de la categoría
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    public async searchProducts(search: string): Promise<Product[]> {
        return await this.db.product.findMany({
            where: {
                OR: [
                    { name: { contains: search } },
                    { description: { contains: search } }
                ]
            },
            include: {
                category: true // Incluir información de la categoría
            },
            orderBy: { createdAt: 'desc' }
        });
    }
}
