export const OrderStatusStyle: Record<string, { label: string; className: string }> = {
    pending: {
        label: 'Pending',
        className: 'bg-orange-100 text-orange-600'
    },
    processing: {
        label: 'Processing',
        className: 'bg-sky-100 text-sky-600'
    },
    shipped: {
        label: 'Shipped',
        className: 'bg-purple-100 text-purple-600'
    },
    completed: {
        label: 'Completed',
        className: 'bg-green-100 text-green-600'
    },
    expired: {
        label: 'Expired',
        className: 'bg-red-100 text-red-600'
    },
}