import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.coerce.number().positive('Price must be a positive number'),
    stock: z.coerce.number().positive('Stock must be a positive number'),
    categoryId: z.string().min(1, 'Category ID is required'),
    description: z.string().min(1, 'Description is required'),
    visibility: z.enum(["PUBLISH", "HIDDEN", "DRAFT"]).optional()
})

export type ProductFormValues = z.output<typeof createProductSchema>;