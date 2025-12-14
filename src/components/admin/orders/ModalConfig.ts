import { Variant } from "@/components/common/ModalDelete"

export const ModalConfig: Record<string, {
    variant: Variant,
    title: string,
    confirmLabel: string,
    description: string
}> = {
    PROCESSING: {
        variant: "PROCESSING",
        title: "Tandai Diproses",
        confirmLabel: "Tandai Diproses",
        description: "Apakah Anda yakin ingin menandai pesanan ini sebagai diproses?. Tindakan ini tidak bisa dibatalkan."
    },
    SHIPPED: {
        variant: "SHIPPED",
        title: "Tandai Dikirim",
        confirmLabel: "Tandai Dikirim",
        description: "Apakah Anda yakin ingin menandai pesanan ini sebagai dikirim?. Tindakan ini tidak bisa dibatalkan."
    },
    COMPLETED: {
        variant: "COMPLETED", 
        title: "Tandai Selesai",
        confirmLabel: "Tandai Selesai",
        description: "Apakah Anda yakin ingin menandai pesanan ini sebagai selesai? Tindakan ini akan menyelesaikan transaksi."
    },
    CANCELED: {
        variant: "DELETE",
        title: "Batalkan Pesanan",
        confirmLabel: "Batalkan Pesanan",
        description: "Apakah Anda yakin ingin membatalkan pesanan ini? Tindakan ini tidak dapat dibatalkan."
    }
}
