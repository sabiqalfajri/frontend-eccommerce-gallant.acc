import { z } from "zod";
import { passwordSchema } from "./Password.schema";

export const resetPasswordSchema = z.object({
    code: z.string().min(1, { message: "Code is required" }),
    password: passwordSchema,
})

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;