import { RxDashboard } from "react-icons/rx";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { LuLayers } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion"
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import { useLogout } from "@/hooks/auth/useLogout";


interface SidebarProps {
    isMobile: boolean;
    isMobileOpen: boolean
    setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>
    isDesktopCollapsed: boolean;
    setIsDesktopCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

export const Sidebar = ({ 
    isMobile,
    isMobileOpen,
    setIsMobileOpen,
    isDesktopCollapsed,
    setIsDesktopCollapsed
}: SidebarProps) => {
    const { logout } = useLogout();
    const sidebarMenu = {
        overview: {
            title: 'Overview',
            items: [
                { name: 'Dashboard', path: '/dashboard', icon: <RxDashboard size={21} /> },
                { name: 'Pesanan', path: '/dashboard/orders', icon: <GoPackage size={21} /> },
                { name: 'Produk', path: '/dashboard/products', icon: <HiOutlineShoppingBag size={21} /> },
                { name: 'Kategori', path: '/dashboard/categories', icon: <LuLayers size={21} /> },
                { name: 'Pengguna', path: '/dashboard/customers', icon: <PiUsers size={21} /> },
            ]
        },
        General: {
            title: 'General',
            items: [
                { name: 'Pengaturan', path: '/dashboard/settings', icon: <IoSettingsOutline size={21} /> },
                { name: 'Keluar', path: '', icon: <FiLogOut size={21} /> },
            ]
        }
    }

    const motionProps = isMobile 
    ? {
        initial: { x: -250, width: 250 },
        animate: { x: isMobileOpen ? 0 : -250, width: 250 },
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }
    : {
        initial: { width: isDesktopCollapsed ? 83 : 224 },
        animate: { width: isDesktopCollapsed ? 83 : 224 },
        transition: { type: "spring", stiffness: 200, damping: 25 }
      }
    
    const showText = isMobile ? isMobileOpen : !isDesktopCollapsed
    const headerSidebarStyle = isMobile ? 
    isMobileOpen && 'justify-between px-5' 
    : !isDesktopCollapsed ? 'justify-between pl-6 pr-4' : 'justify-center'

    return (
        <motion.aside 
        {...motionProps}
        style={{ overflow: 'hidden' }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`bg-white border-r border-gray-100 
        ${isMobile ? 'fixed top-0 left-0 h-full z-50 shadow-lg' : 'sticky top-0 h-screen'}`}>
            <nav 
            className={`h-18 flex items-center ${headerSidebarStyle}`}
            >
                {showText && <h1>Logo</h1>}
                {/* Close Sidebar Button For Mobile */}
                {isMobile && (
                    <button 
                    type="button" 
                    className="p-1 bg-[#F0F0F0] rounded-md hover:brightness-90 transition-all duration-200 ease-in-out cursor-pointer"
                    onClick={() => setIsMobileOpen(false)}
                    >
                        <IoCloseOutline size={22} />
                    </button>
                )}

                {/* Close Sidebar Button For Desktop */}
                {!isMobile && (
                    <button 
                    type="button" 
                    className="rounded-md hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer p-1.5"
                    onClick={() => setIsDesktopCollapsed((prev) => !prev)}
                    >
                        {isDesktopCollapsed ? <GoSidebarCollapse size={22} /> : <GoSidebarExpand size={22} />}
                    </button>
                )}
            </nav>
            <div className="flex flex-col justify-center items-start py-6 px-5">
                {Object.entries(sidebarMenu).map(([key, section]) => (
                    <div 
                    key={key} 
                    className={`flex flex-col gap-y-2 w-full ${section.title === 'Overview' ? 'border-b border-gray-200 pb-2' : 'mt-2.5'}`}>
                        <p className={`text-sm text-gray-400 h-5 ${!showText && 'px-2.5'}`}>
                            {showText ? section.title : <IoIosMore size={23} />}
                        </p>
                        <div className="flex flex-col gap-1.5">
                            {section.items.map((item) => {
                                const isLogout = item.name === 'Keluar';
                                
                                if(isLogout) {
                                    return (
                                        <button
                                        key={item.name}
                                        onClick={logout}
                                        className={`
                                        flex items-center
                                        ${showText ? "justify-start px-3" : "justify-center"}
                                        h-10 w-full rounded-lg text-sm font-medium text-gray-600
                                        hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer
                                        `}
                                        >
                                            <span
                                            className={`shrink-0 transition-all duration-300 ease-in-out ${showText ? "mr-4" : ""}`}
                                            >
                                                {item.icon}
                                            </span>
                                            {showText && <span>{item.name}</span>}
                                        </button>
                                    )
                                }
                                
                                return (
                                    <NavLink
                                    key={item.name}
                                    to={item.path}
                                    end={item.path === "/dashboard"}
                                    onClick={() => isMobile && setIsMobileOpen(false)}
                                    className={({ isActive }: any) => 
                                        `group flex items-center ${showText ? "justify-start px-3" : "justify-center"} h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${isActive ? "bg-primary-light text-primary" : "text-gray-600 hover:bg-gray-100"}`
                                        }
                                    >
                                        <span
                                          className={`
                                          shrink-0 transition-all duration-300 ease-in-out
                                          ${showText ? "mr-4" : "mr-0"}`}
                                        >
                                            {item.icon}
                                        </span>

                                        {showText && (
                                            <span>
                                                {item.name}
                                            </span>
                                        )}
                                    </NavLink>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </motion.aside>
    )
}