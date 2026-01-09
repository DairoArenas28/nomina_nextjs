import { z } from "zod";
import { CalculationBase, CalculationType, ConceptCategory, ConceptType, OvertimeType } from "../enums";

export const ConceptSchema = z.object({
    id: z.number(),
    code: z.string(),
    description: z.string(),

    type: z.enum(ConceptType),
    category: z.enum(ConceptCategory),

    calculationType: z.enum(CalculationType).nullable(),
    calculationBase: z.enum(CalculationBase).nullable(),

    percentage: z.coerce.number().nullable(),
    overtimeType: z.enum(OvertimeType).nullable(),

    value: z.coerce.number().nullable(),

    editable: z.coerce.boolean(),
    active: z.coerce.boolean(),
})


export const ConceptWithoutId = ConceptSchema.omit({ id: true });
export const ConceptResponseSchema = z.array(ConceptSchema)

// Tipo inferido automáticamente
export type ConceptResponse = z.infer<typeof ConceptResponseSchema>;
export type Concept = z.infer<typeof ConceptSchema>;
export type ConceptWithoutId = Omit<Concept, "id">;