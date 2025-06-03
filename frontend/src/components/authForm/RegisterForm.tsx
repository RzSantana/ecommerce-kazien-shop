import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function RegisterForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);

    const handleClickToggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleClickToggleShowRepeatPassword = () => {
        setIsShowRepeatPassword(!isShowRepeatPassword);
    };

    return (
        <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <Input type="text" name="username" placeholder="Name" />
                <Input type="text" name="email" placeholder="Email" />
                <Input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    action={{
                        callback: handleClickToggleShowPassword,
                        default: <FontAwesomeIcon icon={faEyeSlash} />,
                        active: <FontAwesomeIcon icon={faEye} />,
                    }}
                />
                <Input
                    type={isShowRepeatPassword ? "text" : "password"}
                    name="repeat-password"
                    placeholder="Repeat Password"
                    action={{
                        callback: handleClickToggleShowRepeatPassword,
                        default: <FontAwesomeIcon icon={faEyeSlash} />,
                        active: <FontAwesomeIcon icon={faEye} />,
                    }}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Button text="Join now" type="primary" />
                <Button
                    text="Sing in with Google"
                    type="secundary"
                    icon={<FontAwesomeIcon icon={faGoogle} size="lg" />}
                />
            </div>
        </form>
    );
}
