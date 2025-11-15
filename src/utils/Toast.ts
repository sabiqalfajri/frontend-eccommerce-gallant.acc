import { toast } from "sonner";

export const showSuccess = (message: string) => {
    toast(message, {
        className: "",
        duration: 3000
    })
}

export const showError = (message: string) => {
    toast.error(message, {
        style: {
            backgroundColor: '#F24F62',
            color: '#ffffff'
        },
        duration: 2500,
    })
}

export const showInfoWithAction = (message: string) => {
    toast(message, {
        style: {},
        className: '!bg-[#2E3137] !text-[#ffffff]',
        action: {
            label: 'Oke',
            onClick: () => {
                toast.dismiss();
            }
        },
        duration: 3000
    })
}

export const showInfo = (message: string) => {
    toast(message, {
        style: {},
        className: 'text-sm !bg-[#2E3137] !text-[#ffffff]',
        duration: 3000
    })
}

export const showWarning = (message: string) => {
    toast(message, {
        className: "",
        duration: 3000
    })
}