export interface DashboardStats {
    users: { total: number; label: string };
    products: { total: number; lowStock: number; label: string };
    drops: { total: number; active: number; label: string };
}
