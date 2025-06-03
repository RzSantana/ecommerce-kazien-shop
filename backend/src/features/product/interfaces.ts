
export interface CreateProductData {
    name: string;
    price: number;
    cover: string;
    category: string;
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
    category?: string;
    description?: string;
    stock?: number;
    isNew?: boolean;
    isTopSale?: boolean;
    isLimited?: boolean;
    currencyType?: string;
}
