import { AddressForm } from "@/components/user/address/AddressForm"
import { useCreateAddress } from "@/hooks/address/useCreateAddress";
import { useToken } from "@/hooks/universal/useToken";
import { AddressInput } from "@/schema/Address.schema";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useSearchParams } from "react-router-dom";

export const AddAddressAccount = () => {
    const { token } = useToken();
    const { createAddress, isCreatingAddress } = useCreateAddress(token!);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get("redirect") || "/customer/address"

    const onSubmit = async (data: AddressInput) => {
        await createAddress(data);
        navigate(redirect);
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
                <button className="flex justify-center items-center border border-gray-200 rounded-md w-8 h-8 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate('/customer/address')}
                >
                    <IoIosArrowBack size={20} />
                </button>
                <h1 className="font-semibold">Tambah Alamat</h1>
            </div>
            <AddressForm 
                mode="create"
                onSubmit={onSubmit}
                isSubmitting={isCreatingAddress}
            />
        </div>
    )
}