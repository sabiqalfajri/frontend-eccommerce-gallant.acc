import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { HiOutlineTrash } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";
import { HiOutlineTruck } from "react-icons/hi2";
import { FiRefreshCcw } from "react-icons/fi";
import { FiCheckCircle } from "react-icons/fi";

type ModalSize = "md" | "lg" | "xl" | "base" | "sm";
export type Variant = "DELETE" | "SHIPPED" | "PROCESSING" | "COMPLETED"

interface ModalConfirmProps {
    isOpen: boolean;
    title: string;
    description?: React.ReactNode;
    size?: ModalSize | null;
    variant: Variant;
    confirmLabel: string;
    cancelLabel?: string;
    isLoading?: boolean;
    disabled?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    className?: string;
}

export const ModalConfirm = ({
    isOpen,
    title,
    description,
    size,
    variant,
    confirmLabel,
    cancelLabel = "Batal",
    isLoading,
    onConfirm,
    onCancel,
    className
}: ModalConfirmProps) => {
    const sizeClasses: Record<ModalSize, string> = {
        md: "w-full !max-w-[42rem] h-fit max-h-[80vh]",
        lg: "w-full !max-w-[62rem] h-full !max-h-[70vh]",
        xl: "max-w-xl max-h-[]",
        base: "w-full !max-w-[30rem]",
        sm: "w-full !max-w-[25rem]"
    };

    const variantWrapperClasses: Record<Variant, string> = {
        DELETE: "bg-red-100 text-red-500",
        SHIPPED: "bg-purple-100 text-purple-600",
        PROCESSING: "bg-sky-100 text-sky-600",
        COMPLETED: "bg-green-100 text-green-600"
    }

    const variantInnerClasses: Record<Variant, string> = {
        DELETE: "bg-red-200",
        SHIPPED: "bg-purple-200",
        PROCESSING: "bg-sky-200",
        COMPLETED: "bg-green-200"
    }

    const defaultIcons: Record<Variant, React.ReactNode> = {
        DELETE: <HiOutlineTrash size={22} />,
        SHIPPED: <HiOutlineTruck size={22} />,
        PROCESSING: <FiRefreshCcw size={22} />,
        COMPLETED: <FiCheckCircle size={22} />
    }

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className={cn(size && sizeClasses[size], "p-2", className)} onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader className="px-5 pt-4 flex justify-center items-center mt-2">
                    <div className={cn(
                        "w-12 h-12 rounded-full p-1",
                        variantWrapperClasses[variant]
                    )}>
                        <div className={cn(
                            "flex justify-center items-center w-full h-full rounded-full",
                            variantInnerClasses[variant]
                        )}>
                            {defaultIcons[variant]}
                            {/* <HiOutlineTrash size={22} /> */}
                        </div>
                    </div>
                    {title && <p className="text-center font-semibold text-[23px]">{title}</p>}
                    <p className="text-sm text-muted-foreground text-center">{description}</p>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-2 px-5 py-2 mt-2 gap-x-3">
                    <Button
                    disabled={isLoading}
                    onClick={onCancel}
                    size="lg"
                    variant="outlinePrimary"
                    className="bg-white hover:bg-gray-100"
                    >
                        {isLoading ? <ClipLoader size={24} /> : cancelLabel}
                    </Button>
                    <Button
                    disabled={isLoading}
                    onClick={onConfirm}
                    size="lg"
                    variant="primary"
                    >
                        {isLoading ? <ClipLoader size={24} color="white" /> : confirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}