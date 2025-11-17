import { CurrentUser } from "@/types/User";

export const Storage = {
    getUser: () => JSON.parse(localStorage.getItem("currentUser") || "null"),
    setUser: (user: CurrentUser) => localStorage.setItem("currentUser", JSON.stringify(user)),
    removeUser: () => localStorage.removeItem("currentUser"),
    removeFilterProduct: () => localStorage.removeItem("filterState"),
    removeCartSelection: () => localStorage.removeItem("cartSelection")
}