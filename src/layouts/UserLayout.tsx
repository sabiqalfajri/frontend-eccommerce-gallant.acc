import { Footer } from "@/components/user/Footer"
import { NavbarUser } from "@/components/user/NavbarUser"
import { useCurrentPath } from "@/hooks/universal/useCurrentPath";
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    const currentPath = useCurrentPath();
    const showFooter = ["/"].includes(currentPath);

    return (
        <>
            <NavbarUser />
            <main 
            >
                <Outlet />
            </main>
            {showFooter && <Footer />}
        </>
    )
}