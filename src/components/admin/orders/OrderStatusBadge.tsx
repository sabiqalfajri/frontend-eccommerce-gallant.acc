import { cn } from "@/lib/utils";
import { statusOrder } from "@/types/Transaction";
import { OrderStatusStyle } from "./OrderStatusStyle";

interface OrderStatusBadgeProps {
    status: statusOrder | string;
    className?: string;
}

export const OrderStatusBadge = ({
    status,
    className
}: OrderStatusBadgeProps) => {
    const s = status.toLocaleLowerCase();
    const statusObj = OrderStatusStyle[s];
    const style = statusObj ? statusObj.className : 'bg-gray-100 text-gray-600';
    const label = statusObj ? statusObj.label : status;
    
    return (
        <div className={cn("w-28 font-semibold text-center", className, style)}>
            <span className="text-sm">
                {label}
            </span>
        </div>
    )
}