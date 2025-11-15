import { z } from "zod";
import { emailSchema } from "../Email.schema";

export const AccountSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().min(8),
    email: emailSchema,
    birthOfDate: z.string(),
    password: z.string().min(6),
});
export const StoreSchema = z.object({
    storeName: z.string().min(1),
    phone: z.string().min(8),
    country: z.string().min(1),
    province: z.string().min(1),
    city: z.string().min(1),
    district: z.string().min(1),
    street: z.string().min(1),
    postalCode: z.string().min(4),
});

export type AccountFormValues = z.infer<typeof AccountSchema>;
export type StoreFormValues = z.infer<typeof StoreSchema>;