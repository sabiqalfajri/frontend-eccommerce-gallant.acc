import { CategoryForm } from "@/components/admin/categories/CategoryForm"
import { useCategoryForEdit } from "@/hooks/category/useCategoryForEdit";
import { useUpdateCategory } from "@/hooks/category/useUpdateCategory";
import { useToken } from "@/hooks/universal/useToken";
import { EditCategoryFormValues } from "@/schema/admin/CategorySchema";
import { useNavigate, useParams } from "react-router-dom";

export const EditCategory = () => {
    const { token } = useToken();
    const { updateCategory, isUpdating } = useUpdateCategory(token);
    const { id } = useParams<{ id: string }>();
    const { data: category } = useCategoryForEdit(id!);
    const navigate = useNavigate();

    const onSubmit = async (data: EditCategoryFormValues) => {
        if(!id) return;

        await updateCategory({
            id,
            data
        })

        navigate("/dashboard/categories");
    }

    return (
        <CategoryForm 
            mode="edit" 
            categoryData={category}
            onSubmit={onSubmit}
            isSubmitting={isUpdating}
        />
    )
}