import { useState, createContext, useContext } from "react";

interface CartSelectionContextProps {
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    selectAll: (ids: string[]) => void;
    clearSelection: () => void;
    isSelected: (id: string) => boolean
}

const CartSelectionContext = createContext<CartSelectionContextProps | undefined>(undefined)

export const CartSelectionProvider = ({ 
    children
 }: { children: React.ReactNode }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])
    };

    const selectAll = (ids: string[]) => {
        setSelectedIds(ids)
    };

    const clearSelection = () => {
        setSelectedIds([])
    }

    const isSelected = (id: string) => selectedIds.includes(id)

    return (
        <CartSelectionContext.Provider
        value={{ selectedIds, toggleSelect, selectAll, clearSelection, isSelected }}
        >
            {children}
        </CartSelectionContext.Provider>

    )
}

export const useCartSelection = () => {
    const ctx = useContext(CartSelectionContext);
    if(!ctx) throw new Error("useCartSelection must be used within a CartSelectionProvider");
    return ctx;
}