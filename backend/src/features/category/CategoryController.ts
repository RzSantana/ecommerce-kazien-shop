import { Context } from "hono";
import { CategoryService } from "./CategoryService";

export class CategoryController {
    private categoryService = new CategoryService();

    // GET /api/categories
    public async getAllCategories(c: Context) {
        try {
            const categories = await this.categoryService.getAllCategories();
            return c.json({ success: true, data: categories });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/categories/active
    public async getActiveCategories(c: Context) {
        try {
            const categories = await this.categoryService.getActiveCategories();
            return c.json({ success: true, data: categories });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/categories
    public async createCategory(c: Context) {
        try {
            const data = await c.req.json();
            const category = await this.categoryService.createCategory(data);
            return c.json({ success: true, data: category }, 201);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/categories/:id
    public async updateCategory(c: Context) {
        try {
            const id = c.req.param('id');
            const data = await c.req.json();
            const category = await this.categoryService.updateCategory(id, data);
            return c.json({ success: true, data: category });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/categories/:id
    public async deleteCategory(c: Context) {
        try {
            const id = c.req.param('id');
            await this.categoryService.deleteCategory(id);
            return c.json({ success: true, message: 'Category deleted' });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }
}
