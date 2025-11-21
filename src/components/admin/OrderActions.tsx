import { BaseTransactionOrderPaginated } from "@/types/Transaction";
import { FiEye } from "react-icons/fi";
import { HiOutlineTruck } from "react-icons/hi2";
import { FiRefreshCcw } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";
import { FiXCircle } from "react-icons/fi";

export const getOrderActions = (order: BaseTransactionOrderPaginated) => {
    const actions = [
        {
            label: 'See Detail',
            icon: <FiEye size={17} />,
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
                    href: `/dashboard/orders/${order.id}?to=SHIPPED` 
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
