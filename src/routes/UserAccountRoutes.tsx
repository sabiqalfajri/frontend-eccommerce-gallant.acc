import { Routes, Route } from "react-router-dom"
import { UserAccountLayout } from "@/layouts/UserAccountLayout"
import { OrdersAccount } from "@/pages/user/account/OrdersAccount"
import { AddressAccount } from "@/pages/user/account/AddressAccount"
import { ProfileAccount } from "@/pages/user/account/ProfileAccount"
import { ProtectedRoute } from "./ProtectedRoute"
import { AddAddressAccount } from "@/pages/user/account/AddAddressAccount"
import { EditAddressAccount } from "@/pages/user/account/EditAddressAccount"

export const UserAccountRoutes = () => {

    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route element={<UserAccountLayout />}>
                    <Route index element={<ProfileAccount />} />
                    <Route path="orders" element={<OrdersAccount />} />
                    <Route path="address" element={<AddressAccount />} />
                    <Route path="address/add" element={<AddAddressAccount />} />
                    <Route path="address/edit/:id" element={<EditAddressAccount />} />
                </Route>
            </Route>
        </Routes>
    )
}