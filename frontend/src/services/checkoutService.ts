import type { Order, CheckoutData } from "src/types/checkout";
import { cartService } from "./cartService";

class CheckoutService {
    private readonly ORDERS_KEY = "kaizen_orders";

    // Procesar checkout
    async processCheckout(
        checkoutData: CheckoutData,
        userId?: string
    ): Promise<Order> {
        try {
            // Simular delay de procesamiento
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const cart = await cartService.getCart();

            if (cart.items.length === 0) {
                throw new Error("El carrito está vacío");
            }

            // Calcular totales
            const subtotal = cart.total;
            const shipping = subtotal >= 50 ? 0 : 4.99;
            const total = subtotal + shipping;

            // Crear orden
            const order: Order = {
                id: this.generateOrderId(),
                userId: userId || null, // Agregar userId
                items: cart.items,
                shippingInfo: checkoutData.shippingInfo,
                paymentInfo: {
                    cardNumber:
                        "**** **** **** " +
                        checkoutData.paymentInfo.cardNumber.slice(-4),
                    cardName: checkoutData.paymentInfo.cardName,
                },
                subtotal,
                shipping,
                total,
                status: "confirmed",
                createdAt: new Date().toISOString(),
            };

            // Guardar orden
            this.saveOrder(order);

            // Limpiar carrito después del checkout exitoso
            cartService.clearCart();

            return order;
        } catch (error) {
            console.error("Error processing checkout:", error);
            throw error;
        }
    }

    // Generar ID de orden
    private generateOrderId(): string {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `KAI-${timestamp.toUpperCase()}-${random.toUpperCase()}`;
    }

    // Guardar orden en localStorage
    private saveOrder(order: Order): void {
        try {
            const orders = this.getAllOrdersFromStorage();
            orders.unshift(order); // Agregar al inicio
            localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
        } catch (error) {
            console.error("Error saving order:", error);
        }
    }

    // Obtener todas las órdenes del localStorage (solo para uso interno)
    private getAllOrdersFromStorage(): Order[] {
        try {
            const stored = localStorage.getItem(this.ORDERS_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Error loading orders:", error);
            return [];
        }
    }

    // Obtener órdenes del usuario actual
    getOrdersForUser(userId?: string): Order[] {
        try {
            const allOrders = this.getAllOrdersFromStorage();

            if (!userId) {
                // Si no hay usuario, devolver solo pedidos sin userId (pedidos anónimos)
                return allOrders.filter((order) => !order.userId);
            }

            // Si hay usuario, devolver solo sus pedidos
            return allOrders.filter((order) => order.userId === userId);
        } catch (error) {
            console.error("Error loading user orders:", error);
            return [];
        }
    }

    // Obtener orden por ID (solo si pertenece al usuario)
    getOrderById(orderId: string, userId?: string): Order | null {
        const userOrders = this.getOrdersForUser(userId);
        return userOrders.find((order) => order.id === orderId) || null;
    }

    // Migrar pedidos anónimos a usuario cuando se loguee
    migrateAnonymousOrders(userId: string): void {
        try {
            const allOrders = this.getAllOrdersFromStorage();
            let hasChanges = false;

            // Buscar pedidos sin userId (anónimos) y asignarlos al usuario actual
            const updatedOrders = allOrders.map((order) => {
                if (!order.userId) {
                    hasChanges = true;
                    return { ...order, userId };
                }
                return order;
            });

            if (hasChanges) {
                localStorage.setItem(
                    this.ORDERS_KEY,
                    JSON.stringify(updatedOrders)
                );
                console.log("Anonymous orders migrated to user:", userId);
            }
        } catch (error) {
            console.error("Error migrating anonymous orders:", error);
        }
    }

    // Validar datos de envío
    validateShippingInfo(shipping: any): string[] {
        const errors: string[] = [];

        if (!shipping.fullName?.trim())
            errors.push("Nombre completo es requerido");
        if (!shipping.email?.trim()) errors.push("Email es requerido");
        if (!shipping.phone?.trim()) errors.push("Teléfono es requerido");
        if (!shipping.address?.trim()) errors.push("Dirección es requerida");
        if (!shipping.city?.trim()) errors.push("Ciudad es requerida");
        if (!shipping.postalCode?.trim())
            errors.push("Código postal es requerido");
        if (!shipping.country?.trim()) errors.push("País es requerido");

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (shipping.email && !emailRegex.test(shipping.email)) {
            errors.push("Email no válido");
        }

        return errors;
    }

    // Validar datos de pago
    validatePaymentInfo(payment: any): string[] {
        const errors: string[] = [];

        if (!payment.cardNumber?.trim())
            errors.push("Número de tarjeta es requerido");
        if (!payment.expiryDate?.trim())
            errors.push("Fecha de vencimiento es requerida");
        if (!payment.cvv?.trim()) errors.push("CVV es requerido");
        if (!payment.cardName?.trim())
            errors.push("Nombre en la tarjeta es requerido");

        // Validar formato de tarjeta (básico)
        if (payment.cardNumber) {
            const cardNumber = payment.cardNumber.replace(/\s/g, "");
            if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
                errors.push("Número de tarjeta debe tener 16 dígitos");
            }
        }

        // Validar CVV
        if (
            payment.cvv &&
            (payment.cvv.length < 3 ||
                payment.cvv.length > 4 ||
                !/^\d+$/.test(payment.cvv))
        ) {
            errors.push("CVV debe tener 3 o 4 dígitos");
        }

        return errors;
    }
}

export const checkoutService = new CheckoutService();
