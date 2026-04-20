import { createContext } from "react";

interface FilterState {
    selectedCategories: string[];
    startPrice?: number;
    endPrice?: number;
    setSelectedCategories: (categories: string[]) => void;
    setPriceRange: (start: number, end: number) => void;
    clearFilters: () => void;
}

export const FilterContext = createContext<FilterState | undefined>(undefined);