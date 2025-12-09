import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InputPasswordProps {
    id: string;
    placeholder?: string
    label?: string;
    value?: string;
    error?: string;
    register?: any;
}

export const InputPassword = ({
    id,
    placeholder = "Enter your password",
    label,
    value,
    error,
    register

}: InputPasswordProps) => {
    const [show, setShow] = useState(false);
    const toggleShow = () => setShow(prev => !prev)

    return (
        <div>
            <div className="flex flex-col space-y-1.5 relative">
                <Label htmlFor={id}>{label}</Label>
                <Input
                className="h-10 placeholder:text-sm" 
                id={id} 
                placeholder={placeholder}
                type={show ? "text" : "password"}
                {...(register ? register(id) : {})}
                />
                <div className="absolute left-[90%] bottom-[1.2rem] cursor-pointer bg-amber-50">
                    {value && value.length > 0 && (
                    <span 
                    onClick={toggleShow}>
                        {show  ? (
                            <Eye className="w-4 h-4 text-gray-500" />
                        ) : (
                            <EyeOff className="w-4 h-4 text-gray-500" />
                        )}
                    </span> 
                    )}
                </div>
            </div>
            <div className="px-1 -mt-px">
                {error && <span className="text-red-500 text-xs">{error}</span>}
            </div>
        </div>
    )
}