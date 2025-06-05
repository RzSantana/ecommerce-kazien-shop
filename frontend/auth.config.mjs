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
                    // Llamar a tu API backend
                    const response = await fetch('http://localhost:3000/api/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password
                        })
                    });

                    const result = await response.json();

                    if (response.ok && result.success && result.data) {
                        // Login exitoso, retornar usuario
                        return {
                            id: result.data.id,
                            email: result.data.email,
                            name: result.data.name,
                            role: result.data.role || "user"
                        };
                    }

                    // Login falló
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
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
                token.role = user.role || "user";
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.role = token.role;
            }
            return session;
        },
        redirect({ url, baseUrl }) {
            // Redirigir a home después del login exitoso
            if (url.startsWith(baseUrl)) {
                return url;
            }
            // Si viene de un login exitoso, ir al home
            return baseUrl;
        },
    }
})
