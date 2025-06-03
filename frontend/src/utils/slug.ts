/**
 * Convierte el nombre de un producto a un slug amigable para URLs
 * "iPhone 15 Pro Max" -> "iphone-15-pro-max"
 */
export function nameToSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Eliminar caracteres especiales
        .replace(/\s+/g, '-')         // Espacios a guiones
        .replace(/-+/g, '-')          // Múltiples guiones a uno solo
        .replace(/^-+|-+$/g, '')      // Eliminar guiones al inicio/final
        .trim();
}

/**
 * Busca un producto por su slug en una lista de productos
 */
export function findProductBySlug(products: any[], slug: string) {
    return products.find(product => nameToSlug(product.name) === slug) || null;
}
