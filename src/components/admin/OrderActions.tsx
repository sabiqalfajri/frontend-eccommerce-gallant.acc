import { BaseTransactionOrderPaginated, statusOrder } from "@/types/Transaction";
import { TbListSearch } from "react-icons/tb";
import { HiOutlineTruck } from "react-icons/hi2";
import { FiRefreshCcw } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";
import { JSX } from "react";

interface OrderAction {
    label: string;
    icon: JSX.Element;
    href?: string;
    onClick?: () => void;
}

export const getOrderDashboardActions = (
    order: BaseTransactionOrderPaginated,
    handlers: {
        updateStatus: (orderId: string, newStatus: statusOrder) => void;
    }
) => {
    const actions: OrderAction[] = [
        {
            label: 'See Detail',
            icon: <TbListSearch size={21} />,
            href: `/dashboard/orders/${order.id}`
        }
    ];

    switch (order.status) {
        case 'PENDING':
            actions.push(
                { 
                    label: 'Mark as Processing', 
                    icon: <FiRefreshCcw size={16} />,
                    href: `/dashboard/orders/${order.id}?to=PROCESSING` 
                },
                { 
                    label: 'Cancel Order', 
                    icon: <FiXCircle size={17} />,
                    href: `/dashboard/orders/${order.id}?to=CANCELED` 
                }
            );
            break;

        case 'PROCESSING':
            actions.push(
                { 
                    label: 'Mark as Shipped', 
                    icon: <HiOutlineTruck size={19} />,
                    onClick: () => handlers.updateStatus(order.id, "SHIPPED")
                },
                { 
                    label: 'Cancel Order', 
                    icon: <FiXCircle size={17} />,
                    href: `/dashboard/orders/${order.id}?to=CANCELED` 
                }
            );
            break;

        case 'SHIPPED':
            actions.push(
                { 
                    label: 'Mark as Completed', 
                    icon: <FiCheckCircle size={17} />,
                    href: `/dashboard/orders/${order.id}?to=COMPLETED` 
                }
            );
            break;

        default:
            break;
    }

    return actions;
};
