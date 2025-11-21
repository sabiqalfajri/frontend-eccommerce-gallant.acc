import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { PiNotepad } from "react-icons/pi";
import { BsTelephone } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState } from "react";

export const OrderDetailDashboard = () => {
    const [showAllItems, setShowAllItems] = useState(false);
    const navigate = useNavigate();

    const orderItems = [
        {
            image: "/images/man.jpg",
            name: "Nike Air Force 1 LVB Edition Special",
            price: 120000,
            qty: 2,
            total: 240000
        },
        {
            image: "/images/man.jpg",
            name: "Nike Air Force 1 LVB Edition Special",
            price: 120000,
            qty: 2,
            total: 240000
        },
        {
            image: "/images/man.jpg",
            name: "Nike Air Force 1 LVB Edition Special",
            price: 120000,
            qty: 2,
            total: 240000
        }
    ];
    const visibleItems = showAllItems ? orderItems : orderItems.slice(0,2);

    const paymenSummary = [
        {
            label: 'Subtotal (4 items)',
            value: 'Rp32.000'
        },
        {
            label: 'Delivery',
            value: 'Rp0'
        },
        {
            label: 'Tax',
            value: 'Rp2.000'
        },
        {
            label: 'Total',
            value: 'Rp32.000'
        },
    ]

    return (
        <div className="flex flex-col gap-y-6">
            <div className="flex flex-wrap items-center gap-x-3">
                <button 
                type="button"
                className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                onClick={() => navigate(-1)}
                >
                    <IoIosArrowBack size={22} />
                </button>
                <h1>Order ID <span className="font-bold">#2541</span></h1>
            </div>
            <div className="flex flex-col gap-3.5">
                <div className="flex flex-wrap items-center gap-4">
                    <div className="bg-green-100 text-green-600 rounded-md py-0.5 px-3">
                        <h1 className="font-semibold">PAID</h1>
                    </div>
                    <div className="bg-gray-400 w-[1.2px] h-5"></div>
                    <div className="flex flex-wrap gap-x-1.5 items-center text-gray-500">
                        <IoCalendarOutline size={19} />
                        <p className="font-semibold">12 Jan, 2025 - 10:34 WIB</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-6">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col bg-white rounded-md px-4 pt-4 pb-5">
                            <div className="grid grid-cols-[45%_1fr_12%_1fr] gap-x-2.5 text-[15px] text-gray-400 font-semibold mb-1">
                                <p>Items</p>
                                <p>Price</p>
                                <p>Qty</p>
                                <p>Total</p>
                            </div>

                            {visibleItems.map((item, i) => (
                                <div 
                                    key={i}
                                    className={`grid grid-cols-[45%_1fr_12%_1fr] gap-x-2.5 text-sm py-4 ${i !== visibleItems.length - 1 ? 'border-b border-gray-200' : ''}`}
                                >
                                    <div className="flex gap-3">
                                        <img src={item.image} className="w-16 h-16 rounded-md object-cover" />
                                        <p className="font-semibold line-clamp-2">{item.name}</p>
                                    </div>
                                    <p>Rp{item.price.toLocaleString("id-ID")}</p>
                                    <p>{item.qty}</p>
                                    <p>Rp{item.total.toLocaleString("id-ID")}</p>
                                </div>
                            ))}

                            {orderItems.length > 2 && (
                                <button className="flex flex-wrap gap-1 items-center mx-auto text-sm cursor-pointer"
                                onClick={() => setShowAllItems(prev => !prev)}
                                >
                                    {showAllItems ? 'Show less' : 'Show more'}
                                    <RiArrowDownSLine 
                                        size={20} 
                                        className={`translate-y-0.5 transition-transform duration-200 ${showAllItems ? "rotate-180" : ""}`}
                                    />
                                </button>
                            )}
                        </div>
                        <div className="bg-white rounded-md px-4 pt-4 pb-5">
                            <h1 className="font-semibold text-base">Payment Summary</h1>
                            <div className="flex flex-col gap-1 mt-4">
                                {paymenSummary.map(item => (
                                    <div className="flex flex-wrap justify-between items-center text-[15px]">
                                        <h1>{item.label}</h1>
                                        <p>{item.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-md px-4 pt-4 pb-5 gap-3 h-fit">
                        <h1 className="font-semibold text-base">Customer</h1>
                        <div className="flex flex-col">
                            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 py-4">
                                <div className="w-9 h-9">
                                    <img src="/images/man.jpg" alt="" 
                                    className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <h1>Muhammad Rahul</h1>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 py-4">
                                <div className="w-9 flex justify-center">
                                    <PiNotepad size={22} />
                                </div>
                                <h1>4 0rders</h1>
                            </div>
                            <div className="flex flex-col gap-3.5 border-b border-gray-200 py-4">
                                <h1 className="font-semibold">Contact Info</h1>
                                <div className="flex flex-col gap-2 text-[15px]">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <IoMailOutline size={21} />
                                        <p>muhammadafiq@gmail.com</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <BsTelephone size={18} />
                                        <p>+62</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3.5 py-4">
                                <h1 className="font-semibold">Shipping Address</h1>
                                <div className="flex flex-col gap-0.5 text-[15px]">
                                    <p>Malaysia Road</p>
                                    <p>+62</p>
                                    <p>Sawayan ovai, 605</p>
                                    <p>1201</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}