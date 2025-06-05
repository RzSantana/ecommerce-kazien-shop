import type { CartItem } from './cart';

export interface ShippingInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

export interface PaymentInfo {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardName: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    shippingInfo: ShippingInfo;
    paymentInfo: Partial<PaymentInfo>; // Solo guardamos info parcial por seguridad
    subtotal: number;
    shipping: number;
    total: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
    createdAt: string;
}

export interface CheckoutData {
    shippingInfo: ShippingInfo;
    paymentInfo: PaymentInfo;
}
