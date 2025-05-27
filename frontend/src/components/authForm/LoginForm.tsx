import Button from "@components/utils/Button";
import Input from "@components/utils/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FormEvent } from "react";
import { signIn } from "auth-astro/client";

export default function LoginForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleClickToggleShow = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    const handleGoogleLogin = () => {
        console.log('hello world');

        signIn("google");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <Input type="text" name="email" placeholder="Email" />
                <Input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    action={{
                        default: <FontAwesomeIcon icon={faEyeSlash} />,
                        active: <FontAwesomeIcon icon={faEye} />,
                        callback: handleClickToggleShow,
                    }}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Button text="Log in" type="primary" onClick={handleSubmit} />
                <Button
                    text="Sing in with Google"
                    type="secundary"
                    icon={<FontAwesomeIcon icon={faGoogle} size="lg" />}
                    onClick={handleGoogleLogin}
                />
            </div>
        </form>
    );
}
