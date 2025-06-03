import type { CreateProductData, Product } from "src/types/product";
import { apiService } from "./api";
import { API_CONFIG } from "src/config/api";

class ProductService {
  // Obtener todos los productos
  async getAllProducts(): Promise<Product[]> {
    const response = await apiService.get<Product[]>(API_CONFIG.ENDPOINTS.PRODUCTS);
    return response.success ? response.data || [] : [];
  }

  // Obtener producto por ID
  async getProductById(id: string): Promise<Product | null> {
    const response = await apiService.get<Product>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
    return response.success ? response.data || null : null;
  }

  // Buscar productos
  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiService.get<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/search?q=${encodeURIComponent(query)}`);
    return response.success ? response.data || [] : [];
  }

  // Obtener productos por categoría
  async getProductsByCategory(category: string): Promise<Product[]> {
    const response = await apiService.get<Product[]>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/category/${category}`);
    return response.success ? response.data || [] : [];
  }

  // Crear producto (para admin)
  async createProduct(data: CreateProductData): Promise<Product | null> {
    const response = await apiService.post<Product>(API_CONFIG.ENDPOINTS.PRODUCTS, data);
    return response.success ? response.data || null : null;
  }

  // Actualizar producto (para admin)
  async updateProduct(id: string, data: Partial<CreateProductData>): Promise<Product | null> {
    const response = await apiService.put<Product>(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`, data);
    return response.success ? response.data || null : null;
  }

  // Eliminar producto (para admin)
  async deleteProduct(id: string): Promise<boolean> {
    const response = await apiService.delete(`${API_CONFIG.ENDPOINTS.PRODUCTS}/${id}`);
    return response.success;
  }

  // Obtener productos nuevos
  async getNewProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.isNew);
  }

  // Obtener productos más vendidos
  async getTopSaleProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.isTopSale);
  }

  // Obtener productos limitados
  async getLimitedProducts(): Promise<Product[]> {
    const products = await this.getAllProducts();
    return products.filter(product => product.isLimited);
  }
}
export const productService = new ProductService();
