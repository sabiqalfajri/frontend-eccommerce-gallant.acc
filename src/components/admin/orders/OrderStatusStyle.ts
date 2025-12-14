export const OrderStatusStyle: Record<string, { label: string; className: string }> = {
    pending: {
        label: 'Belum Bayar',
        className: 'bg-orange-100 text-orange-600'
    },
    processing: {
        label: 'Diproses',
        className: 'bg-sky-100 text-sky-600'
    },
    shipped: {
        label: 'Dikirim',
        className: 'bg-purple-100 text-purple-600'
    },
    completed: {
        label: 'Selesai',
        className: 'bg-green-100 text-green-600'
    },
    canceled: {
        label: 'Dibatalkan',
        className: 'bg-red-100 text-red-600'
    },
    expired: {
        label: 'Tidak Dibayar',
        className: 'bg-red-100 text-red-600'
    },
}