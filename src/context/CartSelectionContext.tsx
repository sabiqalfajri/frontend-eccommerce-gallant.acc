import { useState, createContext, useContext, useEffect } from "react";

interface CartSelectionContextProps {
    selectedIds: string[];
    toggleSelect: (id: string) => void;
    selectAll: (ids: string[]) => void;
    clearSelection: () => void;
    isSelected: (id: string) => boolean
}

const CartSelectionContext = createContext<CartSelectionContextProps | undefined>(undefined)

export const CartSelectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('cartSelection');
        return saved ? JSON.parse(saved) : [];
    });

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

    useEffect(() => {
        localStorage.setItem('cartSelection', JSON.stringify(selectedIds))
    }, [selectedIds])

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