export interface Address {
    id: string;
    label: string;
    recipientName: string;
    nomor: string;
    province: string;
    city: string;
    district: string;
    subdistrict: string;
    postalCode: string;
    intructions?: string;
    street: string;
    isDefault: boolean;
}

export type AccountAddressKeys =
  | "recipientName"
  | "label"
  | "nomor"
  | "province"
  | "city"
  | "district"
  | "subdistrict"
  | "postalCode"
  | "street"
  | "intructions"