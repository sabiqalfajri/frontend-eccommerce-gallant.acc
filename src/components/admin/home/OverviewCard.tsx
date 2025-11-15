import { HiOutlineShoppingBag } from "react-icons/hi"
import { CardDashboard } from "../Card"
import { IoMdMore } from "react-icons/io"
import { LuUsers } from "react-icons/lu"
import { IconType } from "react-icons/lib";
import { IoMdTrendingUp } from "react-icons/io";
import { FormatGrowth } from "@/helper/FormatGrowth";

export interface OverviewCardProps {
    icon?: React.ReactNode
    title: string;
    description?: string;
    isLoading?: boolean;
    value?: number | string
    growth?: number;
}

export const OverviewCard = ({
    icon,
    title,
    description,
    isLoading,
    value,
    growth
}: OverviewCardProps) => {
    return (
        <>
            <CardDashboard>
                <div className="flex flex-col gap-y-3 items-start justify-center mt-1">
                    <div className="flex flex-wrap gap-x-2">
                        <div className="bg-gray-100 flex justify-center items-center py-1 px-2.5 rounded-md">
                            {icon}
                        </div>
                        <div className="flex flex-col">
                            <p className="font-semibold text-base">{title}</p>
                            <p className="text-[12.5px] text-gray-400">{description}</p>
                        </div>
                    </div>
                    {isLoading}
                    <p className="text-[17px] font-semibold mt-2 mb-1">{value}</p>
                    {!isLoading && growth !== undefined && (
                        <div className="flex flex-wrap items-center gap-x-4">
                            {FormatGrowth(growth)}
                            <p className="text-[13px] text-gray-500">Compared to last month</p>
                        </div>
                    )}
                </div>
            </CardDashboard>
            {/* <CardDashboard>
                <div className="flex flex-col gap-y-3 items-start justify-center mt-1">
                    <div className="flex flex-wrap items-start justify-between w-full">
                        <div className="flex flex-wrap gap-x-2">
                            <div className="bg-gray-100 flex justify-center items-center py-1 px-2.5 rounded-md">
                                <LuUsers size={23} />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">Total Customers</p>
                                <p className="text-[13px] text-gray-400">126 Orders</p>
                            </div>
                        </div>
                        <button type="button" className="cursor-pointer">
                            <IoMdMore size={23} />
                        </button>
                    </div>
                    <p className="text-[17px] font-semibold mt-2">Rp200.000</p>
                </div>
            </CardDashboard>
            <CardDashboard>
                <div className="flex flex-col gap-y-3 items-start justify-center mt-1">
                    <div className="flex flex-wrap items-start justify-between w-full">
                        <div className="flex flex-wrap gap-x-2">
                            <div className="bg-gray-100 flex justify-center items-center py-1 px-2.5 rounded-md">
                                <HiOutlineShoppingBag size={23} />
                            </div>
                            <div className="flex flex-col">
                                <p className="font-semibold">Pending Orders</p>
                                <p className="text-[13px] text-gray-400">Awaiting Payment</p>
                            </div>
                        </div>
                        <button type="button" className="cursor-pointer">
                            <IoMdMore size={23} />
                        </button>
                    </div>
                    <p className="text-[17px] font-semibold mt-2">Rp200.000</p>
                </div>
            </CardDashboard> */}
        </>
    )
}