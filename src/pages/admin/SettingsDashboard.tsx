import { AccountSetting } from "@/components/admin/settings/AccountSetting";
import { useImageUpload } from "@/hooks/universal/useImageUpload";
import { useToken } from "@/hooks/universal/useToken";
import { useCurrentUser } from "@/hooks/user/useCurrentUser";
import { useUpdatedUser } from "@/hooks/user/useUpdatedUser";
import { AccountUserFormValues } from "@/schema/User.schema";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react"

export const SettingsDashboard = () => {
    const { currentUser } = useCurrentUser();
    const { token } = useToken();
    const { file  } = useImageUpload();
    const { user } = useUser();
    const { updateUser, isUpdating } = useUpdatedUser(token!);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isBusy = isSubmitting || isUpdating

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

    return (
        <div className="flex flex-col gap-y-6">
            {currentUser && (
                <AccountSetting 
                    defaultValues={currentUser}
                    onSubmit={onSubmit}
                    loadingSubmit={isBusy}
                />
            )}
        </div>
    )
}