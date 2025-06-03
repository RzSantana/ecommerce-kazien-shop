import type { IDrop } from '../types/drop';

// Simulación de datos de la base de datos
const mockDropsData: IDrop[] = [
  {
    id: "dragon-collection",
    name: "DRAGON COLLECTION",
    description: "Unleash your inner beast with our premium Dragon Collection. Designed for warriors who demand excellence in every battle.",
    status: "active",
    releaseDate: new Date("2024-01-15"),
    bannerImage: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=400&fit=crop&crop=center",
    themeColors: {
      primary: "#dc2626",
      secondary: "#1f2937",
      accent: "#f59e0b"
    },
    products: [
      {
        id: "dragon-1",
        name: "Dragon Spirit Rashguard",
        price: 59.99,
        cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400",
        category: "T-Shirts",
        isLimited: true,
        stock: 3
      },
      {
        id: "dragon-2",
        name: "Fire Dragon Shorts",
        price: 44.99,
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        category: "Shorts",
        stock: 15
      },
      {
        id: "dragon-3",
        name: "Dragon Scale Long Sleeve",
        price: 64.99,
        cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400",
        category: "T-Shirts",
        stock: 0
      },
      {
        id: "dragon-4",
        name: "Dragon Gloves Pro",
        price: 89.99,
        cover: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400",
        category: "Accessories",
        isLimited: true,
        stock: 7
      }
    ]
  },
  {
    id: "shadow-collection",
    name: "SHADOW COLLECTION",
    description: "Move like a shadow, strike like lightning. The Shadow Collection offers stealth and performance for the modern fighter.",
    status: "active",
    releaseDate: new Date("2024-02-01"),
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop&crop=center",
    themeColors: {
      primary: "#1f2937",
      secondary: "#111827",
      accent: "#6b7280"
    },
    products: [
      {
        id: "shadow-1",
        name: "Shadow Fighter Shorts",
        price: 39.99,
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        category: "Shorts",
        stock: 12
      },
      {
        id: "shadow-2",
        name: "Midnight Rashguard",
        price: 54.99,
        cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400",
        category: "T-Shirts",
        stock: 8
      },
      {
        id: "shadow-3",
        name: "Stealth Gloves",
        price: 75.99,
        cover: "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=400",
        category: "Accessories",
        stock: 25
      },
      {
        id: "shadow-4",
        name: "Night Warrior Tank",
        price: 34.99,
        cover: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400",
        category: "T-Shirts",
        isLimited: true,
        stock: 2
      }
    ]
  },
  {
    id: "phoenix-collection",
    name: "PHOENIX COLLECTION",
    description: "Rise from the ashes stronger than ever. The Phoenix Collection drops next month with revolutionary design and premium materials.",
    status: "coming-soon",
    releaseDate: new Date("2024-04-01"),
    bannerImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=400&fit=crop&crop=center",
    themeColors: {
      primary: "#7c3aed",
      secondary: "#1e40af",
      accent: "#f59e0b"
    },
    products: []
  },
  {
    id: "warrior-collection",
    name: "WARRIOR COLLECTION",
    description: "The classic collection that started it all. Premium gear for dedicated fighters.",
    status: "ended",
    releaseDate: new Date("2023-10-15"),
    endDate: new Date("2023-12-31"),
    bannerImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop&crop=center",
    themeColors: {
      primary: "#059669",
      secondary: "#065f46",
      accent: "#10b981"
    },
    products: [
      {
        id: "warrior-1",
        name: "Classic Warrior Shorts",
        price: 39.99,
        cover: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        category: "Shorts",
        stock: 0
      }
    ]
  }
];

export async function getDropsFromDB(): Promise<IDrop[]> {
  // Simular delay de API/BD
  await new Promise(resolve => setTimeout(resolve, 100));

  // Aquí irá la lógica real de la base de datos
  // return await fetch('/api/drops').then(res => res.json());
  // return await prisma.drop.findMany({ include: { products: true } });

  return mockDropsData;
}

export async function getActiveDrops(): Promise<IDrop[]> {
  const drops = await getDropsFromDB();
  return drops.filter((drop: IDrop) => drop.status === 'active');
}

export async function getComingSoonDrops(): Promise<IDrop[]> {
  const drops = await getDropsFromDB();
  return drops.filter((drop: IDrop) => drop.status === 'coming-soon');
}

export async function getEndedDrops(): Promise<IDrop[]> {
  const drops = await getDropsFromDB();
  return drops.filter((drop: IDrop) => drop.status === 'ended');
}

export async function getDropById(id: string): Promise<IDrop | undefined> {
  const drops = await getDropsFromDB();
  return drops.find((drop: IDrop) => drop.id === id);
}

export async function getFeaturedDrops(): Promise<IDrop[]> {
  const drops = await getDropsFromDB();
  return drops.filter((drop: IDrop) => drop.status !== 'ended');
}
