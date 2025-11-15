import { NavLink } from "react-router-dom"
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { FiUser } from "react-icons/fi";
import { PiAddressBook } from "react-icons/pi";
import { BsBoxArrowLeft } from "react-icons/bs";

export const SidebarAccount = () => {
    const sidebarMenu = [
        { 
            name: 'Profile',
            path: '/customer', 
            icon: <FiUser size={23} /> 
        },
        { 
            name: 'My Orders',
            path: '/customer/orders', 
            icon: <HiOutlineInboxArrowDown size={21} /> 
        },
        { 
            name: 'Address',
            path: '/customer/address', 
            icon: <PiAddressBook size={23} /> 
        },
    ]

    return (
        <div className="w-full sticky top-[5.8rem] p-3">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-col gap-y-2 border-b border-gray-200 pb-2">
                    {sidebarMenu.map((menu) => (
                        <NavLink
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
                <button className="group flex items-center justify-start gap-2 h-10 w-full px-3 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out hover:bg-gray-100 cursor-pointer">
                    <div className="w-7 h-7 rounded-md flex justify-center items-center">
                        <BsBoxArrowLeft size={21} /> 
                    </div>
                    Logout
                </button>
            </div>
        </div>
    )
}