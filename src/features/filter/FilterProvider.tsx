import { useEffect, useState } from "react";
import { FilterContext } from "./filter.context";

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [startPrice, setStartPrice] = useState<number | undefined>(undefined);
    const [endPrice, setEndPrice] = useState<number | undefined>(undefined);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("filterState");
            if(!stored) return

            const parsed = JSON.parse(stored);

            setSelectedCategories(parsed.selectedCategories || []);
            setStartPrice(parsed.startPrice);
            setEndPrice(parsed.endPrice);
        } catch {
            localStorage.removeItem("filterState");
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