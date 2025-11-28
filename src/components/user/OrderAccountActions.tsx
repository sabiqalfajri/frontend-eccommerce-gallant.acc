import { statusOrder, TransactionOrderByUserId } from "@/types/Transaction";
import { JSX } from "react";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { TbListSearch } from "react-icons/tb";
import { BsQrCodeScan } from "react-icons/bs";
import { Headphones } from 'lucide-react';

interface OrderAction {
    label: string;
    icon: JSX.Element;
    href?: string;
    onClick?: () => void;
}

export const getOrderAccountActions = (
    order:  TransactionOrderByUserId,
    handlers: {
        updateStatus: (orderId: string, newStatus: statusOrder) => void;
    }
): OrderAction[] => {
    const actions: OrderAction[] = [
        {
            label: 'See Detail',
            icon: <TbListSearch size={21} />,
            href: `/customer/order/${order.publicId}`,
        }
    ];

    switch (order.status) {
        case 'PENDING':
            actions.push(
                { 
                    label: 'Pay Now', 
                    icon: <BsQrCodeScan size={17} />,
                    href: `/transaction/${order.id}` 
                },
                { 
                    label: 'Cancel Order', 
                    icon: <FiXCircle size={18} />,
                    onClick: () => handlers.updateStatus(order.id, "CANCELED")
                }
            );
            break;

        case 'PROCESSING':
            actions.push(
                { 
                    label: 'Contact seller', 
                    icon: <Headphones size={19} />,
                    href: `/dashboard/orders/${order.id}?to=SHIPPED` 
                },
            );
            break;

        case 'SHIPPED':
            actions.push(
                { 
                    label: 'Mark as Delivered', 
                    icon: <FiCheckCircle size={17} />,
                    onClick: () => handlers.updateStatus(order.id, "COMPLETED")
                }
            );
            break;

        default:
            break;
    }

    return actions;
}