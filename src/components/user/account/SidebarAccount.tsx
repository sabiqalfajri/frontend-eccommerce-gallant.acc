import { NavLink } from "react-router-dom"
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { MapPin } from 'lucide-react';
import { BsBoxArrowLeft } from "react-icons/bs";
import { useLogout } from "@/hooks/auth/useLogout";

export const SidebarAccount = () => {
    const { logout } = useLogout();
    const sidebarMenu = [
        { 
            name: 'Profile',
            path: '/customer', 
            icon: <FiUser size={23} /> 
        },
        { 
            name: 'My Orders',
            path: '/customer/order/all', 
            icon: <HiOutlineInboxArrowDown size={21} /> 
        },
        { 
            name: 'Address',
            path: '/customer/address', 
            icon: <MapPin size={22} /> 
        },
    ]

    return (
        <div className="w-full sticky top-[5.8rem] p-3">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2 border-b border-gray-200 pb-2">
                    {sidebarMenu.map((menu, idx) => (
                        <NavLink
                        key={idx}
                        to={menu.path}
                        end={menu.path === "/customer"}
                        className={({ isActive }: any) => 
                        `group flex items-center justify-start gap-2 h-10 w-full px-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out ${isActive ? "bg-primary-light text-primary" : "text-gray-600 hover:bg-gray-100"}`
                        }
                        >
                            <div className="w-7 h-7 rounded-md flex justify-center items-center">
                                {menu.icon}
                            </div>
                            {menu.name}
                        </NavLink>
                    ))}
                </div>
                <button className="group flex items-center justify-start gap-2 h-10 w-full px-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer"
                onClick={logout}
                >
                    <div className="w-7 h-7 rounded-md flex justify-center items-center">
                        <BsBoxArrowLeft size={20} /> 
                    </div>
                    Sign Out
                </button>
            </div>
        </div>
    )
}