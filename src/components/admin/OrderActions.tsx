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
            label: 'Lihat Detail',
            icon: <TbListSearch size={21} />,
            href: `/dashboard/orders/${order.publicId}`
        }
    ];

    switch (order.status) {
        case 'PENDING':
            actions.push(
                { 
                    label: 'Tandai sebagai Diproses', 
                    icon: <FiRefreshCcw size={16} />,
                    href: `/dashboard/orders/${order.id}?to=PROCESSING` 
                },
                { 
                    label: 'Tandai sebagai Dibatalkan', 
                    icon: <FiXCircle size={17} />,
                    onClick: () => handlers.updateStatus(order.id, "CANCELED")
                }
            );
            break;

        case 'PROCESSING':
            actions.push(
                { 
                    label: 'Tandai sebagai Dikirim', 
                    icon: <HiOutlineTruck size={19} />,
                    onClick: () => handlers.updateStatus(order.id, "SHIPPED")
                },
            );
            break;

        case 'SHIPPED':
            actions.push(
                { 
                    label: 'Tandai sebagai Selesai', 
                    icon: <FiCheckCircle size={17} />,
                    onClick: () => handlers.updateStatus(order.id, "COMPLETED")
                }
            );
            break;

        default:
            break;
    }

    return actions;
};
