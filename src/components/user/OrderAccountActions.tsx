import { statusOrder, TransactionOrderByUserId } from "@/types/Transaction";
import { JSX } from "react";
import { FiXCircle } from "react-icons/fi";
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
    const buildMessageWA = 
    `Halo Kak, saya butuh bantuan terkait pesanan saya 🙏\n\n Order ID: #${order.publicId}\n Status: ${order.status}\n Total Item: ${order.items.length}\n\nPertanyaan saya:\n`;

    const phoneNumber = "6287841651802";
    const encodedMessage = encodeURIComponent(buildMessageWA);

    const actions: OrderAction[] = [
        {
            label: 'Lihat Detail',
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
                    onClick: () => window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
                },
            );
            break;

        case 'SHIPPED':
            actions.push(
                { 
                    label: 'Contact seller', 
                    icon: <Headphones size={19} />,
                    onClick: () => window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
                },
            );
            break;

        default:
            break;
    }

    return actions;
}