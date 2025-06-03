import { Context } from "hono";
import { ProductService } from "./ProductSevice";

export class ProductController {
    private productService = new ProductService();

    // GET /api/products
    public async getAllProducts(c: Context) {
        try {
            const products = await this.productService.getAllProducts();
            return c.json({ success: true, data: products });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/products/:id
    public async getProductById(c: Context) {
        try {
            const id = c.req.param("id");
            const product = await this.productService.getProductById(id);

            if (!product) {
                return c.json(
                    { success: false, error: "Product not found" },
                    404
                );
            }

            return c.json({ success: true, data: product });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/products
    public async createProduct(c: Context) {
        try {
            const data = await c.req.json();
            const product = await this.productService.createProduct(data);
            return c.json({ success: true, data: product }, 201);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/products/:id
    public async updateProduct(c: Context) {
        try {
            const id = c.req.param("id");
            const data = await c.req.json();
            const product = await this.productService.updateProduct(id, data);
            return c.json({ success: true, data: product });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/products/:id
    public async deleteProduct(c: Context) {
        try {
            const id = c.req.param("id");
            await this.productService.deleteProduct(id);
            return c.json({ success: true, message: "Product deleted" });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/products/category/:category
    public async getProductsByCategory(c: Context) {
        try {
            const category = c.req.param("category");
            const products = await this.productService.getProductsByCategory(
                category
            );
            return c.json({ success: true, data: products });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/products/search?q=term
    public async searchProducts(c: Context) {
        try {
            const searchTerm = c.req.query("q") || "";
            const products = await this.productService.searchProducts(
                searchTerm
            );
            return c.json({ success: true, data: products });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }
}
