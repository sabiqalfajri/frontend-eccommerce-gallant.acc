export interface CategoryUser {
    id: string;
    name: string;
    image: string
}

export interface CategoryAdmin extends CategoryUser {
    createdAt: string;
    updatedAt: string;
    totalProducts: number;
}

export interface CategoryAdminPaginated {
    categories: CategoryAdmin[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}