import { Context } from "hono";
import { CategoryService } from "./CategoryService";

export class CategoryController {
    private categoryService = new CategoryService();

    // GET /api/categories
    public async getAllCategories(c: Context) {
        try {
            console.log("✅ CategoryController: Getting all categories");
            const categories = await this.categoryService.getAllCategories();
            console.log(
                `✅ CategoryController: Retrieved ${categories.length} categories`
            );
            return c.json({ success: true, data: categories });
        } catch (error) {
            console.error(
                "❌ CategoryController: Error getting all categories:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/categories/active
    public async getActiveCategories(c: Context) {
        try {
            console.log("✅ CategoryController: Getting active categories");
            const categories = await this.categoryService.getActiveCategories();
            console.log(
                `✅ CategoryController: Retrieved ${categories.length} active categories`
            );
            return c.json({ success: true, data: categories });
        } catch (error) {
            console.error(
                "❌ CategoryController: Error getting active categories:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/categories (PROTECTED - Admin only)
    public async createCategory(c: Context) {
        try {
            const data = await c.req.json();

            // Validaciones básicas
            if (!data.name || !data.name.trim()) {
                return c.json(
                    {
                        success: false,
                        error: "Category name is required",
                    },
                    400
                );
            }

            if (data.name.trim().length < 2) {
                return c.json(
                    {
                        success: false,
                        error: "Category name must be at least 2 characters long",
                    },
                    400
                );
            }

            console.log(
                "✅ CategoryController: Creating category with data:",
                data
            );
            const category = await this.categoryService.createCategory(data);
            console.log(
                "✅ CategoryController: Category created successfully:",
                category.id
            );
            return c.json({ success: true, data: category }, 201);
        } catch (error) {
            console.error(
                "❌ CategoryController: Error creating category:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/categories/:id (PROTECTED - Admin only)
    public async updateCategory(c: Context) {
        try {
            const id = c.req.param("id");
            const data = await c.req.json();

            // Validaciones si se proporcionan
            if (data.name !== undefined && (!data.name || !data.name.trim())) {
                return c.json(
                    {
                        success: false,
                        error: "Category name cannot be empty",
                    },
                    400
                );
            }

            if (data.name && data.name.trim().length < 2) {
                return c.json(
                    {
                        success: false,
                        error: "Category name must be at least 2 characters long",
                    },
                    400
                );
            }

            console.log(
                "✅ CategoryController: Updating category",
                id,
                "with data:",
                data
            );
            const category = await this.categoryService.updateCategory(
                id,
                data
            );
            console.log(
                "✅ CategoryController: Category updated successfully:",
                category.id
            );
            return c.json({ success: true, data: category });
        } catch (error) {
            console.error(
                "❌ CategoryController: Error updating category:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            // Retornar 404 si la categoría no existe
            if (errorMessage.includes("not found")) {
                return c.json({ success: false, error: errorMessage }, 404);
            }

            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/categories/:id (PROTECTED - Admin only)
    public async deleteCategory(c: Context) {
        try {
            const id = c.req.param("id");
            console.log("✅ CategoryController: Deleting category:", id);

            await this.categoryService.deleteCategory(id);
            console.log(
                "✅ CategoryController: Category deleted successfully:",
                id
            );
            return c.json({
                success: true,
                message: "Category deleted successfully",
            });
        } catch (error) {
            console.error(
                "❌ CategoryController: Error deleting category:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";

            // Retornar 404 si la categoría no existe
            if (errorMessage.includes("not found")) {
                return c.json({ success: false, error: errorMessage }, 404);
            }

            // Retornar 400 si tiene productos asociados
            if (errorMessage.includes("associated products")) {
                return c.json({ success: false, error: errorMessage }, 400);
            }

            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/categories/:id
    public async getCategoryById(c: Context) {
        try {
            const id = c.req.param("id");
            console.log("✅ CategoryController: Getting category by ID:", id);

            const category = await this.categoryService.getCategoryById(id);

            if (!category) {
                return c.json(
                    { success: false, error: "Category not found" },
                    404
                );
            }

            console.log("✅ CategoryController: Category found:", category.id);
            return c.json({ success: true, data: category });
        } catch (error) {
            console.error(
                "❌ CategoryController: Error getting category by ID:",
                error
            );
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }
}
