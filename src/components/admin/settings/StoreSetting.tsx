import { Button } from "@/components/ui/button"
import { CardDashboard } from "../Card"
import { InputAnimation } from "@/components/common/InputAnimation"
import { AvatarUploader } from "./AvatarUploader"
import { zodResolver } from "@hookform/resolvers/zod"
import { StoreFormValues, StoreSchema } from "@/schema/admin/Settings.schema"
import { useForm } from "react-hook-form"
import { StoreKeys } from "@/types/Settings"
import { useImageUpload } from "@/hooks/universal/useImageUpload"

interface StoreSettingProps {
    defaultValues: StoreFormValues;
    onSubmit: (data: StoreFormValues) => void;
}

export const StoreSettings = ({
    defaultValues,
    onSubmit,
}: StoreSettingProps) => {
    const { previewUrl, handleUpload, reset } = useImageUpload();
    const { register, handleSubmit, watch } = useForm<StoreFormValues>({
        resolver: zodResolver(StoreSchema),
        defaultValues,
    });

    const values = watch();

    const storeFields: { id: StoreKeys; label: string; type?: string }[][] = [
        [
            { id: 'storeName', label: 'StoreName' },
            { id: 'phone', label: 'Phone' },
        ],
        [
            { id: 'country', label: 'Country' },
            { id: 'province', label: 'Province' },
        ],
        [
            { id: 'city', label: 'City' },
            { id: 'district', label: 'District' },
        ],
        [
            { id: 'street', label: 'Street' },
            { id: 'postalCode', label: 'Postal Code' },
        ],
    ]

    return (
        <CardDashboard title="Store Settings" description="Update your store">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
                    <AvatarUploader 
                        inputId="store-file" 
                        imageUrl={previewUrl} 
                        onUpload={handleUpload}
                        onReset={reset}
                    />
                    <div className="flex flex-col gap-y-4 pl-4 border-l border-gray-200">
                        {storeFields.map((row, rowIdx) => (
                            <div className="grid grid-cols-2 gap-x-4" key={rowIdx}>
                                {row.map((field) => {
                                    const key = field.id as keyof StoreFormValues;

                                    return (
                                        <InputAnimation
                                            id={field.id}
                                            type={field.type || "text"}
                                            label={field.label}
                                            {...register(key)}
                                            value={values[key] ?? ""}
                                        />
                                    )
                                })}
                            </div>
                        ))}
                    </div> 
                </div>
                <div className="flex justify-end items-end mt-5">
                    <div className="grid grid-cols-2 gap-x-3">
                        <Button variant="outlinePrimary">
                            Cancel
                        </Button>
                        <Button>
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </CardDashboard>
    )
}