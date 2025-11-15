import { Select, SelectItem, SelectContent, SelectGroup, SelectTrigger, SelectValue } from "../ui/select";
import clsx from "clsx";

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    selectLabel: string;
    options?: { label: string, value: string }[]
}

export const SelectCustom = ({
    value,
    onChange,
    className,
    selectLabel,
    options
}: SelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className={clsx ('w-[150px] bg-white border-0 cursor-pointer', className)}>
                <SelectValue placeholder="select" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}