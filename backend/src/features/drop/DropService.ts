import { DatabaseManager } from "../../database/DatabaseManager";
import { Drop, DropProduct, DropStatus } from "../../generated/prisma";
import { AddProductToDropData, CreateDropData, UpdateDropData } from "./interfaces";

export class DropService {
    private db = DatabaseManager.getInstance().getClient();

    public async createDrop(data: CreateDropData): Promise<Drop> {
        return await this.db.drop.create({
            data: {
                name: data.name,
                description: data.description,
                status: data.status || DropStatus.ACTIVE,
                releaseDate: new Date(data.releaseDate),
                endDate: data.endDate ? new Date(data.endDate) : null,
                bannerImage: data.bannerImage,
                primaryColor: data.primaryColor,
                secondaryColor: data.secondaryColor,
                accentColor: data.accentColor
            }
        });
    }

    public async getAllDrops(): Promise<Drop[]> {
        return await this.db.drop.findMany({
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }

    public async getDropById(id: string): Promise<Drop | null> {
        return await this.db.drop.findUnique({
            where: { id },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }

    public async updateDrop(id: string, data: UpdateDropData): Promise<Drop> {
        const updateData: any = { ...data };

        if (data.releaseDate) {
            updateData.releaseDate = new Date(data.releaseDate);
        }
        if (data.endDate) {
            updateData.endDate = new Date(data.endDate);
        }

        return await this.db.drop.update({
            where: { id },
            data: updateData
        });
    }

    public async deleteDrop(id: string): Promise<void> {
        await this.db.drop.delete({
            where: { id }
        });
    }

    public async getActiveDrops(): Promise<Drop[]> {
        return await this.db.drop.findMany({
            where: { status: DropStatus.ACTIVE },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { releaseDate: 'desc' }
        });
    }

    public async addProductToDrop(data: AddProductToDropData): Promise<DropProduct> {
        return await this.db.dropProduct.create({
            data: {
                dropId: data.dropId,
                productId: data.productId,
                dropPrice: data.dropPrice,
                isLimited: data.isLimited || false
            }
        });
    }

    public async removeProductFromDrop(dropId: string, productId: string): Promise<void> {
        await this.db.dropProduct.delete({
            where: {
                dropId_productId: {
                    dropId,
                    productId
                }
            }
        });
    }

    public async getDropProducts(dropId: string): Promise<DropProduct[]> {
        return await this.db.dropProduct.findMany({
            where: { dropId },
            include: {
                product: true,
                drop: true
            }
        });
    }
}
