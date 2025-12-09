import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CiEdit } from "react-icons/ci";
import { useImageUpload } from "@/hooks/universal/useImageUpload";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { useToken } from "@/hooks/universal/useToken";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { AccountUserFormValues, AccountUserSchema } from "@/schema/User.schema";
import { AccountUserKeys } from "@/types/User";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useUpdatedUser } from "@/hooks/user/useUpdatedUser";
import { ClipLoader } from "react-spinners";
import { DateInput } from "@/components/common/DateInput";
import { ComboboxCustom } from "@/components/common/ComboboxCustom";

export const ProfileAccount = () => {
    const { previewUrl, file, handleUpload, reset: resetImage } = useImageUpload();
    const { currentUser } = useCurrentUser();
    const { token } = useToken();
    const { user } = useUser();
    const { updateUser, isUpdating } = useUpdatedUser(token!);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isBusy = isSubmitting || isUpdating
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<AccountUserFormValues>({
        resolver: zodResolver(AccountUserSchema),
        defaultValues: currentUser ?? undefined
    });

    useEffect(() => {
        if(currentUser) {
            reset({
                ...currentUser,
                birthDate: currentUser.birthDate 
                ? new Date(currentUser.birthDate).toISOString().split("T")[0]
                : undefined
            })
        }
    }, [currentUser])

    const accountUserFields: { id: AccountUserKeys; label: string; type?: string }[] = [
        { 
            id: 'email',
            label: 'Email'
        },
        { 
            id: 'name',
            label: 'Nama'
        },
        { 
            id: 'phone',
            label: 'Nomor Telepon'
        },
        { 
            id: 'birthDate',
            label: 'Tanggal Lahir'
        },
        { 
            id: 'gender',
            label: 'Gender'
        },
        { 
            id: 'country',
            label: 'Negara'
        },
    ]

    const optionsGender = [
        { label: 'Male', value: 'MALE' },
        { label: 'Female', value: 'FEMALE' },
    ]

    const onSubmit = async (data: AccountUserFormValues) => {
        try {
            setIsSubmitting(true);

            if(file && user) {
                await user.setProfileImage({ file })
            }

            await updateUser(data)
        } catch (error) {
            
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleCancel = () => {
        if(currentUser) reset(currentUser)
        resetImage();
    }

    return (
        <div className="flex flex-col gap-5 border border-gray-300 py-3 px-3.5 rounded-md">
            <div className="relative bg-gray-200 w-24 h-24 rounded-full overflow-hidden mx-auto md:mx-0">
                <img 
                src={previewUrl ?? currentUser?.image}
                className="w-full h-full rounded-full object-cover" alt="" />
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
            <form 
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {accountUserFields.map((field) => {
                        if(field.id === 'birthDate') {
                            return (
                                <div key={field.id} className="flex flex-col gap-2.5">
                                    <Label>
                                        {field.label}
                                    </Label>
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
                                <div key={field.id} className="flex flex-col gap-2.5">
                                    <Label>
                                        {field.label}
                                    </Label>
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
                                                placeholder="Pilih opsi"
                                            />
                                        )}
                                    />
                                </div>
                            )
                        }

                        return (
                            <div key={field.id} className="flex flex-col gap-2.5">
                                <Label>
                                    {field.label}
                                </Label>
                                <div className="flex flex-col gap-0.5">
                                    <Input 
                                        readOnly={field.id === 'email'}
                                        {...register(field.id)}
                                    />
                                    {errors[field.id] && <p className="text-red-500 text-[13px] mt-1">{errors[field.id]?.message}</p>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="grid grid-cols-2 md:flex md:justify-end items-center flex-wrap gap-x-3 mt-1">
                    <Button 
                    type="button"
                    variant="outlinePrimary"
                    onClick={handleCancel}
                    className="w-full md:w-20"
                    disabled={isBusy}
                    >
                        Batal
                    </Button>
                    <Button
                    type="submit"
                    className="w-full md:w-[18%]"
                    disabled={isBusy}
                    >
                        {isBusy ? (
                            <ClipLoader size={24} color="white" />
                        ) : 'Simpan'}
                    </Button>
                </div>
            </form>
        </div>
    )
}