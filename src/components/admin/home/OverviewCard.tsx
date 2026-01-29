import { CardDashboard } from "../Card"
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
                    {isLoading ? (
                        <div className="flex justify-center items-center py-4 text-sm">
                            <span className="animate-spin w-5 h-5 border-2 border-t-transparent border-gray-400 rounded-full mr-2"></span>
                            Loading data...
                        </div>
                    ) : (
                        <p className="text-[17px] font-semibold mt-2 mb-1">{value}</p>
                    )}
                    
                    {!isLoading && growth !== undefined && (
                        <div className="flex flex-wrap items-center gap-x-4">
                            {FormatGrowth(growth)}
                            <p className="text-[13px] text-gray-500">
                                Dibandingkan bulan lalu
                            </p>
                        </div>
                    )}
                </div>
            </CardDashboard>
        </>
    )
}