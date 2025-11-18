export type filterProduct = 'ALL' | 'PUBLISH' | 'HIDDEN' | 'DRAFT';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    visibility: filterProduct;
    stock: number;
    categoryName: string;
    sold: number;
}

export interface ProductBaseUser {
    id: string;
    name: string;
    price: number;
    category: { id: string; name: string };
    images: { url: string }[];
}

export interface ProductUserResponse {
    products: ProductBaseUser[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}

export interface ProductById {
    id: string;
    name: string;
    description: string;
    price: number;
    images: { url: string }[];
    visibility: filterProduct;
    stock: number;
    categoryId: string;
    categoryName: string;
}

export interface ProductPayload {
    name: string;
    description: string;
    price: number;
    stock: number;
    categoryId: string;
    visibility: string;
    files: File[];
}

export interface UpdateProductPayload extends ProductPayload {
    deletedImages: string[]
}

export interface ProductPaginated {
    products: Product[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}

export interface DetailProduct {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: { name: string };
    images: { id: string; url: string }[];
}

export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    images: { url: string }[]
}

export interface BestSellerProduct extends RelatedProduct {
    sold: string;
}

export interface NewArrivals extends RelatedProduct {}
export interface Carousal extends RelatedProduct {}

