export const EmptyEOQ = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-3 text-center my-8">
            <h1 className="font-bold text-[18px]">
                EOQ Belum Dikonfigurasi
            </h1>
            <div className="text-gray-600 text-[13.5px]">
                <p>
                    Untuk melihat perhitungan EOQ dan rekomendasi restock produk,
                </p>
                <p>Silahkan atur parameter EOQ terlebih dahulu.</p>
            </div>
        </div>
    )
}