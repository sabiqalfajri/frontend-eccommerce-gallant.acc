import { Button } from "@/components/ui/button"
import { IoIosArrowBack } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { CardDashboard } from "../Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/hooks/universal/useImageUpload";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { CreateCategoryFormValues, createCategorySchema, EditCategoryFormValues, editCategorySchema } from "@/schema/admin/CategorySchema";
import { HiOutlineTrash } from "react-icons/hi";
import { showError } from "@/utils/Toast";
import { useWindowSize } from "@/hooks/universal/useWindowSize";

type CategoryFormProps = 
    | {
        mode: 'create';
        onSubmit: (
            data: CreateCategoryFormValues & {
            file: File
        }) => Promise<void>;
        isSubmitting?: boolean
      }
    | {
        mode: 'edit';
        categoryData: {
            id: string;
            name: string;
            description?: string | undefined;
            image: string
        } | undefined
        onSubmit: (
            data: EditCategoryFormValues
        ) => Promise<void>;
        isSubmitting?: boolean
      }


export const CategoryForm = (props: CategoryFormProps) => {
    const navigate = useNavigate();
    const { isMobile } = useWindowSize();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    const { mode, onSubmit, isSubmitting } = props
    const isCreate = mode === "create";
    const schema = isCreate 
        ? createCategorySchema
        : editCategorySchema
    const categoryData = mode === 'edit' ? props.categoryData : null

    const { 
        previewUrl, 
        handleUpload, 
        file, 
        reset: resetImage, 
        setPreviewUrl 
    } = useImageUpload();

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<CreateCategoryFormValues | EditCategoryFormValues>({
        resolver: zodResolver(schema) as any,
    });
    const description = watch('description') || "";
    const maxLengthDescription = 500;

    useEffect(() => {
        if(!categoryData) return;

        reset({
            name: categoryData.name,
            description: categoryData.description ?? ""
        })

        setPreviewUrl(categoryData.image)
    }, [categoryData]);

    const handleFormSubmit = async (
        data: CreateCategoryFormValues | EditCategoryFormValues
    ) => {
        if(mode === 'create') {
            if(!file) {
                showError("Silakan unggah gambar kategori.");
                return;
            }

            await onSubmit({
                ...(data as CreateCategoryFormValues),
                file
            });
            return
        };
        
        await onSubmit({
            ...(data as EditCategoryFormValues),
            ...(file && { file })
        })
    }

    const wrapperButton = (
        <div className="grid grid-cols-2 md:flex md:flex-wrap gap-x-2">
            <Button 
            type="button" 
            size="lg"
            variant="outlinePrimary">
                Batal
            </Button>
            <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="w-auto md:w-28"
            size="lg"
            >
                {isSubmitting ? 
                    <ClipLoader size={24} color="white" />
                    : mode === 'create' ? 'Tambah' : 'Simpan'
                }
            </Button>
        </div>
    )

    return (
        <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-y-6"
        >
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-wrap items-center gap-x-3">
                    <button 
                    type="button"
                    className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                    onClick={() => navigate('/dashboard/categories')}
                    >
                        <IoIosArrowBack size={22} />
                    </button>
                    <h1 className="font-semibold">
                        {mode === 'create' ? 'Tambah Kategori' : 'Edit Kategori'}
                    </h1>
                </div>
                {!isMobile && wrapperButton}
                {/* <div className="flex flex-wrap gap-x-2">
                    <Button 
                    type="button" 
                    size="lg"
                    variant="outlinePrimary">Batal</Button>
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="min-w-28"
                    size="lg"
                    >
                        {isSubmitting ? 
                            <ClipLoader size={24} color="white" />
                            : mode === 'create' ? 'Tambah' : 'Simpan'
                        }
                    </Button>
                </div> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:[&>*:first-child]:col-span-2 gap-6">
                <CardDashboard title="Informasi Umum" className="h-82">
                    <div className="space-y-3">
                        <Label>Nama Kategori</Label>
                        <div>
                            <Input 
                                {...register("name")}
                                placeholder="Masukkan nama kategori"
                            />
                            {errors.name && <p className="text-red-500 text-[13px] mt-1">{errors.name.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-3">
                            <Label>Deskripsi Kategori</Label>
                            <div>
                                <div className="h-28 relative">
                                    <Textarea
                                    className="h-full"
                                    placeholder="Masukkan deskripsi (opsional)"
                                    maxLength={maxLengthDescription}
                                    {...register("description", {
                                        maxLength: {
                                            value: maxLengthDescription,
                                            message: `Max ${maxLengthDescription} characters allowed`
                                        }
                                    })}
                                    />
                                </div>
                                <div className="flex flex-wrap items-center justify-between mt-1">
                                    <div>
                                        {errors.description && <p className="text-red-500 text-[13px]">{errors.description.message}</p>}
                                    </div>
                                    <p className=" text-gray-400 text-[13px] mr-2">
                                        {description.length}/{maxLengthDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                </CardDashboard>
                <CardDashboard title="Media Kategori" className="h-82">
                    <div className="space-y-3">
                        <Label>Gambar Kategori</Label>
                        <div className="flex flex-col gap-1 w-full bg-gray-100 rounded-md border border-gray-200 justify-center items-center h-48 p-2">
                            {previewUrl ? (
                                <div className="w-full h-full relative group">
                                    <img 
                                    src={previewUrl}
                                    alt={previewUrl} 
                                    className="w-full h-full object-cover rounded-md"
                                    />
                                    <div
                                    className="absolute inset-0 bg-black/45 flex justify-center items-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    >
                                        <button 
                                        type="button"
                                        className="cursor-pointer rounded-full hover:bg-black/60 p-1"
                                        onClick={resetImage}
                                        >
                                            <HiOutlineTrash size={22} color="white" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <FiUpload size={22} />
                                    <div className="flex flex-wrap gap-x-2 text-sm">
                                        <button 
                                        type="button"
                                        className="cursor-pointer text-blue-700"
                                        onClick={() => fileInputRef.current?.click()}
                                        >
                                            Klik untuk unggah
                                        </button>
                                        <p>atau seret file</p>
                                    </div>
                                    <p className="text-[12px] text-gray-500">PDF, JPG, JPEG, PNG (maks. 5 MB)</p>
                                </>
                            )}

                            <Input
                                ref={fileInputRef}
                                type="file"
                                className="hidden"
                                onChange={(e) => handleUpload(e.target.files)}
                            />
                        </div>
                    </div>
                </CardDashboard>
            </div>
            {isMobile && wrapperButton}
        </form>
    )
}