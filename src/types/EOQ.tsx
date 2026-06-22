export interface EOQConfig {
    id: string
    orderingCost: number
    holdingCost: number
    createdAt: string
    updatedAt: string
}

export type EOQStatus = 
    | 'critical'
    | 'reorder'
    | 'optimal'
    | 'overstock'
    | 'unknown'

export interface EOQProduct {
    id: string
    productName: string
    productImage: string
    totalSold: number
    currentStock: number
    recommendedOrder: number
    restockFrequency: number
}

export interface EOQPaginatedReport {
    products: EOQProduct[];
    total: number
    page: number
    rowsPerPage: number
    totalPages: number
}

export interface EOQPayload {
    orderingCost: number
    holdingCost: number;
}