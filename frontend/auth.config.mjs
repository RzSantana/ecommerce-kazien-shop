import Google from "@auth/core/providers/google";
import { defineConfig } from "auth-astro";

export default defineConfig({
    providers: [
        Google({
            clientId: import.meta.env.GOOGLE_CLIENT_ID,
            clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
        })
    ],
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
    }
})
