import { z } from "zod"
import { emailSchema } from "./Email.schema";
import { passwordSchema } from "./Password.schema";

export const loginFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>;