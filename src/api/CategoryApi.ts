import { CategoryUser } from "@/types/Category"
import { axiosClient } from "./AxiosClient"

export const fetchCategories = async () => {
    const response = await axiosClient.get<{ data: CategoryUser[] }>('/category/all')
    return response.data.data
}

export const fetchCategoriesForAdmin = async () => {

}