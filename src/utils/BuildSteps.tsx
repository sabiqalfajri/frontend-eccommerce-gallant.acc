import { statusOrder, TransactionOrderDetailAccount } from "@/types/Transaction";
import { CheckCircle, Clock, Truck, Package, XCircle } from "lucide-react";
import { FormatDate } from "./FormatDate";

const statusStepIndex: Record<statusOrder, number> = {
    PENDING: 0,
    PROCESSING: 1,
    SHIPPED: 2,
    COMPLETED: 3,
    EXPIRED: 99,
    CANCELED: 99
}

export const BuildSteps = (status: statusOrder, detail: TransactionOrderDetailAccount) => {
    const activeIndex = statusStepIndex[status];

    const steps = [
        {
            label: "Created",
            icon: <Package size={16} />,
            date: (FormatDate(detail.createdAt)),
            active: activeIndex >= 0,
        },
        {
            label: "Processing",
            icon: <Clock size={16} />,
            date: (FormatDate(detail.paidAt)),
            active: activeIndex >= 1,
        },
        {
            label: "Shipped",
            icon: <Truck size={16} />,
            date: (FormatDate(detail.shippedAt)),
            active: activeIndex >= 2,
        },
        {
            label: "Completed",
            icon: <CheckCircle size={16} />,
            date: (FormatDate(detail.completedAt)),
            active: activeIndex >= 3,
        },
    ];

    if (status === "CANCELED" || status === "EXPIRED") {
        return [
            {
                label: status === "CANCELED" ? "Order Canceled" : "Payment Expired",
                icon: <XCircle size={16} />,
                date: (FormatDate(detail.qrisExpiryAt)),
                active: true,
            },
        ];
    }

    return steps
}