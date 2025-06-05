import { useState, useEffect } from "react";
import Button from "@components/ui/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faEye } from "@fortawesome/free-solid-svg-icons";
import type { Order } from "src/types/checkout";
import { checkoutService } from "src/services/checkoutService";

export default function OrdersManager() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () => {
        try {
            const userOrders = checkoutService.getOrders();
            setOrders(userOrders);
        } catch (error) {
            console.error("Error loading orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'shipped': return 'bg-blue-100 text-blue-800';
            case 'delivered': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed': return 'Confirmado';
            case 'pending': return 'Pendiente';
            case 'shipped': return 'Enviado';
            case 'delivered': return 'Entregado';
            default: return status;
        }
    };

    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-gray-500">Cargando pedidos...</p>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <FontAwesomeIcon icon={faShoppingBag} className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No tienes pedidos aún
                </h3>
                <p className="text-gray-500 mb-6">
                    Cuando realices tu primera compra, aparecerá aquí.
                </p>
                <Button
                    text="Empezar a Comprar"
                    type="primary"
                    href="/shop"
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Mis Pedidos ({orders.length})
                </h2>
                <p className="text-gray-600">
                    Aquí puedes ver el historial de todos tus pedidos
                </p>
            </div>

            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                    {/* Header del pedido */}
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Pedido {order.id}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Realizado el {formatDate(order.createdAt)}
                                </p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center space-x-3">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {getStatusText(order.status)}
                                </span>
                                <Button
                                    text="Ver Detalles"
                                    type="outline"
                                    href={`/checkout/confirmation/${order.id}`}
                                    icon={<FontAwesomeIcon icon={faEye} />}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contenido del pedido */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Productos */}
                            <div className="lg:col-span-2">
                                <h4 className="font-semibold mb-3">
                                    Productos ({order.items.length})
                                </h4>
                                <div className="space-y-3 max-h-48 overflow-y-auto">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-3">
                                            <img
                                                src={item.cover}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="flex-grow">
                                                <div className="font-medium text-sm">{item.name}</div>
                                                <div className="text-xs text-gray-500">
                                                    Cantidad: {item.quantity} × {item.price}€
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium">
                                                {(item.price * item.quantity).toFixed(2)}€
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resumen */}
                            <div className="lg:col-span-1">
                                <h4 className="font-semibold mb-3">Resumen</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Subtotal:</span>
                                        <span>{order.subtotal.toFixed(2)}€</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Envío:</span>
                                        <span>
                                            {order.shipping === 0 ? 'GRATIS' : `${order.shipping.toFixed(2)}€`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base border-t pt-2">
                                        <span>Total:</span>
                                        <span>{order.total.toFixed(2)}€</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                        Envío a: {order.shippingInfo.city}, {order.shippingInfo.country}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Acciones adicionales */}
            <div className="text-center pt-6">
                <Button
                    text="Continuar Comprando"
                    type="outline"
                    href="/shop"
                />
            </div>
        </div>
    );
}
