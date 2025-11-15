import { z } from "zod";
import { emailSchema } from "./Email.schema";

export const AccountUserSchema = z.object({
    email: emailSchema,
    phone: z.string().optional().refine(
        (v) => !v || /^\d{8,}$/.test(v),
        { message: "Phone number must be at least 8 digits" }
    ),
    name: z.string().min(1, 'Name is required'),
    birthDate: z.string().optional().refine(
        (v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
        { message: "Date must be in YYYY-MM-DD format" }
    ),
    gender: z.string().optional(),
    country: z.string().optional(),
});

export type AccountUserFormValues = z.infer<typeof AccountUserSchema>;