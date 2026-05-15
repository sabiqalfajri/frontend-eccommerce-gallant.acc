export interface EOQConfig {
    id: string
    orderingCost: number
    holdingCost: number
    periodMonths: number
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
    recomendedOrder: number
    status: EOQStatus
    recomendation: string
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
    periodMonths: number
}