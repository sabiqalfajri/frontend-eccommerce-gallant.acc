import { Variant } from "@/components/common/ModalDelete"

export const ModalConfig: Record<string, {
    variant: Variant,
    title: string,
    confirmLabel: string,
    description: string
}> = {
    PROCESSING: {
        variant: "PROCESSING",
        title: "Mark as Processing",
        confirmLabel: "Process Order",
        description: "Are you sure you want to mark this order as processing?"
    },
    SHIPPED: {
        variant: "SHIPPED",
        title: "Mark as Shipped",
        confirmLabel: "Ship Order",
        description: "Are you sure you want to mark this order as shipped? This action cannot be undone."
    },
    COMPLETED: {
        variant: "COMPLETED", 
        title: "Complete Order",
        confirmLabel: "Complete Order",
        description: "Are you sure you want to mark this order as completed? This also finalizes the transaction."
    },
    CANCELED: {
        variant: "DELETE",
        title: "Cancel Order",
        confirmLabel: "Cancel Order",
        description: "Are you sure you want to cancel this order? This cannot be undone."
    }
}
