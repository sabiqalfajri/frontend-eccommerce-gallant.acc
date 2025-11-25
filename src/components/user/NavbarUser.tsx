import { NavLink, useNavigate } from "react-router-dom"
import { IoCartOutline } from "react-icons/io5";
import { DropdownCustom, MenuItem } from "../common/DropdownCustom";
import { useToken } from "@/hooks/universal/useToken";
import { BiUser } from "react-icons/bi";
import { useLogout } from "@/hooks/auth/useLogout";
import { IoLogInOutline } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { useCart } from "@/hooks/cart/useCart";
import { HiOutlineInboxArrowDown } from "react-icons/hi2";
import { BsBoxArrowLeft } from "react-icons/bs";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { useAuth } from "@clerk/clerk-react";
import { MapPin } from 'lucide-react';

export const NavbarUser = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { token } = useToken();
    const { currentUser } = useCurrentUser();
    const { isSignedIn, isLoaded } = useAuth();
    const { cartItem } = useCart(token!);

    const navMenu = [
        { tittle: "Home", path: "/" },
        { tittle: "Shop", path: "/shop" },
        { tittle: "About", path: "/about" },
        { tittle: "Contact", path: "/contact" },
    ]

    const authMenu: MenuItem[] = [
        { 
            icon: <BiUser size={22} />, 
            label: 'Profile', 
            href: '/customer',
            separator: 'up'
        },
        { 
            icon: <HiOutlineInboxArrowDown size={20} />, 
            label: 'Orders',
            href: '/customer/order/all' 
        },
        { 
            icon: <MapPin size={20} />, 
            label: 'Adress',
            href: '/customer/address' 
        },
        { 
            icon: <BsBoxArrowLeft size={19} />, 
            label: 'Sign Out', 
            onClick: logout, 
            separator: "up",
        },
    ]

    const guestMenu = [
        { icon: <IoLogInOutline size={25} color="#000" />, label: 'Sign In', href: '/auth/sign-in' },
    ]
    
    const userMenu = isSignedIn ? authMenu : guestMenu;

    const triggerButton = (
        <button
        type="button"
        className="flex justify-center items-center bg-primary text-white rounded-full h-9 w-9 hover:opacity-85 transition cursor-pointer"
        >
            <BiUser size={20} />
        </button>
    )

    return (
        <nav className="flex justify-between md:justify-center md:grid md:grid-cols-[1fr_3fr_1fr] items-center sticky top-0 z-50 border-b border-gray-200 bg-white px-2.5 md:px-7 h-18 w-full">
            <a href="/" className="flex justify-start items-center font-semibold">
                <p className="m-0 text-base">Gallant.acc</p>
            </a>
            <div>
                <ul className="hidden md:flex flex-wrap justify-center items-center gap-12">
                    {navMenu.map((item, index) => (
                        <NavLink
                        to={item.path} 
                        key={index}
                        type="button"
                        className={({ isActive }: any) => 
                            `cursor-pointer font-semibold ${isActive ? 'text-primary' : ""}`
                        }
                        >
                            {item.tittle}
                        </NavLink>
                    ))} 
                </ul>
            </div>
            <div className="flex flex-wrap gap-x-2 md:gap-x-4 justify-end items-center">
                <button 
                type="button"
                className="px-1.5 py-1 cursor-pointer hover:bg-[#F0F0F0] rounded-md transform transition-all duration-200 relative"
                onClick={() => navigate('/cart')}
                >   
                    {cartItem && cartItem.items?.length > 0 && (
                        <Badge variant="destructive" 
                        className="absolute -top-0.5 right-0 h-[18px] min-w-[18px] rounded-full px-0.5 font-mono tabular-nums">
                            {cartItem.items.length}
                        </Badge>
                    )}
                    <IoCartOutline size={25} />
                </button>
                <DropdownCustom
                    trigger={triggerButton}
                    align="end"
                    menu={userMenu}
                    className="min-w-40"
                    header={
                        isLoaded && isSignedIn && (
                            <div className="flex flex-wrap gap-x-2 items-center pt-0.5">
                                <img className="w-10 h-10 rounded-full object-cover" src={currentUser?.image} alt="profile-menu" />
                                <div className="flex flex-col">
                                    <h1 className="text-sm font-semibold truncate w-36">
                                        {CapitalizeText(currentUser?.name)}
                                    </h1>
                                    <p className="text-xs truncate w-36">
                                        {currentUser?.email}
                                    </p>
                                </div>
                            </div>
                        )
                    }
                />
            </div>
        </nav>
    )
}