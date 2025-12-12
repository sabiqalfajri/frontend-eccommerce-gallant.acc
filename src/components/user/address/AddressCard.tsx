import { Address } from "@/types/Address";
import { SiGooglemaps } from "react-icons/si"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "@/hooks/universal/useWindowSize";

interface AddressCardProps {
    address: Address[]
}

export const AddressCard = ({
    address
}: AddressCardProps) => {
    const addressIsPrimary = address.find(addr => addr.isDefault === true);
    const navigate = useNavigate();
    const redirect = '/customer/address'
    const { isMobile } = useWindowSize()

    return (
        <div className="grid grid-cols-[90%_1fr] select-none items-center mt-3 border-b border-gray-200 pb-3 text-sm md:text-[15px] gap-3 md:gap-0 cursor-pointer md:cursor-auto"
        onClick={() => isMobile && navigate(redirect)}
        >
            <div className="flex flex-nowrap gap-2 items-center pr-2">
                <SiGooglemaps className="text-primary flex shrink-0 text-lg md:text-[20px]" />
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
            </div>
            <button className="hidden md:block px-3 py-1 cursor-pointer border border-gray-300 rounded-md text-sm font-semibold"
            onClick={() => navigate(redirect)}
            >
                Ubah
            </button>
            <div className="block md:hidden">
                <MdOutlineKeyboardArrowRight size={20} />
            </div>
        </div>
    )
}