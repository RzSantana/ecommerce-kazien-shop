import Button from "@components/ui/Button";
import Slider from "@components/ui/Slider";
import { useState, useEffect } from "react";
import type { Product } from "src/types/product";
import { cartService } from "src/services/cartService";

interface ProductDetailsProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetails({
    product,
    relatedProducts,
}: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);

    // Verificar si el producto está en el carrito
    useEffect(() => {
        const cartItem = cartService.getCartItem(product.id);
        setIsInCart(!!cartItem);
        setCartQuantity(cartItem?.quantity || 0);

        // Suscribirse a cambios del carrito
        const unsubscribe = cartService.subscribe(() => {
            const updatedCartItem = cartService.getCartItem(product.id);
            setIsInCart(!!updatedCartItem);
            setCartQuantity(updatedCartItem?.quantity || 0);
        });

        return unsubscribe;
    }, [product.id]);

    const handleQuantityChange = (increment: boolean) => {
        if (increment && quantity < product.stock) {
            setQuantity(quantity + 1);
        } else if (!increment && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            const success = cartService.addToCart(product, quantity);
            if (success) {
                // Opcional: mostrar notificación de éxito
                console.log(`${product.name} agregado al carrito`);

                // Resetear cantidad a 1 después de agregar
                setQuantity(1);
            } else {
                alert("No hay suficiente stock disponible");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Error al agregar al carrito");
        } finally {
            setAddingToCart(false);
        }
    };

    // Determinar estado del stock
    const getStockStatus = () => {
        if (product.stock === 0)
            return { status: "out", text: "Agotado", color: "text-red-600" };
        if (product.stock <= 5)
            return {
                status: "low",
                text: `Solo ${product.stock} disponibles`,
                color: "text-orange-600",
            };
        return {
            status: "available",
            text: "En stock",
            color: "text-green-600",
        };
    };

    const stockStatus = getStockStatus();

    return (
        <div className="pt-32 px-4 max-w-7xl mx-auto">
            {/* Navegación de vuelta */}
            <div className="mb-8 w-fit">
                <Button text="← Volver a la tienda" type="link" href="/shop" />
            </div>

            {/* Contenido principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Imagen del producto */}
                <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={product.cover}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        loading="eager"
                    />
                </div>

                {/* Información del producto */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        <div className="text-2xl font-bold text-gray-900 mb-4">
                            {product.price}
                            {product.currencyType}
                        </div>

                        {/* Estado del stock */}
                        <span
                            className={`text-sm font-medium ${stockStatus.color}`}
                        >
                            {stockStatus.text}
                        </span>

                        {/* Mostrar si está en el carrito */}
                        {isInCart && (
                            <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    ✓ En el carrito ({cartQuantity})
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Descripción */}
                    {product.description && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">
                                Descripción
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    )}

                    {/* Cantidad */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Cantidad</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    onClick={() => handleQuantityChange(false)}
                                    disabled={quantity <= 1 || addingToCart}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    −
                                </button>
                                <span className="w-16 text-center font-medium">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(true)}
                                    disabled={quantity >= product.stock || addingToCart}
                                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                            <span className="text-sm text-gray-500">
                                Máximo: {product.stock}
                            </span>
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="pt-4 space-y-3">
                        <Button
                            text={
                                addingToCart
                                    ? "Agregando..."
                                    : stockStatus.status === "out"
                                    ? "Producto agotado"
                                    : "Agregar al carrito"
                            }
                            type={
                                stockStatus.status === "out"
                                    ? "destructive"
                                    : "primary"
                            }
                            onClick={handleAddToCart}
                            disabled={stockStatus.status === "out" || addingToCart}
                        />

                        {isInCart && (
                            <Button
                                text="Ver Carrito"
                                type="outline"
                                href="/cart"
                            />
                        )}
                    </div>

                    {/* Información adicional */}
                    <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between">
                            <span>Categoría:</span>
                            <span className="capitalize">
                                {product.category?.name || product.categoryId}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Stock disponible:</span>
                            <span>{product.stock} unidades</span>
                        </div>
                        {cartQuantity > 0 && (
                            <div className="flex justify-between">
                                <span>En tu carrito:</span>
                                <span className="font-medium text-green-600">{cartQuantity} unidades</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Productos relacionados */}
            {relatedProducts.length > 0 && (
                <section className="border-t pt-16">
                    <Slider
                        products={relatedProducts}
                        title="PRODUCTOS RELACIONADOS"
                        autoplay={true}
                    />
                </section>
            )}
        </div>
    );
}
