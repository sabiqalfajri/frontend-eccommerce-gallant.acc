import { z } from "zod";

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    description: z.string().optional(),
})

export const editCategorySchema = z.object({
    name: z.string().min(1, 'Nama wajib diisi'),
    description: z.string().max(500).optional(),
})

export type CreateCategoryFormValues = z.output<typeof createCategorySchema>;
export type EditCategoryFormValues = z.output<typeof editCategorySchema>;