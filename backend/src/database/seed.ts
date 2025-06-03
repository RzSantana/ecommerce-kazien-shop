import { DatabaseManager } from "./DatabaseManager";
import { DropService } from "../features/drop/DropService";
import { ProductService } from "../features/product/ProductSevice";
import { DropStatus } from "../generated/prisma";

async function seed() {
    console.log('🌱 Seeding database...');

    const dbManager = DatabaseManager.getInstance();
    const productService = new ProductService();
    const dropService = new DropService();

    try {
        await dbManager.connect();

        // Crear productos
        const products = await Promise.all([
            productService.createProduct({
                name: "iPhone 15 Pro",
                price: 999.99,
                cover: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500",
                category: "electronics",
                description: "Latest iPhone with advanced features",
                stock: 50,
                isNew: true,
                isTopSale: true
            }),
            productService.createProduct({
                name: "MacBook Air M3",
                price: 1299.99,
                cover: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
                category: "electronics",
                description: "Powerful laptop for professionals",
                stock: 30,
                isNew: true,
                isTopSale: false
            }),
            productService.createProduct({
                name: "Nike Air Max",
                price: 149.99,
                cover: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
                category: "clothing",
                description: "Comfortable running shoes",
                stock: 100,
                isNew: false,
                isTopSale: true
            })
        ]);

        console.log(`✅ Created ${products.length} products`);

        // Crear drops
        const drops = await Promise.all([
            dropService.createDrop({
                name: "Tech Week 2025",
                description: "Latest technology products",
                status: DropStatus.ACTIVE,
                releaseDate: new Date('2025-06-01'),
                endDate: new Date('2025-06-30'),
                bannerImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200",
                primaryColor: "#007AFF",
                secondaryColor: "#34C759",
                accentColor: "#FF9500"
            }),
            dropService.createDrop({
                name: "Summer Collection",
                description: "Best summer products",
                status: DropStatus.ACTIVE,
                releaseDate: new Date('2025-05-15'),
                bannerImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200",
                primaryColor: "#FF6B6B",
                secondaryColor: "#4ECDC4",
                accentColor: "#45B7D1"
            })
        ]);

        console.log(`✅ Created ${drops.length} drops`);

        // Añadir productos a drops
        await dropService.addProductToDrop({
            dropId: drops[0].id,
            productId: products[0].id,
            dropPrice: 899.99
        });

        await dropService.addProductToDrop({
            dropId: drops[0].id,
            productId: products[1].id,
            dropPrice: 1199.99
        });

        await dropService.addProductToDrop({
            dropId: drops[1].id,
            productId: products[2].id,
            dropPrice: 129.99
        });

        console.log('✅ Added products to drops');
        console.log('🎉 Seeding completed!');

    } catch (error) {
        console.error('❌ Seeding failed:', error);
    } finally {
        await dbManager.disconnect();
    }
}

seed();
