import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CiEdit } from "react-icons/ci";

interface AvatarUploaderProps {
    imageUrl?: string;
    onUpload: (files: FileList | null) => void;
    onReset: () => void
    inputId: string
}

export const AvatarUploader = ({
    imageUrl,
    onUpload,
    onReset,
    inputId
}: AvatarUploaderProps) => {

    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="relative bg-gray-200 w-24 h-24 md:h-32 md:w-32 rounded-full overflow-hidden mx-auto md:mx-0">
                <div className="w-full h-full bg-gray-200 rounded-full">
                    {imageUrl && <img src={imageUrl} className="h-full w-full rounded-full object-cover" />}
                </div>
                <div className="absolute flex text-white py-1 justify-center items-center bottom-0 w-full bg-black/40">
                    <Label htmlFor={inputId} className="cursor-pointer">
                        <CiEdit size={21} />
                    </Label>
                    <Input 
                    id={inputId} 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => onUpload(e.target.files)}
                    />
                </div>
            </div>
            {/* <div className="flex flex-wrap gap-x-3">
                <Label 
                htmlFor={inputId}
                className="bg-primary text-white rounded-md px-4 cursor-pointer"
                >
                    Upload
                </Label>
                <Input 
                id={inputId}
                type="file"
                className="hidden"
                onChange={(e) => onUpload(e.target.files)}
                    />
                <Button type="button" onClick={onReset}>Delete</Button>
            </div> */}
        </div>
    )
}