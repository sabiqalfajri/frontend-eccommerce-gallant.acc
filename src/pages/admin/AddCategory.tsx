import { CategoryForm } from "@/components/admin/categories/CategoryForm"
import { useCreateCategory } from "@/hooks/category/useCreateCategory";
import { useToken } from "@/hooks/universal/useToken";
import { CreateCategoryFormValues } from "@/schema/admin/CategorySchema";
import { useNavigate } from "react-router-dom";

export const AddCategory = () => {
    const { token } = useToken();
    const { createCategory, isCreatingCategory } = useCreateCategory(token);
    const navigate = useNavigate();

    const onSubmit = async (
        data: CreateCategoryFormValues & { file: File }
    ) => {
        await createCategory({
            name: data.name,
            description: data.description,
            file: data.file
        });
        
        navigate("/dashboard/categories");
    };

    return (
        <CategoryForm 
            mode="create" 
            onSubmit={onSubmit}
            isSubmitting={isCreatingCategory}
        />
    )
}