import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            <div className="h-32 w-32 bg-gray-200 rounded-full">
                {imageUrl && <img src={imageUrl} className="h-full w-full rounded-full object-cover" />}
            </div>
            <div className="flex flex-wrap gap-x-3">
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
            </div>
        </div>
    )
}