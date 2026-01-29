import { Button } from "@/components/ui/button";
import { useImagesUpload } from "@/hooks/universal/useImagesUpload";
import { createProductSchema, ProductFormValues } from "@/schema/admin/Product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosArrowBack, IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CardDashboard } from "../Card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HiOutlineTrash } from "react-icons/hi";
import { FaCirclePlus } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { ComboboxCustom } from "@/components/common/ComboboxCustom";
import { useCategories } from "@/hooks/category/useCategories";
import { showError } from "@/utils/Toast";
import { NumericFormat } from "react-number-format"
import { ClipLoader } from "react-spinners";

interface ProductData extends ProductFormValues {
    id: string;
    images?: string[]
}

interface ProductFormProps {
    mode: 'create' | 'edit';
    productData?: ProductData,
    onSubmit: (data: ProductFormValues & {
        files: File[]
        deletedImages?: string[];
        visibility: string
    }) => Promise<void>;
    isSubmitting?: boolean;
}

export const ProductForm = ({
    mode,
    productData,
    onSubmit,
    isSubmitting
}: ProductFormProps) => {
    const { categories, isLoadingCategory } = useCategories();
    const defaultValues = useMemo(() => {
        if(mode === 'edit' && productData) {
            return {
                ...productData,
                price: productData.price ?? 0
            }
        }
        return {
            name: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            visibility: 'PUBLISH' as const
        }
    }, [mode, productData]);

    const { register, handleSubmit, watch, setValue, formState: { errors }, control } = useForm<ProductFormValues>({
        resolver: zodResolver(createProductSchema) as any,
        defaultValues
    });
    const [visibility, setVisibility] = useState(productData?.visibility ?? 'PUBLISH');
    const maxLengthDescription = 500;
    const description = watch('description') || "";
    const navigate = useNavigate();
    const { previewUrls, handleUploads, removeImage, files, deletedImages } = useImagesUpload(6, productData?.images || []);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const handleInputUpload = () => {
        if(previewUrls.length < 6) fileInputRef.current?.click();
    };

    const handleFormSubmit = async (data: ProductFormValues) => {
        const totalImages = previewUrls.length
        if(totalImages === 0) {
            showError('Silakan unggah minimal satu gambar.');
            return
        }

        await onSubmit({
            ...data,
            files,
            deletedImages,
            visibility
        })
    }

    const handleRemoveImage = (idx: number) => {
        const preview = previewUrls[idx];
        const isExisting = mode === 'edit' && productData?.images?.includes(preview);

        removeImage(idx, isExisting);
    }

    const categoryOptions = categories?.map((cat) => ({
        label: cat.name,
        value: cat.id
    })) || [];

    const visibilityMenu: {
        label: string;
        desc: string;
        value: "PUBLISH" | "HIDDEN" | "DRAFT";
    }[] = [
        { 
            label: "Ditampilkan", 
            desc: 'Produk ini akan muncul di halaman utama',
            value: "PUBLISH"
        },
        { 
            label: "Disembunyikan", 
            desc: 'Produk ini tidak akan muncul di halaman utama',
            value: "HIDDEN"
        },
    ]

    return (
        <form 
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-y-6">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-wrap items-center gap-x-3">
                    <button 
                    type="button"
                    className="flex justify-center items-center rounded-md w-8 h-8 border border-gray-300 cursor-pointer hover:bg-gray-200 transform transition-all duration-200"
                    onClick={() => navigate(-1)}
                    >
                        <IoIosArrowBack size={22} />
                    </button>
                    <h1 className="font-semibold">
                        {mode === 'create' ? 'Tambah Produk' : 'Edit Produk'}
                    </h1>
                </div>
                <div className="flex flex-wrap gap-x-2">
                    <Button 
                    type="button" 
                    size="lg"
                    variant="outlinePrimary">Batal</Button>
                    <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    size="lg"
                    >
                        {isSubmitting ? 
                            <ClipLoader size={24} color="white" />
                            : mode === 'create' ? 'Tambah Produk' : 'Simpan'
                        }
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:[&>*:first-child]:col-span-2 gap-6">
                <div className="flex flex-col gap-6">
                    <CardDashboard title="Informasi Umum" className="h-82">
                        <div className="space-y-3">
                            <Label>Nama Produk</Label>
                            <div>
                                <Input
                                {...register("name")}
                                placeholder="Masukkan nama produk"
                                />
                                {errors.name && <p className="text-red-500 text-[13px] mt-1">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Deskripsi</Label>
                            <div>
                                <div className="h-28 relative">
                                    <Textarea
                                    className="h-full"
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
                    <CardDashboard title="Harga dan stok">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label>Harga</Label>
                                <div>
                                    <Controller 
                                        name="price"
                                        control={control}
                                        render={({ field: { onChange, onBlur, value, ref } }) => (
                                            <NumericFormat 
                                                customInput={Input}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                                fixedDecimalScale={false}
                                                allowNegative={false}
                                                value={value ?? null}
                                                onValueChange={(values) => {
                                                    const { floatValue } = values
                                                    onChange(floatValue == null ? null : floatValue)
                                                }}
                                                onBlur={onBlur}
                                                getInputRef={ref}
                                                placeholder="0"
                                            />
                                        )}
                                    />
                                    {errors.price && <p className="text-red-500 text-[13px] mt-1">{errors.price.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label>Stok</Label>
                                <div>
                                    <Input 
                                    type="number"
                                    {...register("stock")}
                                    placeholder="Enter product name"
                                    />
                                    {errors.stock && <p className="text-red-500 text-[13px] mt-1">{errors.stock.message}</p>}
                                </div>
                            </div>
                        </div>
                    </CardDashboard>
                    <CardDashboard title="Visibilitas">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {visibilityMenu.map((visi, idx) => (
                                <div 
                                key={idx}
                                onClick={() => setVisibility(visi.value)}
                                className={`grid grid-cols-[5%_95%] gap-2 md:gap-4 w-full border rounded-md px-5 py-3 text-sm cursor-pointer ${visibility === visi.value ? 'border-primary' : 'border-gray-200 hover:bg-accent'}`}>
                                    <div className={`flex justify-center items-center border border-gray-300 w-4 h-4 rounded-[3px] mt-1 ${visibility === visi.value && 'bg-primary'}`}>
                                        {visibility === visi.value && <IoMdCheckmark className="text-white w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-[15px] mb-1 font-semibold">{visi.label}</p>
                                        <p>{visi.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardDashboard>
                </div>
                <div className="flex flex-col gap-y-6">
                    <CardDashboard title="Media Produk" className="h-82">
                        <div className="space-y-3">
                            <Label>Gambar Produk</Label>
                            <div className="flex flex-col gap-1 w-full bg-gray-100 rounded-md border border-gray-200 justify-center items-center h-48 p-2">
                                {previewUrls.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 w-full h-full">
                                        {previewUrls.map((preview, idx) => (
                                            <div 
                                            key={idx}
                                            className="relative group h-20"
                                            >
                                                <img 
                                                src={preview} 
                                                alt={preview} 
                                                className="w-full h-full object-cover rounded-md"
                                                />
                                                <div
                                                className="absolute inset-0 bg-black/50 flex justify-center items-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                >
                                                    <button 
                                                    type="button"
                                                    className="cursor-pointer rounded-full hover:bg-black/60 p-1"
                                                    onClick={() => handleRemoveImage(idx)}
                                                    >
                                                        <HiOutlineTrash size={18} color="white" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className={`${previewUrls.length < 6 ? 'flex' : 'hidden'} justify-center items-center rounded-md bg-gray-200 w-20 h-20 border border-gray-300`}>
                                            <button 
                                            className="flex justify-center items-center h-6 w-6 text-sm cursor-pointer"
                                            type="button"
                                            onClick={handleInputUpload}
                                            >
                                                <FaCirclePlus size={22} />
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
                                            onClick={handleInputUpload}
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
                                    multiple
                                    className="hidden"
                                    onChange={(e) => handleUploads(e.target.files, fileInputRef.current)}
                                />
                            </div>
                        </div>
                    </CardDashboard>
                    <CardDashboard title="Kategori">
                        <div className="space-y-3">
                            <Label>Kategori Produk</Label>
                            <ComboboxCustom
                                options={categoryOptions}
                                className="w-full"
                                isLoading={isLoadingCategory}
                                contentClassName="!w-full !max-w-none"
                                placeholder="Pilih opsi kategori"
                                value={watch("categoryId")}
                                onChange={(value) => {
                                    setValue("categoryId", value, { shouldValidate: true });
                                }}
                            />
                        </div>
                    </CardDashboard>
                </div>
            </div>
        </form>
    )
}