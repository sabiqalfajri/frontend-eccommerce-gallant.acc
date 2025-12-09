import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils";
import { IoCalendarOutline } from "react-icons/io5";
import { Calendar } from "../ui/calendar";

interface DateInputProps {
    value?: string | undefined;
    onChange: (value: string  | undefined) => void;
    className?: string;
    contentClassName?: string;
}

export const DateInput = ({
    value,
    onChange,
    className,
    contentClassName
}: DateInputProps) => {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date  | undefined>(
        value ? new Date(value) : undefined
    );

    useEffect(() => {
        if(value) setDate(new Date(value));
        else setDate(undefined);
    }, [value])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    id="date"
                    aria-expanded={open}
                    className={cn("w-full justify-between font-normal", className)}
                >
                    {date ? date.toLocaleDateString() : "Pilih tanggal"}
                    <IoCalendarOutline size={19} />
                </Button>
            </PopoverTrigger>
            <PopoverContent
            align="start"
            sideOffset={4}
            className={cn("min-w-(--radix-popover-trigger-width) p-0", contentClassName)}
            >
                <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                        setDate(date)
                        onChange(date ? date.toISOString().split("T")[0] : undefined);
                        setOpen(false)
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}