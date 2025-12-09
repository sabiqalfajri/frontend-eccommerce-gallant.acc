import { z } from "zod";

export const passwordSchema = z.string()
    .min(8, { message: "Kata sandi harus terdiri dari minimal 8 karakter" })
    .regex(/[a-z]/, { message: "Kata sandi harus mengandung huruf kecil" })
    .regex(/[A-Z]/, { message: "Kata sandi harus mengandung huruf besar" })
    .regex(/[0-9]/, { message: "Kata sandi harus mengandung angka" })
    .regex(/[^a-zA-Z0-9]/, { message: "Kata sandi harus mengandung karakter khusus" })

export type PasswordSchema = z.infer<typeof passwordSchema>;