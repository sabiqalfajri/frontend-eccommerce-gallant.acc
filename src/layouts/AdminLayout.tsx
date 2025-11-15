import { Navbar } from "@/components/admin/Navbar"
import { Sidebar } from "@/components/admin/Sidebar"
import { useWindowSize } from "@/hooks/universal/useWindowSize"
import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

export const AdminLayout = () => {
    const { isMobile } = useWindowSize();
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    useEffect(() => {
        if(isMobile) {
            setIsMobileOpen(false)
        }
        
    }, [isMobile])

    return (
       

        <div className="flex h-screen">
            <Sidebar 
            // isOpen={isSidebarOpen} 
            // setIsOpen={setIsSidebarOpen}
            isMobile={isMobile}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
            isDesktopCollapsed={isDesktopCollapsed}
            setIsDesktopCollapsed={setIsDesktopCollapsed}
            />

            {isMobile && isMobileOpen && (
                <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar 
                isMobile={isMobile}
                onMenuClick={() => setIsMobileOpen(true)}
                // isDesktopCollapsed={}
                // setIsDesktopCollapsed={}
                // isSidebarOpen={isSidebarOpen} 
                // setIsSidebarOpen={setIsSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto p-3.5 md:p-6 bg-gray-100">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}