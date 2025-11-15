import { Button } from "@/components/ui/button"
import { CardDashboard } from "../Card"
import { InputAnimation } from "@/components/common/InputAnimation"
import { AvatarUploader } from "./AvatarUploader"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountFormValues, AccountSchema } from "@/schema/admin/Settings.schema";
import { AccountKeys } from "@/types/Settings";
import { useImageUpload } from "@/hooks/universal/useImageUpload";

interface AccountSettingProps {
    defaultValues: AccountFormValues;
    onSubmit: (data: AccountFormValues) => void;
}

export const AccountSetting = ({
    defaultValues,
    onSubmit,
}: AccountSettingProps) => {
    const { previewUrl, handleUpload, reset } = useImageUpload();
    const { register, handleSubmit, watch } = useForm<AccountFormValues>({
        resolver: zodResolver(AccountSchema),
        defaultValues,
    });

    const values = watch();

    const accountFields: { id: AccountKeys; label: string; type?: string }[][] = [
        [
            { id: 'firstName', label: 'FirstName' },
            { id: 'lastName', label: 'LastName' },
        ],
        [
            { id: 'phoneNumber', label: 'PhoneNumber' },
            { id: 'email', label: 'Email', type: 'email' },
        ],
        [
            { id: 'birthOfDate', label: 'Birth of Date' },
            { id: 'password', label: 'Password', type: 'password' },
        ],
    ]

    return (
        <CardDashboard title="Account Settings" description="Update your account">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
                    <AvatarUploader 
                        inputId="account-file" 
                        imageUrl={previewUrl} 
                        onUpload={handleUpload}
                        onReset={reset}
                    />
                    <div className="flex flex-col gap-y-4 pl-4 border-l border-gray-200">
                        {accountFields.map((row, rowIdx) => (
                            <div className="grid grid-cols-2 gap-x-4" key={rowIdx}>
                                {row.map((field) => {
                                    const key = field.id as keyof AccountFormValues;

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