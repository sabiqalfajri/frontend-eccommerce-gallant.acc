import { z } from "zod";

export const emailSchema = z.string().trim().pipe(z.email())
export const emailSchemaObj = z.object({
    email: emailSchema
})

export type EmailSchemaObj = z.infer<typeof emailSchemaObj>
export type EmailSchema = z.infer<typeof emailSchema>;