import { BaseCategory, CategoryAdmin, CategoryAdminPaginated, CreateCategoryPayload, UpdateCategoryPayload } from "@/types/Category"
import { axiosClient } from "./AxiosClient"
import { ApiResponse } from "@/types/ApiResponse"

// User only
export const fetchCategories = async () => {
    const response = await axiosClient.get<{ data: BaseCategory[] }>('/category/all')
    return response.data.data
}

// Admin only
export const fetchCategoriesForAdmin = async (token: string, page = 1, rowsPerPage = 10) => {
    const response = await axiosClient.get<{ data: CategoryAdminPaginated }>('/category/admin/all', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            page,
            rowsPerPage
        }
    });

    return response.data.data
}

export const createCategoryForAdmin = async (
    token: string,
    data: CreateCategoryPayload
) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    formData.append("image", data.file);

    const response = await axiosClient.post<ApiResponse<CategoryAdmin>>('/category/admin/create', 
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
    );

    return response.data.data
}

export const updateCategoryForAdmin = async (
    token: string,
    id: string,
    data: UpdateCategoryPayload
) => {
    const formData = new FormData();
    if(data.name) formData.append('name', data.name);
    if(data.description) formData.append('description', data.description);
    if(data.file) formData.append('image', data.file);

    const response = await axiosClient.put<ApiResponse<CategoryAdmin>>(
        `/category/admin/update/${id}`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }
    );

    return response.data.data;
}

export const deleteSingleCategoryForAdmin = async (
    token: string,
    id: string
) => {
    const response = await axiosClient.delete(`/category/admin/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data
}

export const deleteBulkCategoryForAdmin = async (
    token: string,
    ids: string[]
) => {
    const response = await axiosClient.post('/category/admin/bulk-delete', {
        ids
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

// Universal
export const fetchCategoryById = async (id: string) => {
    const response = await axiosClient.get<{ data: BaseCategory }>(`/category/${id}`);
    
    return response.data.data;
}