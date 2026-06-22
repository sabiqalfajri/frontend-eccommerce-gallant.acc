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
})

export type EOQConfigFormValues = z.output<typeof eoqConfigSchema>;
