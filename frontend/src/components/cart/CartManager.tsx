import { useState, useEffect } from "react";
import Button from "@components/ui/Button";
import CartItem from "./CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { Cart } from "src/types/cart";
import { cartService } from "src/services/cartService";

export default function CartManager() {
    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0,
        itemCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    // Cargar carrito al montar
    useEffect(() => {
        loadCart();

        // Suscribirse a cambios del carrito
        const unsubscribe = cartService.subscribe((updatedCart) => {
            setCart(updatedCart);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const currentCart = await cartService.getCart();
            setCart(currentCart);
        } catch (error) {
            console.error("Error loading cart:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClearCart = async () => {        if (confirm("Are you sure you want to empty your cart?")) {
            setActionLoading(true);
            try {
                await cartService.clearCart();
                await loadCart();
            } catch (error) {
                console.error("Error clearing cart:", error);
            } finally {
                setActionLoading(false);
            }
        }
    };

    const handleCheckout = () => {
        // Redirigir a la página de checkout
        window.location.href = "/checkout";
    };

    if (cart.items.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="w-12 h-12 text-gray-400"
                    />
                </div>                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                </h3>
                <p className="text-gray-500 mb-6">
                    Add some amazing products to start your purchase!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        text="Continue Shopping"
                        type="primary"
                        href="/shop"
                    />
                    <Button
                        text="View Collections"
                        type="outline"
                        href="/drops"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de productos */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center">                            <h2 className="text-xl font-semibold text-gray-900">
                                Products ({cart.itemCount}{" "}
                                {cart.itemCount === 1
                                    ? "item"
                                    : "items"}
                                )
                            </h2>
                            <Button
                                text="Empty Cart"
                                type="destructive"
                                onClick={handleClearCart}
                                disabled={actionLoading}
                            />
                        </div>
                    </div>

                    <div className="p-6">
                        {cart.items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onUpdate={loadCart}
                            />
                        ))}
                    </div>
                </div>

                {/* Botón continuar comprando */}
                <div className="mt-6">                    <Button
                        text="Continue Shopping"
                        type="outline"
                        href="/shop"
                        icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    />
                </div>
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Order Summary
                    </h3>

                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                                Subtotal ({cart.itemCount}{" "}
                                {cart.itemCount === 1
                                    ? "item"
                                    : "items"}
                                )
                            </span>
                            <span className="font-medium">
                                {cart.total.toFixed(2)}€
                            </span>
                        </div>

                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping</span>
                            <span className="font-medium text-green-600">
                                {cart.total >= 50 ? "FREE" : "€4.99"}
                            </span>
                        </div>

                        {cart.total < 50 && (
                            <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                                Add €{(50 - cart.total).toFixed(2)} more for
                                FREE shipping
                            </div>
                        )}

                        <div className="border-t pt-3">                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>
                                €{(
                                    cart.total +
                                    (cart.total >= 50 ? 0 : 4.99)
                                ).toFixed(2)}
                            </span>
                        </div>
                        </div>
                    </div>                        <Button
                        text="Proceed to Checkout"
                        type="primary"
                        onClick={handleCheckout}
                        disabled={actionLoading}
                    />

                    <div className="mt-4 text-xs text-gray-500 text-center">
                        <p>✓ Secure Payment</p>
                        <p>✓ Easy Returns</p>
                        <p>✓ Fast Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
