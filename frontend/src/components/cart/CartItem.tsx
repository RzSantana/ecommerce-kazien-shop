// frontend/src/components/cart/CartItem.tsx
import { useState } from "react";
import Button from "@components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { CartItem } from "src/types/cart";
import { cartService } from "src/services/cartService";
import { nameToSlug } from "src/utils/slug";

interface CartItemProps {
    item: CartItem;
    onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
    const [loading, setLoading] = useState(false);

    const handleQuantityChange = async (newQuantity: number) => {
        setLoading(true);
        try {
            const success = await cartService.updateQuantity(item.id, newQuantity);
            if (success) {
                onUpdate();
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        } finally {
            setLoading(false);
        }
    };    const handleRemove = async () => {
        if (confirm(`Remove ${item.name} from cart?`)) {
            setLoading(true);
            try {
                const success = await cartService.removeFromCart(item.id);
                if (success) {
                    onUpdate();
                }
            } catch (error) {
                console.error("Error removing item:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const subtotal = item.price * item.quantity;
    const productSlug = nameToSlug(item.name);

    return (
        <div className="flex items-center py-6 border-b border-gray-200 last:border-b-0">
            {/* Product image */}
            <div className="flex-shrink-0 w-24 h-24 mr-6">
                <a href={`/product/${productSlug}`}>
                    <img
                        src={item.cover}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md hover:opacity-80 transition-opacity"
                        loading="lazy"
                    />
                </a>
            </div>

            {/* Product information */}
            <div className="flex-grow min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                            <a
                                href={`/product/${productSlug}`}
                                className="hover:text-gray-700 transition-colors"
                            >
                                {item.name}
                            </a>
                        </h3>                        <p className="text-sm text-gray-500 mb-2">
                            Unit price: {item.price}
                            {item.currencyType}
                        </p>
                        <p className="text-sm text-gray-500">
                            Available stock: {item.stock}
                        </p>
                    </div>

                    {/* Controles de cantidad y precio */}
                    <div className="flex flex-col items-end mt-4 sm:mt-0">
                        {/* Precio total */}
                        <div className="text-lg font-bold text-gray-900 mb-4">
                            {subtotal.toFixed(2)}
                            {item.currencyType}
                        </div>

                        {/* Controles de cantidad */}
                        <div className="flex items-center space-x-3 mb-2">
                            <button
                                onClick={() =>
                                    handleQuantityChange(item.quantity - 1)
                                }
                                disabled={loading || item.quantity <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon
                                    icon={faMinus}
                                    className="w-3 h-3"
                                />
                            </button>

                            <span className="w-12 text-center font-medium">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    handleQuantityChange(item.quantity + 1)
                                }
                                disabled={
                                    loading || item.quantity >= item.stock
                                }
                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    className="w-3 h-3"
                                />
                            </button>
                        </div>

                        {/* Botón eliminar */}
                        <button
                            onClick={handleRemove}
                            disabled={loading}
                            className="text-red-600 hover:text-red-800 text-sm flex items-center disabled:opacity-50"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="w-3 h-3 mr-1"
                            />
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
