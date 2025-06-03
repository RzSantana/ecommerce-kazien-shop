import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./ui/Button";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export function ActionsHeaderClient() {
    return (
        <>
            <Button
                text=""
                type="link"
                icon={
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="max-w-4 max-h-4"
                    />
                }
            />
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

            <Button text="Login" type="primary" href="/auth/login" />
        </>
    );
};
