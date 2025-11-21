import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { DropdownCustom, MenuItem } from "../common/DropdownCustom";
import { FiLogOut } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { useLogout } from "@/hooks/auth/useLogout";

interface NavbarProps {
    isMobile: boolean
    onMenuClick: () => void
}

export const Navbar = ({ 
    onMenuClick,
}: NavbarProps) => {
    const { 
        currentUser, 
    } = useCurrentUser();
    const { logout } = useLogout();

    const menu: MenuItem[] = [
        { 
            icon: <LuUserRound size={20} />, 
            label: 'Profile', 
            href: `/dashboard/update-product`,
            separator: 'up'
        },
        { 
            icon: <IoSettingsOutline size={19} />, 
            label: 'Setting', 
            onClick: () => {
                console.log('')
            },
            separator: 'down'
        },
        { 
            icon: <FiLogOut size={19} />, 
            label: 'Sign Out', 
            onClick: logout
        },
    ];

    return (
        <nav 
        // className="flex flex-wrap justify-between items-center fixed top-0 z-30 border-b border-gray-200 bg-white px-3.5 md:px-6 h-18"
        className="flex flex-wrap justify-between items-center sticky top-0 z-30 border-b border-gray-200 bg-white px-3.5 md:px-6 h-18"
        >
            <div className="">
                <button
                type="button"
                onClick={onMenuClick}
                className="cursor-pointer block md:hidden"
                >
                    <HiOutlineMenuAlt2 size={23} />
                </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-2.5">
                <button type="button" className="cursor-pointer md:mr-2">
                   <IoNotificationsOutline size={24} /> 
                </button>
                <div className="bg-gray-200 h-10 w-0.5"></div>
                <DropdownCustom
                    align="end"
                    menu={menu}
                    className="w-56"
                    header={
                        <div className="flex flex-wrap gap-x-2 items-center pt-0.5">
                            <img className="w-8 h-8 rounded-full object-cover" src={currentUser?.image} alt="profile-menu" />
                            <div className="flex flex-col">
                                <h1 className="text-sm font-semibold truncate w-36">
                                    {CapitalizeText(currentUser?.name)}
                                </h1>
                                <p className="text-xs truncate w-36">
                                    {currentUser?.email}
                                </p>
                            </div>
                        </div>
                    }
                >
                    <button className="flex flex-wrap justify-center items-center gap-x-3 hover:bg-transparent md:hover:bg-gray-100 text-start w-fit md:w-40 rounded-md cursor-pointer">
                        <div className="w-9 h-9 bg-gray-200 rounded-full">
                            <img src={currentUser?.image} className="w-full h-full rounded-full" alt="profile" />
                        </div>
                        <div className="flex flex-wrap items-start gap-x-1">
                            <div className="md:flex flex-col hidden">
                                <div>
                                    <p className="text-[15px] font-semibold truncate w-20">
                                        {CapitalizeText(currentUser?.name)}
                                        {currentUser?.name}
                                    </p>
                                </div>
                                <p className="text-[13px] text-gray-500">
                                    {currentUser?.role === 'ADMIN' && 'Admin'}
                                </p>
                            </div>
                            <IoIosArrowDown className="translate-y-1 hidden md:block" />
                        </div>
                    </button>
                </DropdownCustom>
            </div>
        </nav>
    )
}