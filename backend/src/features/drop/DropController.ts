import { Context } from "hono";
import { DropService } from "./DropService";

export class DropController {
    private dropService = new DropService();

    // GET /api/drops
    public async getAllDrops(c: Context) {
        try {
            const drops = await this.dropService.getAllDrops();
            return c.json({ success: true, data: drops });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/drops/:id
    public async getDropById(c: Context) {
        try {
            const id = c.req.param('id');
            const drop = await this.dropService.getDropById(id);

            if (!drop) {
                return c.json({ success: false, error: 'Drop not found' }, 404);
            }

            return c.json({ success: true, data: drop });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/drops
    public async createDrop(c: Context) {
        try {
            const data = await c.req.json();
            const drop = await this.dropService.createDrop(data);
            return c.json({ success: true, data: drop }, 201);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/drops/:id
    public async updateDrop(c: Context) {
        try {
            const id = c.req.param('id');
            const data = await c.req.json();
            const drop = await this.dropService.updateDrop(id, data);
            return c.json({ success: true, data: drop });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/drops/:id
    public async deleteDrop(c: Context) {
        try {
            const id = c.req.param('id');
            await this.dropService.deleteDrop(id);
            return c.json({ success: true, message: 'Drop deleted' });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/drops/active
    public async getActiveDrops(c: Context) {
        try {
            const drops = await this.dropService.getActiveDrops();
            return c.json({ success: true, data: drops });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // POST /api/drops/:dropId/products
    public async addProductToDrop(c: Context) {
        try {
            const dropId = c.req.param('dropId');
            const data = await c.req.json();

            const dropProduct = await this.dropService.addProductToDrop({
                dropId,
                productId: data.productId,
                dropPrice: data.dropPrice,
                isLimited: data.isLimited
            });

            return c.json({ success: true, data: dropProduct }, 201);
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/drops/:dropId/products/:productId
    public async removeProductFromDrop(c: Context) {
        try {
            const dropId = c.req.param('dropId');
            const productId = c.req.param('productId');

            await this.dropService.removeProductFromDrop(dropId, productId);
            return c.json({ success: true, message: 'Product removed from drop' });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "An unknown error occurred";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/drops/:dropId/products
    public async getDropProducts(c: Context) {
        try {
            const dropId = c.req.param('dropId');
            const products = await this.dropService.getDropProducts(dropId);
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
