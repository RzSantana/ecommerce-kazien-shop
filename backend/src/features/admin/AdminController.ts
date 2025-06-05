import { Context } from "hono";
import { AdminService } from "./AdminService";

export class AdminController {
    private adminService = new AdminService();

    // GET /api/admin/dashboard
    public async getDashboard(c: Context) {
        try {
            const stats = await this.adminService.getDashboardStats();
            return c.json({ success: true, data: stats });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // GET /api/admin/users
    public async getAllUsers(c: Context) {
        try {
            const users = await this.adminService.getAllUsers();
            return c.json({ success: true, data: users });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // PUT /api/admin/users/:id/role
    public async updateUserRole(c: Context) {
        try {
            const userId = c.req.param("id");
            const { role } = await c.req.json();

            if (!["user", "admin"].includes(role)) {
                return c.json(
                    {
                        success: false,
                        error: 'Invalid role. Must be "user" or "admin"',
                    },
                    400
                );
            }

            const user = await this.adminService.updateUserRole(userId, role);
            return c.json({ success: true, data: user });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }

    // DELETE /api/admin/users/:id
    public async deleteUser(c: Context) {
        try {
            const userId = c.req.param("id");
            await this.adminService.deleteUser(userId);
            return c.json({
                success: true,
                message: "User deleted successfully",
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            return c.json({ success: false, error: errorMessage }, 500);
        }
    }
}
