import { EOQConfig, EOQPaginatedReport, EOQPayload } from "@/types/EOQ";
import { axiosClient } from "./AxiosClient";
import { ApiResponse } from "@/types/ApiResponse";

export const fetchEOQConfig = async (
    token: string
) => {
    const response = await axiosClient.get<{ data: EOQConfig }>(
        "/eoq/admin/config", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )

    return response.data.data
}

export const fetchEOQReport = async (
    token: string,
    page = 1,
    rowsPerPage = 10
) => {
    const response = await axiosClient.get<{ data: EOQPaginatedReport }>(
        "/eoq/admin/report", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                page,
                rowsPerPage
            }
        }
    )

    return response.data.data
}

export const applyEOQConfig = async (
    token: string,
    data: EOQPayload
) => {
    const response = await axiosClient.put<ApiResponse<EOQConfig>>(
        "/eoq/admin/config", 
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
            
        }
    )

    return response.data.data
}