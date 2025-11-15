import { AccountSetting } from "@/components/admin/settings/AccountSetting";
import { StoreSettings } from "@/components/admin/settings/StoreSetting";
import { AccountFormValues, StoreFormValues } from "@/schema/admin/Settings.schema";
import { useState } from "react"

export const SettingsDashboard = () => {
    const [accountState, setAccountState] = useState<AccountFormValues>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        birthOfDate: "",
        password: "",
    })
    
    const [storeState, setStoreState] = useState<StoreFormValues>({
        storeName: "",
        phone: "",
        country: "",
        province: "",
        city: "",
        district: "",
        street: "",
        postalCode: "",
    });

    const handleSubmitAccount = () => {

    }

    const handleSubmitStore = () => {

    }

    return (
        <div className="flex flex-col gap-y-6">
            <StoreSettings
                defaultValues={storeState}
                onSubmit={handleSubmitStore}
             />

            <AccountSetting 
                defaultValues={accountState}
                onSubmit={handleSubmitAccount}
            />
        </div>
    )
}