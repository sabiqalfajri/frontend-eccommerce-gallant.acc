import { z } from "zod";

export const eoqConfigSchema = z.object({
    orderingCost: z.coerce
        .number()
        .positive({ 
            error: "Ordering cost must be greater than 0" 
        }),
    holdingCost: z.coerce
        .number()
        .positive({ 
            error: "Holding cost must be greater than 0" 
        }),
    periodMonths: z.coerce
        .number()
        .refine((val) => [1, 3, 6, 12].includes(val), {
            error: "Period must be 1, 3, 6, or 12 months"
        }),
})

export type EOQConfigFormValues = z.output<typeof eoqConfigSchema>;
