import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./ui/Button";
import { faSearch, faShoppingCart, faUser, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { signOut } from "auth-astro/client";
import type { Session } from "@auth/core/types";

interface ActionsHeaderClientProps {
    session: Session | null;
}

export function ActionsHeaderClient({ session }: ActionsHeaderClientProps) {
    const handleSignOut = () => {
        signOut();
    };

    return (
        <>
            <Button
                text=""
                type="link"
                icon={
                    <FontAwesomeIcon
                        icon={faShoppingCart}
                        className="max-w-4 max-h-4"
                    />
                }
            />

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
