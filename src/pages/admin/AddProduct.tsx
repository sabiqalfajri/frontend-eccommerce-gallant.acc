import { ProductFormValues } from "@/schema/admin/Product.schema";
import { useToken } from "@/hooks/universal/useToken";
import { useCreateProduct } from "@/hooks/product/useCreateProduct";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "@/components/admin/products/ProductForm";

export const AddProduct = () => {
    const { token } = useToken();
    const { createProduct, isCreating } = useCreateProduct(token!);
    const navigate = useNavigate();

    console.log('token anda: ', token);

    const onSubmit = async (
        data: ProductFormValues & { files: File[]; deletedImages?: string[]; visibility: string }
    ) => {
        await createProduct(data);
        navigate('/dashboard/products')
    }

    return (
        <ProductForm
            mode="create"
            onSubmit={onSubmit}
            isSubmitting={isCreating}
        />
    )
}