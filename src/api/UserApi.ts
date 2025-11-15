import { AccountUserFormValues } from "@/schema/User.schema";
import { axiosClient } from "./AxiosClient";
import { CurrentUser, User, UserAll } from "@/types/User";

export const getCurrentUser = async (token: string) => {
    const response = await axiosClient.get<{ data: CurrentUser }>('/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data;
}

export const updateUser = async (token: string, data: AccountUserFormValues) => {
    const response = await axiosClient.put<{ data: CurrentUser }>(`/users/update/`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    return response.data.data;
}

// Admin only
export const fetchUserAll = async (token: string, page = 1, rowsPerPage = 10) => {
    const response = await axiosClient.get<{ data: UserAll }>('/users/admin', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            page,
            rowsPerPage
        }
    });
    
    return response.data.data;
}

export const deletedUserSingle = async (token: string, id: string) => {
    const response = await axiosClient.delete<{ data: User }>(`/users/admin/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    
    return response.data.data;
}

export const deletedUserBulk = async (token: string, ids: string[]) => {
    const response = await axiosClient.post<{ data: User }>('/users/admin/bulk-delete', {
        ids
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    
    return response.data.data;
}

