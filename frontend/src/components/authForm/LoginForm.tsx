import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { signIn } from "auth-astro/client";

export default function LoginForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCredentialsLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            } as any);

            if (!response?.ok) {
                setError("Invalid email or password");
            } else {
                window.location.href = "/";
                return;
            }
        } catch {
            setError("Login failed. Please try again.");
        }

        setIsLoading(false);
    };

    // LOGIN CON GOOGLE - SEPARADO
    const handleGoogleLogin = () => {
        signIn("google");
    };

    return (
        <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-8">
            {error && !isLoading && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-4">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <Input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    action={{
                        default: <FontAwesomeIcon icon={faEyeSlash} />,
                        active: <FontAwesomeIcon icon={faEye} />,
                        callback: () => setIsShowPassword(!isShowPassword),
                    }}
                />
            </div>

            <div className="flex flex-col gap-2">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-3 py-2 rounded-sm font-semibold h-10 flex flex-row justify-center items-center gap-1 cursor-pointer overflow-visible bg-(--color-primary) hover:bg-[#FF3131]/70 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-3 py-2 rounded-sm font-semibold h-10 flex flex-row justify-center items-center gap-1 cursor-pointer overflow-visible bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70 disabled:bg-gray-300"
                >
                    <FontAwesomeIcon icon={faGoogle} size="lg" className="w-5 h-5" />
                    Sign in with Google
                </button>
            </div>
        </form>
    );
}
