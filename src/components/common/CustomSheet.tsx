import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

interface CustomSheetProps {
    trigger: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    footer?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void
}

export const CustomSheet = ({
    trigger,
    className,
    title,
    description,
    children,
    side,
    footer,
    open,
    onOpenChange
}: CustomSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side={side} className={cn(className, 'flex flex-col')}>
                {(title || description) && (
                    <SheetHeader>
                        {title && <SheetTitle>{title}</SheetTitle>}
                        {description && <SheetDescription>{description}</SheetDescription>}
                    </SheetHeader>
                )}
                <div className="flex-1">{children}</div>
                {footer && <SheetFooter>{footer}</SheetFooter>}
            </SheetContent>
        </Sheet>
    )
}