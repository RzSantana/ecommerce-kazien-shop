import type { Category } from "./category";

export interface Product {
  id: string;
  name: string;
  price: number;
  cover: string;
  currencyType: string;
  categoryId: string;
  category: Category; // Ahora es un objeto Category en lugar de string
  description?: string;
  stock: number;
  isNew: boolean;
  isTopSale: boolean;
  isLimited: boolean;
  createdAt: string;
  updatedAt: string;
}

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
