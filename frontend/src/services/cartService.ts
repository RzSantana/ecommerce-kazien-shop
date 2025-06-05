import type { Cart, CartItem } from "src/types/cart";
import type { Product } from "src/types/product";
import { apiService } from "./apiService";

class CartService {
    private readonly STORAGE_KEY = "kaizen_cart";
    private readonly API_ENDPOINT = "/api/cart";
    private listeners: ((cart: Cart) => void)[] = [];
    private currentUserId: string | null = null;

    // Establecer usuario actual
    setCurrentUser(userId: string | null) {
        const wasAuthenticated = !!this.currentUserId;
        const isNowAuthenticated = !!userId;

        this.currentUserId = userId;

        // Si cambió el estado de autenticación, migrar carrito si es necesario
        if (!wasAuthenticated && isNowAuthenticated) {
            this.migrateLocalCartToServer();
        }
    }

    // Migrar carrito local al servidor cuando el usuario se autentica
    private async migrateLocalCartToServer() {
        try {
            const localCart = this.getLocalCart();
            if (localCart.items.length > 0 && this.currentUserId) {
                // Agregar cada item del carrito local al servidor
                for (const item of localCart.items) {
                    await this.addToCartAPI(item.id, item.quantity);
                }
                // Limpiar carrito local después de migrar
                this.clearLocalCart();
            }
        } catch (error) {
            console.error("Error migrating local cart:", error);
        }
    }

    // Obtener carrito (API si autenticado, localStorage si no)
    async getCart(): Promise<Cart> {
        if (this.currentUserId) {
            return await this.getCartFromAPI();
        } else {
            return this.getLocalCart();
        }
    }

    // Obtener carrito del servidor
    private async getCartFromAPI(): Promise<Cart> {
        try {
            const response = await apiService.get<any>(this.API_ENDPOINT, {
                requiresAuth: true,
                userId: this.currentUserId!
            });

            if (response.success && response.data) {
                const apiCart = response.data;
                return {
                    items: apiCart.items.map((item: any) => ({
                        id: item.product.id,
                        name: item.product.name,
                        price: Number(item.product.price),
                        cover: item.product.cover,
                        currencyType: item.product.currencyType,
                        quantity: item.quantity,
                        stock: item.product.stock,
                        categoryId: item.product.categoryId
                    })),
                    total: apiCart.total,
                    itemCount: apiCart.itemCount
                };
            }
        } catch (error) {
            console.error("Error loading cart from API:", error);
        }

        return { items: [], total: 0, itemCount: 0 };
    }

