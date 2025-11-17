import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AddressAccountSkeleton } from "@/components/user/address/AddressAccountSkeleton";
import { CapitalizeText } from "@/helper/CapitalizeText";
import { useAddress } from "@/hooks/address/useAddress";
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress";
import { useSetPrimaryAddress } from "@/hooks/address/useSetPrimaryAddress";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useToken } from "@/hooks/universal/useToken";
import { FaCheck } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const AddressAccount = () => {
    const { token } = useToken();
    const { address, isLoadingAddress, isFetchedAddress } = useAddress(token!);
    const isPrimaryAddress = address?.find(addr => addr.isDefault === true);
    const { setDefaultAddress } = useSetPrimaryAddress(token!);
    const { deleteAddress } = useDeleteAddress(token!);
    const loadingAddress = isLoadingAddress || !isFetchedAddress;
    const smoothLoading = useSmoothLoading(loadingAddress);
    const navigate = useNavigate();

    const handleSetPrimary = async (addressId: string) => {
        await setDefaultAddress(addressId);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex md:flex-wrap justify-between items-center">
                <div className="hidden md:flex md:flex-nowrap gap-x-0.5 w-[45%] border border-gray-200 rounded-md px-2">
                    <div className="flex justify-center items-center pl-1">
                        <IoSearchOutline size={22} />
                    </div>
                    <Input 
                        className="border-none shadow-none focus-visible:ring-0" 
                        placeholder="Search your Address..." 
                    />
                </div>
                <Button onClick={() => navigate('/customer/address/add')} className="w-full md:w-auto">
                    + Add New Address
                </Button>
            </div>
            {smoothLoading ? (
                Array.from({ length: 2 }).map((_, idx) => (
                    <AddressAccountSkeleton key={idx} />
                ))
            ) : address && (
                address.map((addr) => (
                    <div key={addr.id} className="flex flex-col gap-3 border border-gray-300 rounded-md">
                        <div className="flex flex-wrap items-center gap-4 text-[15px] h-12 px-3.5 border-b border-gray-200">
                            <h1 className="font-semibold">{addr.label}</h1>
                            {isPrimaryAddress && isPrimaryAddress.id === addr.id && (
                                <div className="bg-primary rounded-full px-2 py-0.5 text-[13px] h-fit text-white">
                                    Alamat Utama
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[80%_1fr] px-3.5 pb-4 border-b border-gray-200">
                            <div className="flex flex-col gap-px text-[15px]">
                                <h1 className="font-semibold">{addr.recipientName}</h1>
                                <p>{addr.nomor}</p>
                                <p>
                                    {addr.street}, {addr.subdistrict}, {addr.city}, {CapitalizeText(addr.province)}, {""}
                                    {addr.postalCode}
                                </p>
                            </div>
                            {isPrimaryAddress && isPrimaryAddress.id === addr.id ? (
                                <div className="hidden md:flex justify-end items-center px-1 text-primary">
                                    <FaCheck size={23} />
                                </div>
                            ) : (
                                <div className="hidden md:flex justify-end items-center px-1">
                                    <Button className="px-[1.8rem]"
                                    onClick={() => handleSetPrimary(addr.id)}
                                    >
                                        Pilih
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center h-full gap-x-4 px-3.5 pb-3 text-[15px]">
                            <button className="cursor-pointer font-semibold text-primary"
                            onClick={() => navigate(`/customer/address/edit/${addr.id}`)}
                            >
                                Edit
                            </button>
                            {isPrimaryAddress && isPrimaryAddress.id !== addr.id && (
                                <>
                                    <div className="w-px h-5 bg-gray-300"></div>
                                    <button className="cursor-pointer font-semibold text-red-500"
                                    onClick={() => deleteAddress(addr.id)}
                                    >
                                        Delete
                                    </button>
                                    <div className="block md:hidden w-px h-5 bg-gray-300"></div>
                                    <button className="block md:hidden text-primary font-semibold"
                                    onClick={() => handleSetPrimary(addr.id)}
                                    >
                                        Set Primary
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}