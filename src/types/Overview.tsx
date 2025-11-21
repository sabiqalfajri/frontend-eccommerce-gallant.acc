export interface Overview {
    customers: { total: number; growth: number }
    orders: { total: number; growth: number }
    revenue: { total: number; growth: number }
    topCategories: { name: string; count: number }[]
    weeklySales: { day: string; total: number }[]
}