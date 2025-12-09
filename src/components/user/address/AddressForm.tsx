import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AddressInput, createAddressSchema } from "@/schema/Address.schema"
import { AccountAddressKeys, Address } from "@/types/Address"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"

interface AddressFormProps {
    mode: 'create' | 'edit';
    defaultValues?: Address;
    onSubmit: (data: AddressInput) => Promise<void>;
    isSubmitting?: boolean
    isLoading?: boolean
}

export const AddressForm = ({
    mode,
    defaultValues,
    onSubmit,
    isSubmitting,
    isLoading
}: AddressFormProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<AddressInput>({
        resolver: zodResolver(createAddressSchema) as any,
        defaultValues: {}
    });
    const disabled = isSubmitting || isLoading
   
    const accountAddressFields: { id: AccountAddressKeys; label: string; placeholder?: string, type?: string | number }[] = [
        { 
            id: 'label',
            label: 'Label Alamat',
            placeholder: 'Contoh: Rumah, Kantor'
        },
        { 
            id: 'recipientName',
            label: 'Nama Penerima',
            placeholder: 'Nama Penerima'
        },
        { 
            id: 'nomor',
            label: 'No Hp',
            placeholder: 'No Telepon'
        },
        { 
            id: 'province',
            label: 'Provinsi',
            placeholder: 'Provinsi'
        },
        { 
            id: 'city',
            label: 'Kota/Kabupaten',
            placeholder: 'Kota atau Kabupaten'
        },
        { 
            id: 'district',
            label: 'Kecamatan',
            placeholder: 'Kecamatan'
        },
        { 
            id: 'subdistrict',
            label: 'Kelurahan',
            placeholder: 'Kelurahan'
        },
        { 
            id: 'postalCode',
            label: 'Kode Pos',
            placeholder: 'Kode Pos'
        },
        { 
            id: 'street',
            label: 'Nama Jalan',
            placeholder: 'Nama jalan, Gedung'
        },
        { 
            id: 'intructions',
            label: 'Intruksi',
            placeholder: 'Intruksi Pengiriman (opsional)'
        },
    ]

    const handleFormSubmit = async (data: AddressInput) => {
        await onSubmit(data)
    }

    useEffect(() => {
        if(defaultValues) {
            reset({
                label: defaultValues.label,
                recipientName: defaultValues.recipientName,
                nomor: defaultValues.nomor,
                province: defaultValues.province,
                city: defaultValues.city,
                district: defaultValues.district,
                subdistrict: defaultValues.subdistrict,
                postalCode: defaultValues.postalCode,
                street: defaultValues.street,
                intructions: defaultValues.intructions || "",
            })
        }
    }, [defaultValues])

    return (
        <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-5 border border-gray-300 py-3 px-3.5 rounded-md"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {accountAddressFields.map((field) => (
                    <div key={field.id} className="flex flex-col gap-2.5">
                        <Label>
                            {field.label}
                        </Label>
                        <div className="flex flex-col gap-0.5">
                            <Input 
                                disabled={disabled}
                                placeholder={isLoading ? "Loading..." : field.placeholder} 
                                {...register(field.id)}
                            />
                            {errors[field.id] && <p className="text-red-500 text-[13px] mt-1">{errors[field.id]?.message}</p>}
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-end items-center gap-2">
                <Button variant="outlinePrimary"
                disabled={isSubmitting}
                type="button"
                >
                    Batal
                </Button>
                <Button variant="primary"
                disabled={isSubmitting}
                type="submit"
                className="w-32"
                >
                    {isSubmitting ? 
                        <ClipLoader size={24} color="white" />
                        : mode === 'create' ? 'Tambah Alamat' : 'Simpan Alamat'
                    }
                </Button>
            </div>
        </form>
    )
}