import { ImageUploadSingleSchema } from "@/schema/Image.schema";
import { showError } from "@/utils/Toast";
import { useState } from "react"

export const useImageUpload = () => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>();
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = (files: FileList | null) => {
        if(!files) return;
        const selectedFile = files[0];

        const result = ImageUploadSingleSchema.safeParse(selectedFile);
        if(!result.success) {
            showError(result.error.issues[0].message);
            return;
        }

        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
    }

    const reset = () => {
        setFile(null);
        setPreviewUrl(undefined)
    };

    return {
        previewUrl,
        setPreviewUrl,
        file,
        handleUpload,
        reset,
    }
}