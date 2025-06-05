import { DatabaseManager } from "../../database/DatabaseManager";
import { Cart, CartItem } from "../../generated/prisma";

export interface AddToCartData {
    productId: string;
    quantity: number;
}

export interface UpdateCartItemData {
    quantity: number;
}

export class CartService {
    private db = DatabaseManager.getInstance().getClient();

    // Obtener o crear carrito del usuario
    public async getOrCreateCart(userId: string): Promise<Cart> {
        let cart = await this.db.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });

        if (!cart) {
            cart = await this.db.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            });
        }

        return cart;
    }

    // Agregar producto al carrito
    public async addToCart(
        userId: string,
        data: AddToCartData
    ): Promise<CartItem> {
        const cart = await this.getOrCreateCart(userId);

        // Verificar si el producto ya está en el carrito
        const existingItem = await this.db.cartItem.findUnique({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId: data.productId,
                },
            },
        });

        if (existingItem) {
            // Actualizar cantidad
            return await this.db.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + data.quantity },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
        } else {
            // Crear nuevo item
            return await this.db.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: data.productId,
                    quantity: data.quantity,
                },
                include: {
                    product: {
                        include: {
                            category: true,
                        },
                    },
                },
            });
        }
    }

    // Actualizar cantidad de un item
    public async updateCartItem(
        userId: string,
        productId: string,
        data: UpdateCartItemData
    ): Promise<CartItem | null> {
        const cart = await this.getOrCreateCart(userId);

        if (data.quantity <= 0) {
            // Eliminar item si cantidad es 0 o menor
            await this.db.cartItem.delete({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId,
                    },
                },
            });
            return null;
        }

        return await this.db.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
            data: { quantity: data.quantity },
            include: {
                product: {
                    include: {
                        category: true,
                    },
                },
            },
        });
    }

    // Eliminar item del carrito
    public async removeFromCart(
        userId: string,
        productId: string
    ): Promise<void> {
        const cart = await this.getOrCreateCart(userId);

        await this.db.cartItem.delete({
            where: {
                cartId_productId: {
                    cartId: cart.id,
                    productId,
                },
            },
        });
    }

    // Limpiar carrito
    public async clearCart(userId: string): Promise<void> {
        const cart = await this.getOrCreateCart(userId);

        await this.db.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
    }

    // Obtener carrito con productos
    public async getCartWithItems(userId: string): Promise<Cart> {
        return await this.getOrCreateCart(userId);
    }
}
