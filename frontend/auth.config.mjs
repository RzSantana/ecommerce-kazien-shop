import Google from "@auth/core/providers/google";
import Credentials from "@auth/core/providers/credentials";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        Google({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log("🔐 Auth.js: Attempting login with credentials");
                    console.log("🔐 Auth.js: Email:", credentials?.email);

                    if (!credentials?.email || !credentials?.password) {
                        console.log("❌ Auth.js: Missing email or password");
                        return null;
                    }

                    // Llamar a tu API backend
                    const apiUrl = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000';
                    const loginUrl = `${apiUrl}/api/auth/login`;

                    console.log("🔐 Auth.js: Calling backend:", loginUrl);

                    const response = await fetch(loginUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });

                    console.log("🔐 Auth.js: Backend response status:", response.status);

                    if (!response.ok) {
                        console.log("❌ Auth.js: Backend response not ok:", response.statusText);
                        const errorText = await response.text();
                        console.log("❌ Auth.js: Error response body:", errorText);
                        return null;
                    }

                    const result = await response.json();
                    console.log("🔐 Auth.js: Backend response:", result);

                    if (result.success && result.data) {
                        console.log("✅ Auth.js: Login successful for:", result.data.email);
                        // Login exitoso, retornar usuario
                        return {
                            id: result.data.id,
                            email: result.data.email,
                            name: result.data.name,
                            role: result.data.role || "user"
                        };
                    }

                    console.log("❌ Auth.js: Login failed - invalid response");
                    return null;
                } catch (error) {
                    console.error("❌ Auth.js: Exception during login:", error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/",
        error: "/auth/login",
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                console.log("🔐 Auth.js: JWT callback - user:", user);
                token.role = user.role || "user";
                token.id = user.id;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user && token) {
                console.log("🔐 Auth.js: Session callback - token:", token);
                session.user.role = token.role;
                session.user.id = token.id;
            }
            return session;
        },
        redirect({ url, baseUrl }) {
            console.log("🔐 Auth.js: Redirect callback - url:", url, "baseUrl:", baseUrl);
            // Redirigir a home después del login exitoso
            if (url.startsWith(baseUrl)) {
                return url;
            }
            // Si viene de un login exitoso, ir al home
            return baseUrl;
        },
    },
    debug: true, // Habilitar debug en desarrollo
    logger: {
        error(code, metadata) {
            console.error("🔐 Auth.js Error:", code, metadata);
        },
        warn(code) {
            console.warn("🔐 Auth.js Warning:", code);
        },
        debug(code, metadata) {
            console.log("🔐 Auth.js Debug:", code, metadata);
        }
    }
})
