import { Routes, Route } from "react-router-dom"
import { Home } from "../pages/user/Home"
import { AuthRoutes } from "./AuthRoutes"
import { AdminRoutes } from "./AdminRoutes"
import { ForbiddenPage } from "@/pages/error/ForbiddenPage"
import { NotFoundPage } from "@/pages/error/NotFoundPage"
import { UserRoutes } from "./UserRoutes"
import { ScrollToTop } from "@/components/common/ScrollToTop"
import { UserAccountRoutes } from "./UserAccountRoutes"

export const AppRouter = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/*" element={<UserRoutes />} />
                <Route path="/customer/*" element={<UserAccountRoutes />} />
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/dashboard/*" element={<AdminRoutes />} />

                <Route path="/403" element={<ForbiddenPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    )
}