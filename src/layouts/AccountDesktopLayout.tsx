import { Section } from "@/components/common/Section"
import { SidebarAccount } from "@/components/user/account/SidebarAccount"
import { Outlet } from "react-router-dom"

export const AccountDesktopLayout = () => {
    return (
        <Section>
            <div className="flex flex-row gap-x-2">
                <div className="w-[250px] hidden lg:block">
                    <SidebarAccount />
                </div>
                <div className="flex-1 min-h-[40vh] max-w-[67%] mt-2 p-3">
                    <Outlet />
                </div>
            </div>
        </Section>
    )
}