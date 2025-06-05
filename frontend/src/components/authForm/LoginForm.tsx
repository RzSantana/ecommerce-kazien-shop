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

    const handleCredentialsLogin = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("🔐 Attempting login with:", { email, password: "***" });

        if (!email || !password) {
            setError("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            console.log("🔐 Calling signIn with credentials...");

            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/",
            });

            console.log("🔐 SignIn result:", result);

            if (result?.error) {
                console.error("❌ Login failed:", result.error);
                setError("Invalid email or password");
            } else if (result?.ok) {
                console.log("✅ Login successful, redirecting...");
                // Successful login - redirect
                window.location.href = "/";
                return;
            } else {
                console.error("❌ Unexpected login result:", result);
                setError("Login failed. Please try again.");
            }
        } catch (loginError) {
            console.error("❌ Login exception:", loginError);
            setError("Login failed. Please try again.");
        }

        setIsLoading(false);
    };

    const handleGoogleLogin = () => {
        console.log("🔐 Attempting Google login...");
        signIn("google");
    };

    return (
        <form onSubmit={handleCredentialsLogin} className="flex flex-col gap-8">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <div className="flex">
                        <div className="py-1">
                            <svg
                                className="fill-current h-6 w-6 text-red-500 mr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold">Login Failed</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Credentials hint for testing */}
            {process.env.NODE_ENV === "development" && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded text-sm">
                    <p className="font-bold">Test Credentials:</p>
                    <p>Admin: admin@kaizenshop.com / admin123</p>
                    <p>User: fighter1@example.com / fighter123</p>
                </div>
            )}

            <div className="flex flex-col gap-4">
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    disabled={isLoading}
                />
                <Input
                    type={isShowPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    disabled={isLoading}
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
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Logging in...
                        </>
                    ) : (
                        "Log in"
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="px-3 py-2 rounded-sm font-semibold h-10 flex flex-row justify-center items-center gap-1 cursor-pointer overflow-visible bg-[#F4F4F5] text-black hover:bg-[#F4F4F5]/70 disabled:bg-gray-300"
                >
                    <FontAwesomeIcon
                        icon={faGoogle}
                        size="lg"
                        className="w-5 h-5"
                    />
                    Sign in with Google
                </button>
            </div>
        </form>
    );
}
