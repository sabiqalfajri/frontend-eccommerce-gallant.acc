import { Button } from "@/components/ui/button"
import { LuDownload } from "react-icons/lu";
import { IoMdMore } from "react-icons/io";

export const OrdersAccount = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* <div className="flex flex-wrap gap-2 p-1.5 w-fit rounded-md bg-gray-200">
                <Button>
                    Current
                </Button>
                <Button>
                    Unpaid
                </Button>
                <Button>
                    All orders
                </Button>
            </div> */}
            {/* Mapping OrderId */}
            <div className="flex flex-col gap-3 border border-gray-300 py-3 px-3.5 rounded-md">
                <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3">
                    <div className="flex flex-col">
                        <h1 className="font-semibold">Order #: 73262</h1>
                        <div className="flex flex-wrap items-center gap-x-2 text-sm mt-px">
                            <p>2 Products</p>
                            <div className="w-px h-4 bg-gray-500"></div>
                            <p>13:45, Nov 10, 2025</p>
                        </div>
                    </div>
                    <Button 
                    variant="outline"
                    type="button"
                    size="icon"
                    className="[&>svg]:size-5! h-8 w-8"
                    >
                        <IoMdMore size={22} />
                    </Button>
                </div>
                <div className="flex flex-col gap-2 text-[15px] pb-3 border-b border-gray-200">
                    {/* Mapping Order Details */}
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Status</p>
                        <p className="">Processing</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Date of delivery</p>
                        <p>Fri, 14 Nov, 2025</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Delivered to</p>
                        <p>JL Kaliputih 1 No 9</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30 font-semibold">Total</p>
                        <p className="font-semibold">Rp320.000</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-[15px]">
                    {/* Mapping Orders product */}
                    <div className="grid grid-cols-[24%_1fr] gap-x-3">
                        <div className="bg-gray-200 h-[4.7rem]">
                            {/* <img src="/images/qris.svg" alt="" /> */}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-semibold line-clamp-2">Lorem ipsum is sabiq</h1>
                            <p className="text-sm mt-px">1 x Rp160.000</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[24%_1fr] gap-x-3">
                        <div className="bg-gray-200 h-[4.7rem]">
                            {/* <img src="/images/qris.svg" alt="" /> */}
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Lorem ipsum is sabiq</h1>
                            <p className="text-sm mt-px">1 x Rp160.000</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="flex flex-col gap-3 border border-gray-300 py-3 px-3.5 rounded-md">
                <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3">
                    <div className="flex flex-col">
                        <h1 className="font-semibold">Order #: 73262</h1>
                        <div className="flex flex-wrap items-center gap-x-2 text-sm mt-px">
                            <p>2 Products</p>
                            <div className="w-px h-4 bg-gray-500"></div>
                            <p>13:45, Nov 10, 2025</p>
                        </div>
                    </div>
                    <Button variant="outline">
                        <LuDownload />
                        Download Invoice
                    </Button>
                </div>
                <div className="flex flex-col gap-2 text-[15px] pb-3 border-b border-gray-200">
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Status</p>
                        <p className="">Processing</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Date of delivery</p>
                        <p>Fri, 14 Nov, 2025</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30">Delivered to</p>
                        <p>JL Kaliputih 1 No 9</p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        <p className="w-30 font-semibold">Total</p>
                        <p className="font-semibold">Rp320.000</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-8 text-[15px]">
                    <div className="grid grid-cols-[24%_1fr] gap-x-3">
                        <div className="bg-gray-200 h-[4.7rem]">
                            <img src="/images/qris.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-semibold line-clamp-2">Lorem ipsum is sabiq</h1>
                            <p className="text-sm mt-px">1 x Rp160.000</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-[24%_1fr] gap-x-3">
                        <div className="bg-gray-200 h-[4.7rem]">
                            <img src="/images/qris.svg" alt="" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="font-semibold">Lorem ipsum is sabiq</h1>
                            <p className="text-sm mt-px">1 x Rp160.000</p>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}