export interface CreateProductData {
    name: string;
    price: number;
    cover: string;
    categoryId: string; // Cambiar de category a categoryId
    description?: string;
    stock?: number;
    isNew?: boolean;
    isTopSale?: boolean;
    isLimited?: boolean;
    currencyType?: string;
}

export interface UpdateProductData {
    name?: string;
    price?: number;
    cover?: string;
    categoryId?: string; // Cambiar de category a categoryId
    description?: string;
    stock?: number;
    isNew?: boolean;
    isTopSale?: boolean;
    isLimited?: boolean;
    currencyType?: string;
}
