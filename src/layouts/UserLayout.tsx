import { Footer } from "@/components/user/Footer"
import { NavbarUser } from "@/components/user/NavbarUser"
import { Outlet } from "react-router-dom"

export const UserLayout = () => {
    return (
        <>
            <NavbarUser />
            <main 
            // className="px-2.5 md:px-16 py-3"
            // style={{
            //     "--layout-padding" : "0.625rem",
            //     "--layout-padding-md": "4rem"
            // } as React.CSSProperties }
            >
                <Outlet />
            </main>
            <Footer />
        </>
    )
}