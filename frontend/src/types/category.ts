export interface Category {
    id: string;
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    _count?: {
        products: number;
    };
}

export interface CreateCategoryData {
    name: string;
    description?: string;
    isActive?: boolean;
}
