export interface BaseCategory {
    id: string;
    name: string;
    image: string;
}

export interface CategoryAdmin extends BaseCategory {
    createdAt: string;
    updatedAt: string;
    totalProducts: number;
}

export interface BaseCategoryPayload {
    name: string;
    description?: string | undefined
}

export interface CreateCategoryPayload extends BaseCategoryPayload {
    file: File
}
export interface UpdateCategoryPayload extends BaseCategoryPayload {
    file?: File
}

export interface CategoryAdminPaginated {
    categories: CategoryAdmin[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}