import { AddressForm } from "@/components/user/address/AddressForm"
import { useAddressById } from "@/hooks/address/useAddressById";
import { useUpdateAddress } from "@/hooks/address/useUpdateAddress";
import { useSmoothLoading } from "@/hooks/universal/useSmoothLoading";
import { useToken } from "@/hooks/universal/useToken";
import { AddressInput } from "@/schema/Address.schema";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

export const EditAddressAccount = () => {
    const { token } = useToken();
    const { id } = useParams<{ id: string }>();
    const { addressById, isLoadingAddressById, isFetchedAddressById } = useAddressById(token!, id!)
    const { updateAddress, isUpdatingAddress } = useUpdateAddress(token!, id!);
    const loadingAddressForm = isLoadingAddressById || !isFetchedAddressById;
    const smoothLoading = useSmoothLoading(loadingAddressForm, 200);
    const navigate = useNavigate();

    const onSubmit = async (data: AddressInput) => {
        if(!id) return;
        await updateAddress(data)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
                <button className="flex justify-center items-center border border-gray-200 rounded-md w-8 h-8 cursor-pointer hover:bg-gray-100"
                onClick={() => navigate('/customer/address')}
                >
                    <IoIosArrowBack size={20} />
                </button>
                <h1 className="font-semibold">Edit Address</h1>
            </div>
            {/* {smoothLoading ? (
                <div>loading...</div>
            ) : ( */}
                <AddressForm 
                    mode="edit"
                    onSubmit={onSubmit}
                    isSubmitting={isUpdatingAddress}
                    defaultValues={addressById}
                    isLoading={smoothLoading}
                />
           
        </div>
    )
}