import { DatabaseManager } from "./DatabaseManager";
import { DropService } from "../features/drop/DropService";
import { ProductService } from "../features/product/ProductSevice";
import { CategoryService } from "../features/category/CategoryService";
import { AuthService } from "../features/auth/AuthService";
import { DropStatus } from "../generated/prisma";

async function seed() {
    console.log('🥋 Seeding Kaizen Martial Arts Shop database...');

    const dbManager = DatabaseManager.getInstance();
    const productService = new ProductService();
    const dropService = new DropService();
    const categoryService = new CategoryService();
    const authService = new AuthService();

    try {
        await dbManager.connect();

        // Limpiar datos existentes
        console.log('🧹 Cleaning existing data...');
        await dbManager.getClient().dropProduct.deleteMany({});
        await dbManager.getClient().drop.deleteMany({});
        await dbManager.getClient().product.deleteMany({});
        await dbManager.getClient().category.deleteMany({});
        await dbManager.getClient().user.deleteMany({});

        // 1. Crear usuarios (admin y usuarios normales)
        console.log('👥 Creating users...');
        const adminUser = await authService.register({
            email: "admin@kaizenshop.com",
            password: "admin123",
            name: "Kaizen Admin"
        });

        await dbManager.getClient().user.update({
            where: { id: adminUser.id },
            data: { role: "admin" }
        });

        const normalUsers = await Promise.all([
            authService.register({
                email: "fighter1@example.com",
                password: "fighter123",
                name: "Jake Thompson"
            }),
            authService.register({
                email: "sensei@example.com",
                password: "sensei123",
                name: "Master Liu Chen"
            }),
            authService.register({
                email: "athlete@example.com",
                password: "athlete123",
                name: "Sarah Rodriguez"
            })
        ]);

        console.log(`✅ Created ${normalUsers.length + 1} users (1 admin, ${normalUsers.length} regular)`);

        // 2. Crear categorías de artes marciales
        console.log('📂 Creating martial arts categories...');
        const categories = await Promise.all([
            categoryService.createCategory({
                name: "Boxing Gloves",
                description: "Professional boxing gloves for training and competition",
                isActive: true
            }),
            categoryService.createCategory({
                name: "MMA Gloves",
                description: "Mixed martial arts gloves for grappling and striking",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Rashguards",
                description: "Compression shirts for BJJ, MMA and grappling",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Fight Shorts",
                description: "Combat shorts for MMA, Muay Thai and training",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Protective Gear",
                description: "Safety equipment including shin guards, headgear and more",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Training Equipment",
                description: "Heavy bags, pads, and training tools",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Brazilian Jiu-Jitsu",
                description: "BJJ gis, belts and specialized equipment",
                isActive: true
            }),
            categoryService.createCategory({
                name: "Accessories",
                description: "Hand wraps, mouth guards and martial arts accessories",
                isActive: true
            })
        ]);

        console.log(`✅ Created ${categories.length} categories`);

        // 3. Crear productos de artes marciales
        console.log('🥊 Creating martial arts products...');

        // Boxing Gloves
        const boxingGloves = await Promise.all([
            productService.createProduct({
                name: "Venum Challenger 3.0 Boxing Gloves",
                price: 59.99,
                cover: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500",
                categoryId: categories[0].id,
                description: "High-quality synthetic leather boxing gloves with excellent wrist support and protection.",
                stock: 25,
                isNew: true,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Everlast Pro Style Training Gloves",
                price: 34.99,
                cover: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500",
                categoryId: categories[0].id,
                description: "Classic training gloves perfect for beginners and intermediate boxers.",
                stock: 40,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Title Boxing Leather Speed Bag",
                price: 89.99,
                cover: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500",
                categoryId: categories[0].id,
                description: "Premium leather boxing gloves designed for speed and precision training.",
                stock: 15,
                isNew: false,
                isTopSale: false,
                isLimited: true,
                currencyType: "€"
            })
        ]);

        // MMA Gloves
        const mmaGloves = await Promise.all([
            productService.createProduct({
                name: "UFC Official MMA Training Gloves",
                price: 45.99,
                cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                categoryId: categories[1].id,
                description: "Official UFC training gloves with open finger design for grappling.",
                stock: 30,
                isNew: true,
                isTopSale: false,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Hayabusa T3 MMA Gloves",
                price: 79.99,
                cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                categoryId: categories[1].id,
                description: "Professional-grade MMA gloves with superior hand protection and grip.",
                stock: 18,
                isNew: false,
                isTopSale: true,
                isLimited: true,
                currencyType: "€"
            })
        ]);

        // Rashguards
        const rashguards = await Promise.all([
            productService.createProduct({
                name: "Tatami Dragon Rashguard Long Sleeve",
                price: 54.99,
                cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500",
                categoryId: categories[2].id,
                description: "Premium long sleeve rashguard with dragon artwork, perfect for BJJ and MMA.",
                stock: 22,
                isNew: true,
                isTopSale: false,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Scramble Shadow Rashguard",
                price: 48.99,
                cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500",
                categoryId: categories[2].id,
                description: "Minimalist black rashguard with shadow design, ideal for training.",
                stock: 35,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "RVCA Sport Phoenix Rashguard",
                price: 62.99,
                cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500",
                categoryId: categories[2].id,
                description: "Rising phoenix design rashguard with moisture-wicking technology.",
                stock: 28,
                isNew: true,
                isTopSale: false,
                isLimited: true,
                currencyType: "€"
            })
        ]);

        // Fight Shorts
        const fightShorts = await Promise.all([
            productService.createProduct({
                name: "Venum Light 3.0 Fight Shorts",
                price: 42.99,
                cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                categoryId: categories[3].id,
                description: "Lightweight MMA shorts with side slits for maximum mobility.",
                stock: 33,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Hayabusa Hex MMA Shorts",
                price: 65.99,
                cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                categoryId: categories[3].id,
                description: "Premium hex-pattern MMA shorts with advanced closure system.",
                stock: 20,
                isNew: true,
                isTopSale: false,
                isLimited: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Bad Boy Legacy MMA Shorts",
                price: 39.99,
                cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                categoryId: categories[3].id,
                description: "Classic design MMA shorts with reinforced stitching.",
                stock: 27,
                isNew: false,
                isTopSale: false,
                currencyType: "€"
            })
        ]);

        // Protective Gear
        const protectiveGear = await Promise.all([
            productService.createProduct({
                name: "Fairtex Shin Guards SP5",
                price: 78.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[4].id,
                description: "Professional Muay Thai shin guards with excellent protection.",
                stock: 24,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Title Boxing Headgear",
                price: 89.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[4].id,
                description: "Full-face protection headgear for sparring and competition.",
                stock: 16,
                isNew: true,
                isTopSale: false,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Shock Doctor Mouth Guard",
                price: 19.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[4].id,
                description: "Custom-fit mouth guard with maximum protection and comfort.",
                stock: 50,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            })
        ]);

        // Training Equipment
        const trainingEquipment = await Promise.all([
            productService.createProduct({
                name: "Century Heavy Bag 100lbs",
                price: 189.99,
                cover: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500",
                categoryId: categories[5].id,
                description: "Professional 100lb heavy bag perfect for power training.",
                stock: 8,
                isNew: true,
                isTopSale: false,
                isLimited: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Title Boxing Focus Mitts",
                price: 45.99,
                cover: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500",
                categoryId: categories[5].id,
                description: "High-quality focus mitts for pad work and combination training.",
                stock: 20,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Speed Rope Pro Training",
                price: 24.99,
                cover: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=500",
                categoryId: categories[5].id,
                description: "Professional speed rope for conditioning and footwork training.",
                stock: 35,
                isNew: false,
                isTopSale: false,
                currencyType: "€"
            })
        ]);

        // BJJ Equipment
        const bjjEquipment = await Promise.all([
            productService.createProduct({
                name: "Tatami Estilo Black Gi",
                price: 129.99,
                cover: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500",
                categoryId: categories[6].id,
                description: "Premium black BJJ gi with embroidered details and perfect fit.",
                stock: 12,
                isNew: true,
                isTopSale: true,
                isLimited: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Scramble Standard Issue Gi",
                price: 89.99,
                cover: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500",
                categoryId: categories[6].id,
                description: "Classic white BJJ gi perfect for training and competition.",
                stock: 18,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "BJJ Belt - Blue",
                price: 29.99,
                cover: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=500",
                categoryId: categories[6].id,
                description: "Official blue belt for Brazilian Jiu-Jitsu ranking system.",
                stock: 15,
                isNew: false,
                isTopSale: false,
                currencyType: "€"
            })
        ]);

        // Accessories
        const accessories = await Promise.all([
            productService.createProduct({
                name: "Mexican Hand Wraps 4.5m",
                price: 12.99,
                cover: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500",
                categoryId: categories[7].id,
                description: "Traditional Mexican-style hand wraps for boxing and MMA training.",
                stock: 60,
                isNew: false,
                isTopSale: true,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Kaizen Gym Towel",
                price: 18.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[7].id,
                description: "Quick-dry microfiber towel with Kaizen logo, perfect for training.",
                stock: 45,
                isNew: true,
                isTopSale: false,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "MMA Gear Bag",
                price: 39.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[7].id,
                description: "Spacious gear bag with ventilation and multiple compartments.",
                stock: 25,
                isNew: false,
                isTopSale: false,
                currencyType: "€"
            }),
            productService.createProduct({
                name: "Water Bottle 1L Black",
                price: 14.99,
                cover: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
                categoryId: categories[7].id,
                description: "Insulated water bottle to stay hydrated during intense training.",
                stock: 40,
                isNew: false,
                isTopSale: false,
                currencyType: "€"
            })
        ]);

        const allProducts = [
            ...boxingGloves,
            ...mmaGloves,
            ...rashguards,
            ...fightShorts,
            ...protectiveGear,
            ...trainingEquipment,
            ...bjjEquipment,
            ...accessories
        ];

        console.log(`✅ Created ${allProducts.length} martial arts products`);

        // 4. Crear drops/collections temáticas
        console.log('🔥 Creating martial arts collections...');
        const drops = await Promise.all([
            dropService.createDrop({
                name: "Dragon Warrior Collection",
                description: "Unleash your inner dragon with our premium collection featuring powerful designs and professional-grade equipment for the dedicated martial artist.",
                status: DropStatus.ACTIVE,
                releaseDate: new Date('2025-06-01'),
                endDate: new Date('2025-08-31'),
                bannerImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200",
                primaryColor: "#dc2626",
                secondaryColor: "#1f2937",
                accentColor: "#f59e0b"
            }),
            dropService.createDrop({
                name: "Shadow Fighter Series",
                description: "Move like a shadow, strike like lightning. Stealth and performance equipment for the modern fighter who dominates in silence.",
                status: DropStatus.ACTIVE,
                releaseDate: new Date('2025-05-15'),
                endDate: new Date('2025-07-31'),
                bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200",
                primaryColor: "#1f2937",
                secondaryColor: "#111827",
                accentColor: "#6b7280"
            }),
            dropService.createDrop({
                name: "Phoenix Rising Gear",
                description: "Rise from the ashes stronger than ever. Revolutionary designs and premium materials for fighters ready to reach new heights.",
                status: DropStatus.COMING_SOON,
                releaseDate: new Date('2025-07-01'),
                endDate: new Date('2025-09-30'),
                bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200",
                primaryColor: "#7c3aed",
                secondaryColor: "#1e40af",
                accentColor: "#f59e0b"
            }),
            dropService.createDrop({
                name: "Legacy Warriors Archive",
                description: "Classic equipment that built champions. Timeless designs from the golden era of martial arts.",
                status: DropStatus.ENDED,
                releaseDate: new Date('2024-10-15'),
                endDate: new Date('2024-12-31'),
                bannerImage: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=1200",
                primaryColor: "#059669",
                secondaryColor: "#065f46",
                accentColor: "#10b981"
            })
        ]);

        console.log(`✅ Created ${drops.length} collections`);

        // 5. Añadir productos a las collections
        console.log('🎯 Adding products to collections...');

        // Dragon Warrior Collection - Productos premium y llamativos
        await Promise.all([
            dropService.addProductToDrop({
                dropId: drops[0].id,
                productId: rashguards[0].id, // Dragon Rashguard
                dropPrice: 49.99,
                isLimited: true
            }),
            dropService.addProductToDrop({
                dropId: drops[0].id,
                productId: boxingGloves[0].id, // Venum Challenger
                dropPrice: 54.99
            }),
            dropService.addProductToDrop({
                dropId: drops[0].id,
                productId: bjjEquipment[0].id, // Tatami Black Gi
                dropPrice: 119.99,
                isLimited: true
            }),
            dropService.addProductToDrop({
                dropId: drops[0].id,
                productId: trainingEquipment[0].id, // Heavy Bag
                dropPrice: 179.99,
                isLimited: true
            })
        ]);

        // Shadow Fighter Series - Productos minimalistas y funcionales
        await Promise.all([
            dropService.addProductToDrop({
                dropId: drops[1].id,
                productId: rashguards[1].id, // Shadow Rashguard
                dropPrice: 44.99
            }),
            dropService.addProductToDrop({
                dropId: drops[1].id,
                productId: mmaGloves[1].id, // Hayabusa MMA
                dropPrice: 74.99,
                isLimited: true
            }),
            dropService.addProductToDrop({
                dropId: drops[1].id,
                productId: fightShorts[2].id, // Bad Boy Shorts
                dropPrice: 36.99
            }),
            dropService.addProductToDrop({
                dropId: drops[1].id,
                productId: accessories[2].id, // MMA Gear Bag
                dropPrice: 35.99
            })
        ]);

        // Legacy Warriors Archive - Solo algunos productos vintage
        await Promise.all([
            dropService.addProductToDrop({
                dropId: drops[3].id,
                productId: bjjEquipment[1].id, // Scramble Gi
                dropPrice: 79.99
            }),
            dropService.addProductToDrop({
                dropId: drops[3].id,
                productId: accessories[0].id, // Hand Wraps
                dropPrice: 10.99
            })
        ]);

        console.log('✅ Added products to collections');

        console.log('🎉 Kaizen Martial Arts Shop seeding completed!');
        console.log(`
📊 DATABASE SUMMARY:
👥 Users: ${normalUsers.length + 1} (1 admin, ${normalUsers.length} fighters)
📂 Categories: ${categories.length} martial arts categories
🥋 Products: ${allProducts.length} premium martial arts products
🔥 Collections: ${drops.length} themed collections
💼 Admin Login: admin@kaizenshop.com / admin123

🥊 Ready to fight! Your martial arts e-commerce is loaded and ready.
        `);

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    } finally {
        await dbManager.disconnect();
    }
}

seed().catch(console.error);
