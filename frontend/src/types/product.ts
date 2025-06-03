export interface Product {
  id: string;
  name: string;
  price: number;
  cover: string;
  currencyType: string;
  category: string;
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
  category: string;
  description?: string;
  stock?: number;
  isNew?: boolean;
  isTopSale?: boolean;
  isLimited?: boolean;
  currencyType?: string;
}
