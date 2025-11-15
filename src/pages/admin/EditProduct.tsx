import { ProductForm } from "@/components/admin/products/ProductForm"
import { useProductById } from "@/hooks/product/useProductById";
import { useUpdateProduct } from "@/hooks/product/useUpdatedProduct";
import { useToken } from "@/hooks/universal/useToken"
import { ProductFormValues } from "@/schema/admin/Product.schema";
import { useNavigate, useParams } from "react-router-dom";

export const EditProduct = () => {
    const { token } = useToken();
    const { updateProduct, isUpdating } = useUpdateProduct(token!);
    const { id } = useParams<{ id: string }>();
    const { dataProductById, isLoadingProductById } = useProductById(id!)
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (productData?.images) {
    //         setPreviewUrls(productData.images);
    //     }
    // }, [productData, setPreviewUrls]);

    const productDataForForm = dataProductById
        ? {
            id: dataProductById.id,
            name: dataProductById.name,
            price: dataProductById.price,
            stock: dataProductById.stock,
            categoryId: dataProductById.categoryId ?? '',
            description: dataProductById.description,
            visibility: (['PUBLISH','HIDDEN','DRAFT'].includes(dataProductById.visibility) 
                         ? dataProductById.visibility 
                         : 'PUBLISH') as "PUBLISH" | "HIDDEN" | "DRAFT",
            images: dataProductById.images.map(img => img.url)
        }
        : undefined;

    const onSubmit = async (data: ProductFormValues & { files: File[], deletedImages?: string[], visibility: string }) => {
        if(!id) return;

        const payload = {
            ...data,
            deletedImages: data.deletedImages ?? []
        }

        await updateProduct({
            id,
            data: payload
        })

        navigate("/dashboard/products");
    }

    if (isLoadingProductById) return <div>Loading...</div>;

    return (
        <ProductForm
            mode="edit"
            productData={productDataForForm}
            onSubmit={onSubmit}
            isSubmitting={isUpdating}
        />
    )
}