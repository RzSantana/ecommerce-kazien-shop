export interface CreateCategoryData {
    name: string;
    description?: string;
    isActive?: boolean;
}

export interface UpdateCategoryData {
    name?: string;
    description?: string;
    isActive?: boolean;
}
