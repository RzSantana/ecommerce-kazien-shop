import type { Cart, CartItem } from "src/types/cart";
import type { Product } from "src/types/product";

class CartService {
    private readonly STORAGE_KEY = "kaizen_cart";
    private listeners: ((cart: Cart) => void)[] = [];

    // Obtener carrito del localStorage
    getCart(): Cart {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                const cart = JSON.parse(stored);
                return {
                    ...cart,
                    total: this.calculateTotal(cart.items),
                    itemCount: this.calculateItemCount(cart.items),
                };
            }
        } catch (error) {
            console.error("Error loading cart:", error);
        }

        return {
            items: [],
            total: 0,
            itemCount: 0,
        };
    }

    // Guardar carrito en localStorage
    private saveCart(cart: Cart): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
            this.notifyListeners(cart);
        } catch (error) {
            console.error("Error saving cart:", error);
        }
    }

    // Agregar producto al carrito
    addToCart(product: Product, quantity: number = 1): boolean {
        try {
            const cart = this.getCart();
            const existingItem = cart.items.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                // Si el producto ya existe, actualizar cantidad
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > product.stock) {
                    console.warn("Not enough stock");
                    return false;
                }
                existingItem.quantity = newQuantity;
            } else {
                // Agregar nuevo producto
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
                    categoryId: product.categoryId,
                };
                cart.items.push(cartItem);
            }

            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveCart(cart);
            return true;
        } catch (error) {
            console.error("Error adding to cart:", error);
            return false;
        }
    }

    // Actualizar cantidad de un item
    updateQuantity(productId: string, quantity: number): boolean {
        try {
            const cart = this.getCart();
            const item = cart.items.find((item) => item.id === productId);

            if (!item) return false;

            if (quantity <= 0) {
                this.removeFromCart(productId);
                return true;
            }

            if (quantity > item.stock) {
                console.warn("Not enough stock");
                return false;
            }

            item.quantity = quantity;
            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveCart(cart);
            return true;
        } catch (error) {
            console.error("Error updating quantity:", error);
            return false;
        }
    }

    // Remover producto del carrito
    removeFromCart(productId: string): boolean {
        try {
            const cart = this.getCart();
            cart.items = cart.items.filter((item) => item.id !== productId);
            cart.total = this.calculateTotal(cart.items);
            cart.itemCount = this.calculateItemCount(cart.items);

            this.saveCart(cart);
            return true;
        } catch (error) {
            console.error("Error removing from cart:", error);
            return false;
        }
    }

    // Limpiar carrito
    clearCart(): void {
        try {
            const emptyCart: Cart = {
                items: [],
                total: 0,
                itemCount: 0,
            };
            this.saveCart(emptyCart);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    }

    // Calcular total
    private calculateTotal(items: CartItem[]): number {
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    // Calcular cantidad total de items
    private calculateItemCount(items: CartItem[]): number {
        return items.reduce((count, item) => count + item.quantity, 0);
    }

    // Suscribirse a cambios del carrito
    subscribe(listener: (cart: Cart) => void): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    // Notificar a los suscriptores
    private notifyListeners(cart: Cart): void {
        this.listeners.forEach((listener) => listener(cart));
    }

    // Obtener información de un item específico
    getCartItem(productId: string): CartItem | null {
        const cart = this.getCart();
        return cart.items.find((item) => item.id === productId) || null;
    }

    // Verificar si un producto está en el carrito
    isInCart(productId: string): boolean {
        return this.getCartItem(productId) !== null;
    }
}

export const cartService = new CartService();
