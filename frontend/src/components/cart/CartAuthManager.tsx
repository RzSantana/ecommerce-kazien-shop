import { useEffect } from "react";
import { cartService } from "src/services/cartService";

interface CartAuthManagerProps {
    userId?: string;
    children: React.ReactNode;
}

export default function CartAuthManager({
    userId,
    children,
}: CartAuthManagerProps) {
    useEffect(() => {
        // Establecer usuario actual en el servicio del carrito
        cartService.setCurrentUser(userId || null);
    }, [userId]);

    return <>{children}</>;
}
