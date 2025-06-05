import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./ui/Button";
import { faShoppingCart, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "auth-astro/client";
import type { Session } from "@auth/core/types";
import { cartService } from "src/services/cartService";

interface ActionsHeaderClientProps {
    session: Session | null;
}

export function ActionsHeaderClient({ session }: ActionsHeaderClientProps) {
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        loadCartCount();

        // Suscribirse a cambios del carrito
        const unsubscribe = cartService.subscribe((updatedCart) => {
            setCartItemCount(updatedCart.itemCount);
        });

        return unsubscribe;
    }, []);

    const loadCartCount = async () => {
        try {
            const cart = await cartService.getCart();
            setCartItemCount(cart.itemCount);
        } catch (error) {
            console.error("Error loading cart count:", error);
        }
    };

    const handleSignOut = () => {
        signOut();
    };

    return (
        <>
            {/* Botón del carrito con contador */}
            <div className="relative inline-flex items-center">
                <Button
                    text=""
                    type="link"
                    href="/cart"
                    icon={
                        <FontAwesomeIcon
                            icon={faShoppingCart}
                            className="max-w-4 max-h-4"
                        />
                    }
                />
                {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                )}
            </div>

            {session?.user ? (
                // Usuario logueado - mostrar perfil y logout
                <>
                    <Button
                        text="Profile"
                        type="link"
                        href="/profile"
                        icon={
                            <FontAwesomeIcon
                                icon={faUser}
                                className="max-w-4 max-h-4"
                            />
                        }
                    />
                    <Button
                        text="Logout"
                        type="outline"
                        onClick={handleSignOut}
                        icon={
                            <FontAwesomeIcon
                                icon={faSignOut}
                                className="max-w-4 max-h-4"
                            />
                        }
                    />
                </>
            ) : (
                // Usuario no logueado - mostrar login
                <Button text="Login" type="primary" href="/auth/login" />
            )}
        </>
    );
}
