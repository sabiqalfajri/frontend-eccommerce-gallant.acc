import { z } from "zod";

export const createAddressSchema = z.object({
    recipientName: z.string().min(1, 'recipientName is required'),
    label: z.string().min(1, 'Label is required').default("Rumah"),
    street: z.string().min(1, 'Street is required'),
    nomor: z.string().min(1, 'Nomor is required'),
    province: z.string().min(1, 'Province is required'),
    city: z.string().min(1, 'City is required'),
    district: z.string().min(1, 'District is required'),
    subdistrict: z.string().min(1, 'Village is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
    isDefault: z.boolean().optional(),
    intructions: z.string().optional()
})

export type AddressInput = z.infer<typeof createAddressSchema>;