    // Obtener carrito local
    private getLocalCart(): Cart {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const cart = JSON.parse(stored);
                return {
                    ...cart,
                    total: this.calculateTotal(cart.items),
                    itemCount: this.calculateItemCount(cart.items)
                };
            }
        } catch (error) {
            console.error("Error loading local cart:", error);
        }

        return { items: [], total: 0, itemCount: 0 };
    }

    // Guardar carrito local
    private saveLocalCart(cart: Cart): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
            this.notifyListeners(cart);
        } catch (error) {
            console.error("Error saving local cart:", error);
        }
    }

    // Limpiar carrito local
    private clearLocalCart(): void {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
        } catch (error) {
            console.error("Error clearing local cart:", error);
        }
    }

    // Agregar producto al carrito
    async addToCart(product: Product, quantity: number = 1): Promise<boolean> {
        try {
            if (this.currentUserId) {
                return await this.addToCartAPI(product.id, quantity);
            } else {
                return this.addToCartLocal(product, quantity);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            return false;
        }
    }

    // Agregar al carrito vía API
    private async addToCartAPI(productId: string, quantity: number): Promise<boolean> {
        try {
            const response = await apiService.post(
                `${this.API_ENDPOINT}/items`,
                { productId, quantity },
                { requiresAuth: true, userId: this.currentUserId! }
            );

            if (response.success) {
                const updatedCart = await this.getCartFromAPI();
                this.notifyListeners(updatedCart);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error adding to cart via API:", error);
            return false;
        }
    }

    // Agregar al carrito local
    private addToCartLocal(product: Product, quantity: number): boolean {
        try {
            const cart = this.getLocalCart();
            const existingItem = cart.items.find(item => item.id === product.id);

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > product.stock) {
                    console.warn("Not enough stock");
                    return false;
                }
                existingItem.quantity = newQuantity;
            } else {
                if (quantity > product.stock) {
                    console.warn("Not enough stock");
                    return false;
                }

                const cartItem: CartItem = {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    cover: product.cover,
                    currencyType: product.currencyType,
                    quantity,
                    stock: product.stock,
                    categoryId: product.categoryId
                };
                cart.items.push(cartItem);
            }

            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveLocalCart(cart);
            return true;
        } catch (error) {
            console.error("Error adding to local cart:", error);
            return false;
        }
    }

    // Actualizar cantidad
    async updateQuantity(productId: string, quantity: number): Promise<boolean> {
        try {
            if (this.currentUserId) {
                return await this.updateQuantityAPI(productId, quantity);
            } else {
                return this.updateQuantityLocal(productId, quantity);
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
            return false;
        }
    }

    // Actualizar cantidad vía API
    private async updateQuantityAPI(productId: string, quantity: number): Promise<boolean> {
        try {
            const response = await apiService.put(
                `${this.API_ENDPOINT}/items/${productId}`,
                { quantity },
                { requiresAuth: true, userId: this.currentUserId! }
            );

            if (response.success) {
                const updatedCart = await this.getCartFromAPI();
                this.notifyListeners(updatedCart);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error updating quantity via API:", error);
            return false;
        }
    }

    // Actualizar cantidad local
    private updateQuantityLocal(productId: string, quantity: number): boolean {
        try {
            const cart = this.getLocalCart();

            if (quantity <= 0) {
                return this.removeFromCartLocal(productId);
            }

            const item = cart.items.find(item => item.id === productId);
            if (!item) return false;

            if (quantity > item.stock) {
                console.warn("Not enough stock");
                return false;
            }

            item.quantity = quantity;
            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveLocalCart(cart);
            return true;
        } catch (error) {
            console.error("Error updating local quantity:", error);
            return false;
        }
    }

    // Remover del carrito
    async removeFromCart(productId: string): Promise<boolean> {
        try {
            if (this.currentUserId) {
                return await this.removeFromCartAPI(productId);
            } else {
                return this.removeFromCartLocal(productId);
            }
        } catch (error) {
            console.error("Error removing from cart:", error);
            return false;
        }
    }

    // Remover vía API
    private async removeFromCartAPI(productId: string): Promise<boolean> {
        try {
            const response = await apiService.delete(
                `${this.API_ENDPOINT}/items/${productId}`,
                { requiresAuth: true, userId: this.currentUserId! }
            );

            if (response.success) {
                const updatedCart = await this.getCartFromAPI();
                this.notifyListeners(updatedCart);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error removing from cart via API:", error);
            return false;
        }
    }

    // Remover local
    private removeFromCartLocal(productId: string): boolean {
        try {
            const cart = this.getLocalCart();
            cart.items = cart.items.filter(item => item.id !== productId);
            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveLocalCart(cart);
            return true;
        } catch (error) {
            console.error("Error removing from local cart:", error);
            return false;
        }
    }

    // Limpiar carrito
    async clearCart(): Promise<void> {
        try {
            if (this.currentUserId) {
                await this.clearCartAPI();
            } else {
                this.clearCartLocal();
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }

    // Limpiar vía API
    private async clearCartAPI(): Promise<void> {
        try {
            await apiService.delete(this.API_ENDPOINT, {
                requiresAuth: true,
                userId: this.currentUserId!
            });

            const emptyCart: Cart = { items: [], total: 0, itemCount: 0 };
            this.notifyListeners(emptyCart);
        } catch (error) {
            console.error("Error clearing cart via API:", error);
        }
    }

    // Limpiar local
    private clearCartLocal(): void {
        const emptyCart: Cart = { items: [], total: 0, itemCount: 0 };
        this.saveLocalCart(emptyCart);
    }

    // Utilidades
    private calculateTotal(items: CartItem[]): number {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    private calculateItemCount(items: CartItem[]): number {
        return items.reduce((count, item) => count + item.quantity, 0);
    }

    subscribe(listener: (cart: Cart) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notifyListeners(cart: Cart): void {
        this.listeners.forEach(listener => listener(cart));
    }

    async getCartItem(productId: string): Promise<CartItem | null> {
        const cart = await this.getCart();
        return cart.items.find(item => item.id === productId) || null;
    }

    async isInCart(productId: string): Promise<boolean> {
        const item = await this.getCartItem(productId);
        return item !== null;
    }
}

export const cartService = new CartService();
