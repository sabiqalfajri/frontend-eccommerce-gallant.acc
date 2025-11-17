import { Address } from "@/types/Address";
import { SiGooglemaps } from "react-icons/si"

interface AddressCardProps {
    address: Address[]
}

export const AddressCard = ({
    address
}: AddressCardProps) => {
    const addressIsPrimary = address.find(addr => addr.isDefault === true);

    return (
        <div className="grid grid-cols-[5%_95%] items-center mt-3 border-b border-gray-200 pb-3 text-sm md:text-[15px] gap-3 md:gap-0">
            <SiGooglemaps size={23} className="text-primary" />
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-col">
                    {!address.length || !addressIsPrimary ? (
                        <>
                            <p className="font-semibold">
                                Alamat Pengiriman
                            </p>
                            <p className="text-sm line-clamp-2">
                                Tambahkan alamat pengiriman
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold">
                                {addressIsPrimary.label} • {addressIsPrimary.recipientName}
                            </p>
                            <p className="text-sm line-clamp-2">
                                {addressIsPrimary.street}, {addressIsPrimary.district}, {""}{addressIsPrimary.city}, {""} 
                                {addressIsPrimary.province}, {addressIsPrimary.postalCode}
                            </p>
                        </>
                    )}
                </div>
                {/* icon change */}
                <button className="hidden md:block px-2.5 py-0.5 cursor-pointer border border-gray-300 rounded-md text-sm font-semibold">
                    Change
                </button>
            </div>
        </div>
    )
}