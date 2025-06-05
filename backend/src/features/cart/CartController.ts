import { Context } from "hono";
import { CartService } from "./CartService";

export class CartController {
    private cartService = new CartService();

    // GET /api/cart
    public async getCart(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");

            if (!userId) {
                return c.json({ success: false, error: "Authentication required" }, 401);
            }

            const cart = await this.cartService.getCartWithItems(userId);

            // Calcular totales
            const total = cart.items.reduce((sum, item) =>
                sum + (item.product.price * item.quantity), 0
            );
            const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

            return c.json({
                success: true,
                data: {
                    ...cart,
                    total: Number(total),
                    itemCount
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/cart/items
    public async addToCart(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");

            if (!userId) {
                return c.json({ success: false, error: "Authentication required" }, 401);
            }

            const data = await c.req.json();

            if (!data.productId || !data.quantity || data.quantity <= 0) {
                return c.json({
                    success: false,
                    error: "Product ID and valid quantity are required"
                }, 400);
            }

            const cartItem = await this.cartService.addToCart(userId, {
                productId: data.productId,
                quantity: data.quantity
            });

            return c.json({ success: true, data: cartItem }, 201);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/cart/items/:productId
    public async updateCartItem(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");
            const productId = c.req.param("productId");

            if (!userId) {
                return c.json({ success: false, error: "Authentication required" }, 401);
            }

            const data = await c.req.json();

            if (data.quantity < 0) {
                return c.json({
                    success: false,
                    error: "Quantity cannot be negative"
                }, 400);
            }

            const cartItem = await this.cartService.updateCartItem(userId, productId, {
                quantity: data.quantity
            });

            return c.json({ success: true, data: cartItem });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/cart/items/:productId
    public async removeFromCart(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");
            const productId = c.req.param("productId");

            if (!userId) {
                return c.json({ success: false, error: "Authentication required" }, 401);
            }

            await this.cartService.removeFromCart(userId, productId);

            return c.json({ success: true, message: "Item removed from cart" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/cart
    public async clearCart(c: Context) {
        try {
            const userId = c.req.header("X-User-ID");

            if (!userId) {
                return c.json({ success: false, error: "Authentication required" }, 401);
            }

            await this.cartService.clearCart(userId);

            return c.json({ success: true, message: "Cart cleared" });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }
}
