import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AiOutlineInfoCircle } from "react-icons/ai";

export const EOQTooltip = () => (
    <Tooltip>
        <TooltipTrigger asChild>
            <button className="p-0.5 text-gray-500 hover:text-gray-600 transition-colors">
                <AiOutlineInfoCircle size={16} />
            </button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Jumlah pemesanan optimal hasil perhitungan EOQ</p>
        </TooltipContent>
    </Tooltip>
)