type Role = "USER" | "ADMIN"

export interface CurrentUser {
    email: string;
    name: string;
    role: Role 
    image: string;
    phone: string;
    gender: string;
    country: string;
    birthDate: string;
}

export interface User extends CurrentUser {
    id: string;
    orders: number;
    joinedOn: string;
    phone: string;
}

export interface UserAll extends CurrentUser {
    user: User[];
    total: number;
    page: number;
    rowsPerPage: number;
    totalPages: number;
}

export type AccountUserKeys =
  | "email"
  | "name"
  | "phone"
  | "birthDate"
  | "gender"
  | "country";