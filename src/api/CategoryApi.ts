import { CategoryAdminPaginated, CategoryUser } from "@/types/Category"
import { axiosClient } from "./AxiosClient"

export const fetchCategories = async () => {
    const response = await axiosClient.get<{ data: CategoryUser[] }>('/category/all')
    return response.data.data
}

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