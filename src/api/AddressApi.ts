import { ApiResponse } from "@/types/ApiResponse";
import { axiosClient } from "./AxiosClient"
import { Address } from "@/types/Address";
import { AddressInput } from "@/schema/Address.schema";

export const createAddress = async (formData: AddressInput, token: string) => {
    const response = await axiosClient.post<ApiResponse<Address>>('/address/create', formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const fetchAddressByUserId = async (token: string) => {
    const response = await axiosClient.get<{ data: Address[] }>('/address', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const fetchAddressById = async (token: string, id: string) => {
    const response = await axiosClient.get<{ data: Address }>(`/address/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const updateAddressById = async (token: string, formData: AddressInput, id: string) => {
    const response = await axiosClient.put<ApiResponse<{ id: string }>>(`/address/update/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const setPrimaryAddress = async (token: string, id: string) => {
    const response = await axiosClient.put<ApiResponse<Address>>(`/address/set-primary/${id}`, 
        {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data.data
}

export const deleteAddress = async (token: string, id: string) => {
    const response = await axiosClient.delete(`/address/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data
}