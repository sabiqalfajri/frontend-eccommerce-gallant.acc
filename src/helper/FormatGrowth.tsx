import { IoMdTrendingDown, IoMdTrendingUp, IoMdRemove  } from "react-icons/io";

export const FormatGrowth = (growth: number) => {
    const symbol = growth > 0 ? "+" : "";
    const color = growth > 0 ? "text-green-600" : growth < 0 ? "text-red-600" : "text-gray-500";
    const icon = growth > 0 ? <IoMdTrendingUp size={22} /> : growth < 0 ? <IoMdTrendingDown size={22} /> : <IoMdRemove size={22} />;

    return (
        <div className={`${color} flex flex-wrap items-center gap-1.5`}>
            {icon}
            <p className="text-[13px] font-semibold translate-y-[0.5px]">
                {symbol}{growth.toFixed(1)}%    
            </p> 
        </div>
    )
}