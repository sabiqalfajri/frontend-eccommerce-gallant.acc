import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-primary pb-5 min-h-[25vh] mt-12 text-[#FFFFFF] px-4 md:px-16 py-12 flex flex-col justify-center">
            <div className="grid grid-cols-1 md:grid-cols-[30%_70%] gap-12 mb-12">
                <div className="flex flex-col gap-5">
                    <h1 className="font-garamond text-lg font-extrabold">Gallant.acc</h1>
                    <p className="text-justify text-sm">Discover unique, thoughtful gifts for every occasion. From personalized presents to one-of-a-kind treasures, we're to help you find the perfect way to show you care.</p>
                    <div className="flex flex-wrap justify-start items-center gap-3 mt-1">
                        <NavLink to="/">
                            <FaFacebookF size={23} />
                        </NavLink>
                        <NavLink to="/">
                            <FaInstagram size={24} />
                        </NavLink>
                        <NavLink to="/">
                            <FaWhatsapp size={24} />
                        </NavLink>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                    <div className="flex flex-col gap-5">
                        <h1><strong>Main Menu</strong></h1>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li className="hover:underline transform transition-all duration-300">
                                <a href="/">Home</a>  
                            </li>
                            <li className="hover:underline transform transition-all duration-300">
                                <a href="/shop">Shop</a>  
                            </li>
                            <li className="hover:underline transform transition-all duration-300">
                                <a href="/about">About</a>  
                            </li>
                            <li className="hover:underline transform transition-all duration-300">
                                <a href="/contact">Contact</a>  
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1><strong>Service</strong></h1>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>
                                My Account
                            </li>
                            <li>
                                Track Order
                            </li>
                            <li>
                                Return
                            </li>
                            <li>
                                FAQ
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-5">
                        <h1><strong>Contact Us</strong></h1>
                        <ul className="flex flex-col gap-3 text-sm">
                            <li>
                                Privacy
                            </li>
                            <li>
                                Condition
                            </li>
                            <li>
                                Return Policy
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="border border-[#FFFFFF]"></div>
            <div className="mt-[1rem] md:mt-8 flex flex-wrap justify-center items-center pb-5 md:pb-0">
                <p className="text-sm">Copyright &copy; 2025. All Rights Reserved.</p>
            </div>
        </footer>
    )
}