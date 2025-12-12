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
    console.log("active index:", activeIndex)

    const steps = [
        {
            label: "Dibuat",
            icon: <Package size={16} />,
            date: (FormatDate(detail.createdAt)),
            active: activeIndex === 0,
        },
        {
            label: "Diproses",
            icon: <Clock size={16} />,
            date: (FormatDate(detail.paidAt)),
            active: activeIndex === 1,
        },
        {
            label: "Dikirim",
            icon: <Truck size={16} />,
            date: (FormatDate(detail.shippedAt)),
            active: activeIndex === 2,
        },
        {
            label: "Selesai",
            icon: <CheckCircle size={16} />,
            date: (FormatDate(detail.completedAt)),
            active: activeIndex === 3,
        },
    ];

    if (status === "CANCELED" || status === "EXPIRED") {
        return [
            {
                label: status === "CANCELED" ? "Pesanan dibatalkan" : "Pesanan dibatalkan - Tidak dibayar",
                icon: <XCircle size={16} />,
                date: (FormatDate(detail.qrisExpiryAt)),
                active: true,
            },
        ];
    }

    return steps
}