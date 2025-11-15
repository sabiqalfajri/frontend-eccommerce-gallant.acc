import { createContext, useContext, useEffect, useState } from "react";

interface FilterState {
    selectedCategories: string[];
    startPrice?: number;
    endPrice?: number;
    setSelectedCategories: (categories: string[]) => void;
    setPriceRange: (start: number, end: number) => void;
    clearFilters: () => void;
}

const FilterContext = createContext<FilterState | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [startPrice, setStartPrice] = useState<number | undefined>(undefined);
    const [endPrice, setEndPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        const stored = localStorage.getItem("filterState");
        if (stored) {
            const parsed = JSON.parse(stored);
            setSelectedCategories(parsed.selectedCategories || []);
            setStartPrice(parsed.startPrice);
            setEndPrice(parsed.endPrice);
        }
    }, []);

    useEffect(() => {
        const filterData = { selectedCategories, startPrice, endPrice };
        localStorage.setItem("filterState", JSON.stringify(filterData));
    }, [selectedCategories, startPrice, endPrice]);

    const setPriceRange = (start: number, end: number) => {
        setStartPrice(start);
        setEndPrice(end);
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setStartPrice(undefined);
        setEndPrice(undefined);
        localStorage.removeItem("filterState");
    };

    return (
        <FilterContext.Provider
        value={{ 
            selectedCategories,
            startPrice,
            endPrice,
            setSelectedCategories,
            setPriceRange,
            clearFilters,
        }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error("useFilter must be used within a FilterProvider");
    return ctx;
}