import axios from "axios";

const apiUrl = import.meta.env.VITE_REACT_URL;

export const axiosClient = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response) {
            const backendError = error.response.data;
            return Promise.reject({
                message: backendError.message || 'Something went wrong',
                status: backendError.statusCode || error.response.status
            })
        }

        if(error.request) {
            return Promise.reject({ message: "Tidak ada respon dari server" });
        }

        return Promise.reject({ message: "Gagal mengirim permintaan" });
    }
)