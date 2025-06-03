export const API_CONFIG = {
    BASE_URL: import.meta.env.PUBLIC_API_URL || "http://localhost:3000",
    ENDPOINTS: {
        PRODUCTS: "/api/products",
        DROPS: "/api/drops",
        HEALTH: "/health",
    },
};
