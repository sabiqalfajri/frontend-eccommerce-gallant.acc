import { Navbar } from "@/components/admin/Navbar"
import { Sidebar } from "@/components/admin/Sidebar"
import { useWindowSize } from "@/hooks/universal/useWindowSize"
import { useEffect, useRef, useState } from "react"
import { Outlet, useLocation } from "react-router-dom"

export const AdminLayout = () => {
    const { pathname } = useLocation();
    const { isMobile, isTablet } = useWindowSize();
    const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const isDrawer = isMobile || isTablet
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo(0, 0);
        }
    }, [pathname]);
    
    useEffect(() => {
        if(isDrawer) {
            setIsMobileOpen(false)
        }
        
    }, [isDrawer])

    return (
        <div className="flex h-screen">
            <Sidebar 
                isMobile={isDrawer}
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
                isDesktopCollapsed={isDesktopCollapsed}
                setIsDesktopCollapsed={setIsDesktopCollapsed}
            />

            {isDrawer && isMobileOpen && (
                <div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div className="flex flex-1 flex-col overflow-hidden">
                <Navbar 
                    isMobile={isMobile}
                    onMenuClick={() => setIsMobileOpen(true)}
                />

                <main 
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto p-3.5 md:p-6 bg-gray-100"
                >
                    <Outlet />
                </main>
            </div>
        </div>
    )
}