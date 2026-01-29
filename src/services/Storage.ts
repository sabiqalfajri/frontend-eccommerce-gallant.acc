import { CurrentUser } from "@/types/User";

export const Storage = {
    getUser: (): CurrentUser | null => {
        const raw = localStorage.getItem("currentUser");
        if(!raw || raw === "undefined") return null;

        try {
            return JSON.parse(raw);
        } catch (error) {
            return null;
        }
    },
    setUser: (user: CurrentUser | null) => {
        if(!user) {
            localStorage.removeItem("currentUser");
            return;
        }
        localStorage.setItem("currentUser", JSON.stringify(user));
    },
    // getUser: (): CurrentUser => JSON.parse(localStorage.getItem("currentUser") || "null"),
    // setUser: (user: CurrentUser) => localStorage.setItem("currentUser", JSON.stringify(user)),
    removeUser: () => localStorage.removeItem("currentUser"),
    removeFilterProduct: () => localStorage.removeItem("filterState"),
    removeCartSelection: () => localStorage.removeItem("cartSelection")
}