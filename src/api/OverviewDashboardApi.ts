import { Overview } from "@/types/Overview";
import { axiosClient } from "./AxiosClient";

export const fetchOverviewDashboard = async (token: string) => {
    const response = await axiosClient.get<{ data: Overview }>('/overviews/admin', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
        
    return response.data.data;
}