import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FormEvent } from "react";
import { signIn } from "auth-astro/client";

export default function LoginForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleClickToggleShow = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            // Hacer login directo con nuestro backend
            const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Login exitoso, redirigir
                window.location.href = "/";
            } else {
                setError(result.error || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        signIn("google");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && (
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
                        callback: handleClickToggleShow,
                    }}
                />
            </div>

            <div className="flex flex-col gap-2">
                {/* Botón submit nativo para evitar conflictos de tipos */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-3 py-2 rounded-sm font-semibold h-10 flex flex-row justify-center items-center gap-1 cursor-pointer overflow-visible bg-(--color-primary) hover:bg-[#FF3131]/70 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Log in"}
                </button>

                <Button
                    text="Sign in with Google"
                    type="secundary"
                    icon={<FontAwesomeIcon icon={faGoogle} size="lg" />}
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                />
            </div>
        </form>
    );
}
