import { Routes, Route } from "react-router-dom"
import { UserLayout } from "@/layouts/UserLayout"
import { Home } from "@/pages/user/Home"
import { Shop } from "@/pages/user/Shop"
import { About } from "@/pages/user/About"
import { Contact } from "@/pages/user/Contact"
import { ProductDetail } from "@/pages/user/ProductDetail"
import { Cart } from "@/pages/user/Cart"
import { Checkout } from "@/pages/user/Checkout"
import { ProtectedRoute } from "./ProtectedRoute"
import { Transaction } from "@/pages/user/Transaction"
import { OrderSkeleton } from "@/components/user/account/OrderSkeleton"

export const UserRoutes = () => {
    return (
        <Routes>
            <Route element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="detail/:id" element={<ProductDetail />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
                <Route path="transaction/:orderId" element={<Transaction />} />
                <Route path="skeleton" element={<OrderSkeleton />} />
            </Route>
        </Routes>
    )
}