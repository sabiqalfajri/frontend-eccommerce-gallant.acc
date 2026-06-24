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

export interface EOQCalculationDetail {
    analysisDays: number
    orderingCost: number
    holdingCost: number
    averageDailyDemand: number
    leadTimeDays: number
    safetyStock: number
    rawEOQ: number
    rawROP: number
}

export interface EOQProduct {
    id: string
    productName: string
    productImage: string
    annualDemand: number
    currentStock: number
    recommendedOrder: number
    reorderPoint: number
    calculationDetail: EOQCalculationDetail
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