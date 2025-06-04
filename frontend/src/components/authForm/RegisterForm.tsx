import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, type FormEvent } from "react";
import { signIn } from "auth-astro/client";

export default function RegisterForm() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isShowRepeatPassword, setIsShowRepeatPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleClickToggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    };

    const handleClickToggleShowRepeatPassword = () => {
        setIsShowRepeatPassword(!isShowRepeatPassword);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        const formData = new FormData(event.currentTarget);
        const name = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repeatPassword = formData.get("repeat-password") as string;

        // Validaciones básicas
        if (!name || !email || !password || !repeatPassword) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            setIsLoading(false);
            return;
        }

        try {
            // Registro con nuestro backend
            const response = await fetch(`${import.meta.env.PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setSuccess(true);

                // Redirigir al login después del registro exitoso
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1500);
            } else {
                setError(result.error || "Registration failed");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Registration failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleRegister = () => {
        signIn("google");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    Registration successful! Redirecting to login...
                </div>
            )}

            <div className="flex flex-col gap-4">
                <Input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <Input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password (min. 6 characters)"
                    required
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
                    required
                    action={{
                        callback: handleClickToggleShowRepeatPassword,
                        default: <FontAwesomeIcon icon={faEyeSlash} />,
                        active: <FontAwesomeIcon icon={faEye} />,
                    }}
                />
            </div>

            <div className="flex flex-col gap-2">
                {/* Botón submit nativo */}
                <button
                    type="submit"
                    disabled={isLoading || success}
                    className="px-3 py-2 rounded-sm font-semibold h-10 flex flex-row justify-center items-center gap-1 cursor-pointer overflow-visible bg-(--color-primary) hover:bg-[#FF3131]/70 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Creating account..." : "Join now"}
                </button>

                <Button
                    text="Sign up with Google"
                    type="secundary"
                    icon={<FontAwesomeIcon icon={faGoogle} size="lg" />}
                    onClick={handleGoogleRegister}
                    disabled={isLoading || success}
                />
            </div>
        </form>
    );
}
