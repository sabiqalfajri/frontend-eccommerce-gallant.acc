import { ImageUploadSingleSchema } from "@/schema/Image.schema";
import { showError } from "@/utils/Toast";
import { useState } from "react";

export const useImagesUpload = (MAX_FILES = 6, defaultImages: string[] = []) => {
    const [previewUrls, setPreviewUrls] = useState<string[]>(defaultImages);
    const [files, setFiles] = useState<File[]>([]);
    const [deletedImages, setDeletedImages] = useState<string[]>([])

    const handleUploads = (fileList: FileList | null, input?: HTMLInputElement | null) => {
        if(!fileList) return;

        const selectedFiles = Array.from(fileList);
        const existingNames = new Set(files.map(f => f.name));

        if (files.length + selectedFiles.length > MAX_FILES) {
            showError(`You can upload up to ${MAX_FILES} images only.`);
            return;
        }

        const validFiles: File[] = [];
        const validPreviews: string[] = [];

        for (const file of selectedFiles) {
            if(existingNames.has(file.name)) return;

            const result = ImageUploadSingleSchema.safeParse(file);
            if (!result.success) {
                showError(result.error.issues[0].message);
                continue;
            }

            validFiles.push(file);
            validPreviews.push(URL.createObjectURL(file));
        }

        setFiles((prev) => [...prev, ...validFiles]);
        setPreviewUrls((prev) => [...prev, ...validPreviews])

        if(input) input.value = "";
    };

    const removeImage = (index: number, existing?: boolean) => {
        URL.revokeObjectURL(previewUrls[index]);

        setFiles((prev) => prev.filter((_, i) => i !== index));
        setPreviewUrls((prev) => {
            const removed = prev[index];
            const newPreviews = prev.filter((_, i) => i !== index);

            if(existing) {
                setDeletedImages((prevDeleted) => [...prevDeleted, removed])
            } else {
                setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
            };

            return newPreviews
        });
    };

    const reset = () => {
        setFiles([]);
        setPreviewUrls([]);
    }

    return {
        previewUrls,
        setPreviewUrls,
        files,
        handleUploads,
        removeImage,
        deletedImages,
        setDeletedImages,
        reset
    }
}