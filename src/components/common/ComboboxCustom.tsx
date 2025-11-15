import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "../ui/command";
import { cn } from "../lib/utils";
import { ClipLoader } from "react-spinners";

interface ComboboxCustomProps {
    options: { label: string; value: string }[];
    value?: string;
    onChange: (value: string) => void;
    className?: string;
    isLoading?: boolean;
    placeholder?: string;
    contentClassName?: string;
}

export const ComboboxCustom = ({
    options,
    value,
    onChange,
    className,
    isLoading,
    placeholder = "Select an option",
    contentClassName
}: ComboboxCustomProps) => {
    const [open, setOpen] = useState(false);
    const selectedLabel = options.find((option) => option.value === value)?.label;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    disabled={isLoading}
                    className={cn("w-full justify-between font-normal", className)}
                >
                    {isLoading ? (
                        <div className="flex flex-wrap gap-x-3">
                            <ClipLoader size={18} color="#555" />
                            <p>Loading...</p>
                        </div>
                    ) : selectedLabel ? (
                        selectedLabel
                    ) : (
                        placeholder
                    )}
                    {!isLoading && <ChevronDown className="ml-2" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent 
            align="start"
            sideOffset={4}
            className={cn("min-w-(--radix-popover-trigger-width) p-0", contentClassName)}
            >
                <Command>
                    <CommandList>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === value ? "" : currentValue;
                                        onChange(newValue);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}