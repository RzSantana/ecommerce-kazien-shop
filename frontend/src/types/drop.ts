import type { Product } from "./product";

export interface Drop {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'COMING_SOON' | 'ENDED';
  releaseDate: string;
  endDate?: string;
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  createdAt: string;
  updatedAt: string;
  products: DropProduct[];
}

export interface DropProduct {
  id: string;
  dropId: string;
  productId: string;
  dropPrice?: number;
  isLimited: boolean;
  createdAt: string;
  updatedAt: string;
  product: Product;
  drop: Drop;
}

export interface CreateDropData {
  name: string;
  description: string;
  status?: 'ACTIVE' | 'COMING_SOON' | 'ENDED';
  releaseDate: string;
  endDate?: string;
  bannerImage: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}
