import { Routes, Route } from "react-router-dom"
import { Login } from "../pages/Auth/Login"
import { Register } from "@/pages/Auth/Register"
import { ForgetPassword } from "@/pages/Auth/ForgotPassword"
import { VerifyEmail } from "@/pages/Auth/VerifyEmail"
import { ResetPassword } from "@/pages/Auth/ResetPassword"


export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* <Route path="/sign-in/sso-callback" element={<SsoCallback />} */}
        </Routes>
    )
}