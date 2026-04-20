import { FilterContext } from "@/features/filter/filter.context"
import { useContext } from "react"

export const useFilter = () => {
    const ctx = useContext(FilterContext)
    if(!ctx) throw new Error("useFilter must be used within a FilterProvider");
    return ctx
}