export interface CartItem {
    id: string;
    name: string;
    price: number;
    cover: string;
    currencyType: string;
    quantity: number;
    stock: number;
    categoryId: string;
}

export interface Cart {
    items: CartItem[];
    total: number;
    itemCount: number;
}

export interface AddToCartData {
    productId: string;
    quantity: number;
}
