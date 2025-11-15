import { InputHTMLAttributes, useState } from "react";
import { Label } from "../ui/label"
import clsx from "clsx";

interface InputAnimationProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

export const InputAnimation = ({
    id,
    label,
    ...props
}: InputAnimationProps) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={clsx ('relative h-10')}>
            <input
                className="peer block w-full rounded-md border h-full border-gray-300 px-3 text-sm focus:border-[#e26df2] focus:ring-[#e26df2] focus:outline-none"
                type="text"
                {...props}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                id={id}
                name={props.name ?? id}
                placeholder=""
            />
            <Label 
                htmlFor={id}
                className={`absolute left-2 cursor-text text-gray-400 text-sm transition-all bg-white px-1
                ${isFocused || props.value?.toString().length
                ? "-top-2.5 translate-y-0 text-[13px] text-pink-400"
                : "top-1/2 -translate-y-1/2 text-sm text-gray-400"
                }`}
            >
                {label}
            </Label>
        </div>
    )
}