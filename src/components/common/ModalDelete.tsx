import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import { HiOutlineTrash } from "react-icons/hi2";
import { ClipLoader } from "react-spinners";

type ModalSize = "md" | "lg" | "xl" | "base" | "sm";

interface ModalConfirmProps {
    isOpen: boolean;
    title: string;
    description?: React.ReactNode;
    size?: ModalSize | null;
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

    return (
        <Dialog open={isOpen} onOpenChange={onCancel}>
            <DialogContent className={cn(size && sizeClasses[size], "p-2", className)} onOpenAutoFocus={(e) => e.preventDefault()}>
                <DialogHeader className="px-5 pt-4 flex justify-center items-center mt-2">
                    <div className="bg-red-100 w-12 h-12 rounded-full p-1">
                        <div className="flex justify-center items-center w-full h-full rounded-full bg-red-200 text-red-500">
                            <HiOutlineTrash size={22} />
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
                    className="bg-white hover:bg-accent"
                    >
                        {isLoading ? <ClipLoader size={20} /> : 'Cancel'}
                    </Button>
                    <Button
                    disabled={isLoading}
                    onClick={onConfirm}
                    size="lg"
                    variant="primary"
                    >
                        {isLoading ? <ClipLoader size={20} /> : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}