import Empty from "@/assets/Empty.svg"

export const EmptyProducts = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <img 
                src={Empty}
                alt="No products"
                className="w-40 h-auto object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800">
                Produk tidak ditemukan
            </h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xs">
                Coba ubah filter atau rentang harga untuk melihat produk lainnya.
            </p>
        </div>
    );
};