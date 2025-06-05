import { useState, useEffect } from "react";
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faShield,
    faCreditCard,
    faTruck,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import type { Cart } from "src/types/cart";
import type {
    ShippingInfo,
    PaymentInfo,
    CheckoutData,
} from "src/types/checkout";
import { cartService } from "src/services/cartService";
import { checkoutService } from "src/services/checkoutService";

export default function CheckoutForm() {
    const [cart, setCart] = useState<Cart>({
        items: [],
        total: 0,
        itemCount: 0,
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Estados del formulario
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        country: "Spain",
    });

    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardName: "",
    });

    // Cargar carrito al montar
    useEffect(() => {
        const fetchCart = async () => {
            const currentCart = await cartService.getCart();
            setCart(currentCart); // If cart is empty, redirect
            if (currentCart.items.length === 0) {
                window.location.href = "/cart";
            }
        };

        fetchCart();
    }, []);

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const errors = checkoutService.validateShippingInfo(shippingInfo);
        if (errors.length > 0) {
            setError(errors.join(", "));
            return;
        }

        setCurrentStep(2);
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const errors = checkoutService.validatePaymentInfo(paymentInfo);
            if (errors.length > 0) {
                setError(errors.join(", "));
                return;
            }

            const checkoutData: CheckoutData = {
                shippingInfo,
                paymentInfo,
            };

            const order = await checkoutService.processCheckout(checkoutData);

            // Redirigir a página de confirmación
            window.location.href = `/checkout/confirmation/${order.id}`;
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Error procesando el pago";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        if (parts.length) {
            return parts.join(" ");
        } else {
            return v;
        }
    };

    const subtotal = cart.total;
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    if (cart.items.length === 0) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500">Cargando...</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario */}
            <div className="lg:col-span-2">
                {error && (
                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div
                            className={`flex items-center ${
                                currentStep >= 1
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    currentStep >= 1
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300"
                                }`}
                            >
                                1
                            </div>
                            <span className="ml-2 font-medium">Envío</span>
                        </div>
                        <div
                            className={`w-16 h-1 mx-4 ${
                                currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                            }`}
                        ></div>
                        <div
                            className={`flex items-center ${
                                currentStep >= 2
                                    ? "text-blue-600"
                                    : "text-gray-400"
                            }`}
                        >
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                                    currentStep >= 2
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "border-gray-300"
                                }`}
                            >
                                2
                            </div>
                            <span className="ml-2 font-medium">Pago</span>
                        </div>
                    </div>
                </div>

                {/* Step 1: Información de envío */}
                {currentStep === 1 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            <FontAwesomeIcon icon={faTruck} className="mr-2" />
                            Shipping Information
                        </h2>

                        <form
                            onSubmit={handleShippingSubmit}
                            className="space-y-4 [&_input]:bg-transparent [&_input]:w-full [&_input]:min-w-0"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    placeholder="Full name"
                                    value={shippingInfo.fullName}
                                    onChange={(e) =>
                                        setShippingInfo({
                                            ...shippingInfo,
                                            fullName: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="Email"
                                    value={shippingInfo.email}
                                    onChange={(e) =>
                                        setShippingInfo({
                                            ...shippingInfo,
                                            email: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <Input
                                type="tel"
                                placeholder="Teléfono"
                                value={shippingInfo.phone}
                                onChange={(e) =>
                                    setShippingInfo({
                                        ...shippingInfo,
                                        phone: e.target.value,
                                    })
                                }
                                required
                            />{" "}
                            <Input
                                type="text"
                                placeholder="Full address"
                                value={shippingInfo.address}
                                onChange={(e) =>
                                    setShippingInfo({
                                        ...shippingInfo,
                                        address: e.target.value,
                                    })
                                }
                                required
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    type="text"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={(e) =>
                                        setShippingInfo({
                                            ...shippingInfo,
                                            city: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="Postal code"
                                    value={shippingInfo.postalCode}
                                    onChange={(e) =>
                                        setShippingInfo({
                                            ...shippingInfo,
                                            postalCode: e.target.value,
                                        })
                                    }
                                    required
                                />{" "}
                                <select
                                    value={shippingInfo.country}
                                    onChange={(e) =>
                                        setShippingInfo({
                                            ...shippingInfo,
                                            country: e.target.value,
                                        })
                                    }
                                    className="bg-transparent border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="Spain">Spain</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="France">France</option>
                                </select>
                            </div>
                            <div className="pt-4">
                                <Button
                                    text="Continuar al Pago"
                                    type="primary"
                                    onClick={() => {}}
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2: Información de pago */}
                {currentStep === 2 && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                            {" "}
                            <FontAwesomeIcon
                                icon={faCreditCard}
                                className="mr-2"
                            />
                            Payment Information
                        </h2>

                        <form
                            onSubmit={handlePaymentSubmit}
                            className="space-y-4 [&_input]:bg-transparent [&_input]:w-full [&_input]:min-w-0"
                        >
                            <Input
                                type="text"
                                placeholder="Card number"
                                value={paymentInfo.cardNumber}
                                onChange={(e) =>
                                    setPaymentInfo({
                                        ...paymentInfo,
                                        cardNumber: formatCardNumber(
                                            e.target.value
                                        ),
                                    })
                                }
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    type="text"
                                    placeholder="MM/YY"
                                    value={paymentInfo.expiryDate}
                                    onChange={(e) =>
                                        setPaymentInfo({
                                            ...paymentInfo,
                                            expiryDate: e.target.value,
                                        })
                                    }
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="CVV"
                                    value={paymentInfo.cvv}
                                    onChange={(e) =>
                                        setPaymentInfo({
                                            ...paymentInfo,
                                            cvv: e.target.value,
                                        })
                                    }
                                    required
                                />
                            </div>
                            <Input
                                type="text"
                                placeholder="Name on card"
                                value={paymentInfo.cardName}
                                onChange={(e) =>
                                    setPaymentInfo({
                                        ...paymentInfo,
                                        cardName: e.target.value,
                                    })
                                }
                                required
                            />{" "}
                            <div className="bg-blue-50 p-4 rounded-md">
                                <div className="flex items-center text-blue-800">
                                    <FontAwesomeIcon
                                        icon={faShield}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">
                                        100% secure and encrypted payment
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-4 pt-4">
                                <Button
                                    text="Back"
                                    type="outline"
                                    onClick={() => setCurrentStep(1)}
                                    disabled={loading}
                                />
                                <Button
                                    text={
                                        loading
                                            ? "Processing..."
                                            : "Complete Purchase"
                                    }
                                    type="primary"
                                    onClick={() => {}}
                                    disabled={loading}
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                    {" "}
                    <h3 className="text-lg font-semibold mb-4">
                        Order Summary
                    </h3>
                    {/* Products */}
                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                        {cart.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center space-x-3"
                            >
                                <img
                                    src={item.cover}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-grow">
                                    <div className="text-sm font-medium">
                                        {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Quantity: {item.quantity}
                                    </div>
                                </div>
                                <div className="text-sm font-medium">
                                    €{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Totals */}
                    <div className="space-y-2 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal</span>
                            <span>€{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span
                                className={
                                    shipping === 0 ? "text-green-600" : ""
                                }
                            >
                                {shipping === 0
                                    ? "FREE"
                                    : `€${shipping.toFixed(2)}`}
                            </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                            <span>Total</span>
                            <span>€{total.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className="mt-4 text-xs text-gray-500 space-y-1">
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={faLock} className="mr-1" />
                            <span>Secure SSL Payment</span>
                        </div>
                        <div>✓ Free shipping on orders over €50</div>
                        <div>✓ 30-day returns</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
