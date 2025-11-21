import { Routes, Route } from "react-router-dom"
import { AdminLayout } from "@/layouts/AdminLayout"
import { OrdersDashboard } from "@/pages/admin/OrdersDashboard"
import { ProductsDashboard } from "@/pages/admin/ProductsDashboard"
import { CategoryDashboard } from "@/pages/admin/CategoriesDashboard"
import { CustomersDashboard } from "@/pages/admin/CustomersDashboard"
import { SettingsDashboard } from "@/pages/admin/SettingsDashboard"
import { HomeDashboard } from "@/pages/admin/HomeDashboard"
import { PrivateRoute } from "./PrivateRoute"
import { AddProduct } from "@/pages/admin/AddProduct"
import { EditProduct } from "@/pages/admin/EditProduct"
import { OrderDetailDashboard } from "@/pages/admin/OrderDetailDashboard"

export const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route element={<AdminLayout />}>
                    <Route index element={<HomeDashboard />} />
                    <Route path="orders" element={<OrdersDashboard />} />
                    <Route path="orders/:id" element={<OrderDetailDashboard />} />
                    <Route path="products" element={<ProductsDashboard />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="update-product/:id" element={<EditProduct />} />
                    <Route path="categories" element={<CategoryDashboard />} />
                    <Route path="customers" element={<CustomersDashboard />} />
                    <Route path="settings" element={<SettingsDashboard />} />
                </Route>
            </Route>
        </Routes>
    )
}