import { DetailProduct, filterProduct, NewArrivals, Product, ProductById, ProductPaginated, ProductPayload, ProductUserResponse, RelatedProduct, UpdateProductPayload } from "@/types/Product";
import { axiosClient } from "./AxiosClient";
import { ApiResponse } from "@/types/ApiResponse";

// admin only
export const fetchAllProductsForAdmin = async (
    token: string, 
    visibility: filterProduct | string, 
    page = 1, rowsPerPage = 10
) => {
    const response = await axiosClient.get<{ data: ProductPaginated }>('/products/admin', {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            visibility,
            page,
            rowsPerPage
        }
    });
    
    return response.data.data;
};

export const createProductForAdmin = async (
    token: string,
    data: ProductPayload
) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('categoryId', data.categoryId.toString());
    formData.append('visibility', data.visibility.toString());

    data.files.forEach((file) => {
        formData.append('images', file)
    })

    const response = await axiosClient.post<ApiResponse<Product>>('/products/admin/create', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    })

    return response.data.data
}

export const updatedProductForAdmin = async (
    token: string,
    id: string,
    data: UpdateProductPayload
) => {
    const formData = new FormData();
    if(data.name) formData.append('name', data.name);
    if(data.description) formData.append('description', data.description);
    if(data.price !== undefined) formData.append('price', data.price.toString());
    if(data.stock !== undefined) formData.append('stock', data.stock.toString());
    if(data.categoryId) formData.append('categoryId', data.categoryId.toString());
    if(data.visibility) formData.append('visibility', data.visibility.toString());

    formData.append("deletedImages", JSON.stringify(data.deletedImages ?? []));

    data.files?.forEach((file) => {
        formData.append('images', file);
    });

    const response = await axiosClient.put<ApiResponse<Product>>(
        `/products/admin/update/${id}`,
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

export const deletedProductSingle = async (token: string, id: string) => {
    const response = await axiosClient.delete<ApiResponse<Product>>(`/products/admin/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.data
}

export const deletedProductBulk = async (token: string, ids: string[]) => {
    const response = await axiosClient.post('/products/admin/bulk-delete', {
        ids
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

// universal
export const fetchProductById = async (id: string) => {
    const response = await axiosClient.get<{ data: ProductById }>(`/products/admin/${id}`);

     return response.data.data;
}

// user only
export const fetchAllProductsForUser = async (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    const response = await axiosClient.get<{ data: ProductUserResponse }>(`/products/user/all?${query}`);

    return response.data.data;
};

export const fetchProductDetail = async (id: string) => {
    const response = await axiosClient.get<{ data: DetailProduct }>(`/products/user/detail/${id}`);

    return response.data.data;
}

export const fetchRelatedProducts = async (currentId: string) => {
    const response = await axiosClient.get<{ data: RelatedProduct[] }>(`/products/user/related/${currentId}`);

    return response.data.data
}

export const fetchNewArrivals = async () => {
    const response = await axiosClient.get<{ data: NewArrivals[] }>('/products/user/new-arrivals');

    return response.data.data
}

