import { CardDashboard } from "@/components/admin/Card"
import { ComboboxCustom } from "@/components/common/ComboboxCustom";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useImagesUpload } from "@/hooks/universal/useImagesUpload";
import { useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { HiOutlineTrash } from "react-icons/hi2";
import { FaCirclePlus } from "react-icons/fa6";
import { createProductSchema, ProductFormValues } from "@/schema/admin/Product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToken } from "@/hooks/universal/useToken";
import { useForm } from "react-hook-form";
import { showError } from "@/utils/Toast";
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import { useCategories } from "@/hooks/category/useCategories";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
    const { token } = useToken();
    const { createProduct, isCreating } = useCreateProduct(token!);
    const { categories, isLoadingCategory } = useCategories();
    const [visibility, setVisibility] = useState('PUBLISH');
    const { previewUrls, handleUploads, removeImage, files } = useImagesUpload();
    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormValues>({
        resolver: zodResolver(createProductSchema) as any,
    });
    const maxLengthDescription = 500;
    const description = watch('description') || "";
    const navigate = useNavigate();

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleInputUpload = () => {
        if(previewUrls.length < 6) fileInputRef.current?.click();
    };

    const categoryOptions = categories?.map((cat) => ({
        label: cat.name,
        value: cat.id
    })) || [];

    const visibilityMenu = [
        { 
            label: "Published", 
            desc: 'Produk ini akan muncul di halaman utama',
            value: "PUBLISH"
        },
        { 
            label: "Hidden", 
            desc: 'Produk ini tidak akan muncul di halaman utama',
            value: "HIDDEN"
        },
    ]

    const onSubmit = async (data: ProductFormValues) => {
        if(!files.length) {
            showError('Please upload at least one image.');
            return;
        };

        const payload = {
            ...data,
            visibility,
            files
        };

        await createProduct(payload);
        navigate('/dashboard/products')
    }

    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
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
                    <h1 className="font-semibold">Add New Product</h1>
                </div>
                <div className="flex flex-wrap gap-x-2">
                    <Button 
                    type="button" 
                    variant="outlinePrimary">Discard</Button>
                    <Button
                    type="submit"
                    disabled={isCreating}
                    variant="primary"
                    >
                        {isCreating ? "Creating Product" : "Create Product"}
                    </Button>
                </div>
            </div>
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:[&>*:first-child]:col-span-2 gap-6">
                <div className="flex flex-col gap-6">
                    <CardDashboard title="General Information" className="h-82">
                        <div className="space-y-3">
                            <Label>Product Name</Label>
                            <div>
                                <Input 
                                {...register("name")}
                                placeholder="Enter product name"
                                />
                                {errors.name && <p className="text-red-500 text-[13px] mt-1">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Label>Description</Label>
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
                                    <p className="absolute text-gray-400 text-[13px] right-3 bottom-3">
                                        {description.length}/{maxLengthDescription}
                                    </p>
                                </div>
                                {errors.description && <p className="text-red-500 text-[13px] mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </CardDashboard>
                    <CardDashboard title="Pricing and Stock">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <Label>Base Price</Label>
                                <div>
                                    <Input 
                                    {...register("price")}
                                    type="number"
                                    placeholder="Enter price"
                                    />
                                    {errors.price && <p className="text-red-500 text-[13px] mt-1">{errors.price.message}</p>}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label>Stock</Label>
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
                    <CardDashboard title="Visibility">
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
                    <CardDashboard title="Product Media" className="h-82">
                        <div className="space-y-3">
                            <Label>Images Product</Label>
                            <div className="flex flex-col gap-1 w-full bg-gray-100 rounded-md border border-gray-200 justify-center items-center h-48 p-2">
                                {previewUrls.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-2 w-full h-full">
                                        {previewUrls.map((preview, idx) => (
                                            <div 
                                            key={idx}
                                            className="relative group h-20"
                                            // onMouseEnter={() => setIsHovered(true)}
                                            // onMouseLeave={() => setIsHovered(false)}
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
                                                    onClick={() => removeImage(idx)}
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
                                                Click to Upload
                                            </button>
                                            <p>or Drag and Drop</p>
                                        </div>
                                        <p className="text-[12px] text-gray-500">PDF, JPG, JPEG, PNG less than 5mb.</p>
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
                    <CardDashboard title="Category">
                        <div className="space-y-3">
                            <Label>Product Category</Label>
                            <ComboboxCustom
                                options={categoryOptions}
                                className="w-full"
                                isLoading={isLoadingCategory}
                                contentClassName="!w-full !max-w-none"
                                value={watch("categoryId")}
                                onChange={(value) => {
                                    setValue("categoryId", value, { shouldValidate: true });
                                }}
                            />
                            {errors.categoryId && (
                                <p className="text-red-500 text-[13px] mt-1">
                                    {errors.categoryId.message}
                                </p>
                            )}
                        </div>
                    </CardDashboard>
                </div>
            </div>
        </div>
        </form>
    )
}