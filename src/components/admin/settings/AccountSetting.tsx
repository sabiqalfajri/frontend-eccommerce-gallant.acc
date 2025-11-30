import { Button } from "@/components/ui/button"
import { CardDashboard } from "../Card"
import { InputAnimation } from "@/components/common/InputAnimation"
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useImageUpload } from "@/hooks/universal/useImageUpload";
import { ComboboxCustom } from "@/components/common/ComboboxCustom";
import { DateInput } from "@/components/common/DateInput";
import { useEffect } from "react";
import { AccountUserKeys, CurrentUser } from "@/types/User";
import { AccountUserFormValues, AccountUserSchema } from "@/schema/User.schema";
import { Label } from "@/components/ui/label";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";

interface AccountSettingProps {
    defaultValues: CurrentUser;
    onSubmit: (data: AccountUserFormValues) => void;
    loadingSubmit?: boolean;
}

export const AccountSetting = ({
    defaultValues,
    onSubmit,
    loadingSubmit
}: AccountSettingProps) => {
    const { previewUrl, handleUpload, reset: resetImage  } = useImageUpload();
    const { register, handleSubmit, formState: { errors }, watch, reset, control } = useForm<AccountUserFormValues>({
        resolver: zodResolver(AccountUserSchema),
        defaultValues: defaultValues ?? undefined
    });

    const values = watch();

    const accountFields: { id: AccountUserKeys; label: string; type?: string }[][] = [
        [
            { id: 'name', label: 'Name' },
            { id: 'email', label: 'Email', type: 'email' },
        ],
        [
            { id: 'phone', label: 'PhoneNumber' },
            { id: 'country', label: 'Country' },
        ],
        [
            { id: 'birthDate', label: 'Date of Birth' },
            { id: 'gender', label: 'Gender'},
        ],
    ]

    const optionsGender = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
    ]

    useEffect(() => {
        if(defaultValues) {
            reset({
                ...defaultValues,
                birthDate: defaultValues.birthDate 
                ? new Date(defaultValues.birthDate).toISOString().split("T")[0]
                : undefined
            })
        }
    }, [defaultValues])

    const handleCancel = () => {
        if(defaultValues) reset(defaultValues)
        resetImage();
    }

    return (
        <CardDashboard title="Account Settings" description="Update your account">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5">
                    <div className="flex items-center justify-center">
                        <div className="relative bg-gray-200 w-24 h-24 md:h-32 md:w-32 rounded-full overflow-hidden mx-auto md:mx-0">
                            <div className="w-full h-full bg-gray-200 rounded-full">
                                <img 
                                src={previewUrl ?? defaultValues.image}
                                className="w-full h-full rounded-full object-cover" alt="" />
                            </div>
                            <div className="absolute flex text-white py-1 justify-center items-center bottom-0 w-full bg-black/40">
                                <Label htmlFor="img-profile" className="cursor-pointer">
                                    <CiEdit size={21} />
                                </Label>
                                <Input
                                    id="img-profile"
                                    type="file" 
                                    className="hidden" 
                                    onChange={(e) => handleUpload(e.target.files)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 pl-4 border-transparent md:border-l md:border-gray-200">
                        {accountFields.map((row, rowIdx) => (
                            <div className="grid grid-cols-2 gap-x-4" key={rowIdx}>
                                {row.map((field) => {
                                    const key = field.id as keyof AccountUserFormValues;

                                    if(field.id === 'birthDate') {
                                        return (
                                            <div key={field.id}>
                                                <Controller 
                                                    control={control}
                                                    name="birthDate"
                                                    render={({ field }) => (
                                                        <DateInput
                                                            value={field.value}
                                                            onChange={(value) => field.onChange(value)}
                                                            className="w-full"
                                                        />
                                                    )}
                                                />
                                            </div>
                                        )
                                    }
                                    if(field.id === 'gender') {
                                        return (
                                            <div key={field.id}>
                                                <Controller
                                                    control={control}
                                                    name="gender"
                                                    render={({ field }) => (
                                                        <ComboboxCustom
                                                            options={optionsGender}
                                                            className="w-full"
                                                            value={field.value}
                                                            contentClassName="!w-full !max-w-none"
                                                            onChange={(value) => field.onChange(value)}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        )
                                    }

                                    return (
                                        <div className="flex flex-col gap-0.5">
                                            <InputAnimation
                                                id={field.id}
                                                type={field.type || "text"}
                                                label={field.label}
                                                readOnly={field.id === 'email'}
                                                {...register(key)}
                                                value={values[key] ?? ""}
                                            />
                                            {errors[field.id] && <p className="text-red-500 text-[13px] mt-1">{errors[field.id]?.message}</p>}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div> 
                </div>
                <div className="flex justify-end items-end mt-5">
                    <div className="grid grid-cols-2 gap-x-3 w-full md:w-auto">
                        <Button variant="outlinePrimary"
                        onClick={handleCancel}
                        type="button"
                        >
                            Cancel
                        </Button>
                        <Button 
                        type="submit"
                        disabled={loadingSubmit}
                        className="w-auto md:w-[7.8rem]"
                        >
                            {loadingSubmit ? <ClipLoader size={24} color="white" /> : 'Save Changes'}
                        </Button>
                    </div>
                </div>
            </form>
        </CardDashboard>
    )
}