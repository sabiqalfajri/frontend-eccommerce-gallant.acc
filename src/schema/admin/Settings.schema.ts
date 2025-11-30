import { z } from "zod";
import { emailSchema } from "../Email.schema";

export const AccountSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phoneNumber: z.string().optional().refine(
        (v) => !v || /^\d{8,}$/.test(v),
        { message: "Phone number must be at least 8 digits" }
    ),
    email: emailSchema,
    birthOfDate: z.string().optional().refine(
        (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
        { message: "Date must be in YYYY-MM-DD format" }
    ),
    gender: z.string().optional()
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