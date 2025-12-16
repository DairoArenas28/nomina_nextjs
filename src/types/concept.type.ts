import { z } from "zod";

export const ConceptSchema = z.object({
    id: z.number(),
    code: z.string(),
    description: z.string(),
    type: z.string(),
    value: z.string()
});

export const ConceptWithoutId = ConceptSchema.omit({ id: true });
export const ConceptResponseSchema = z.array(ConceptSchema)

// Tipo inferido automáticamente
export type ConceptResponse = z.infer<typeof ConceptResponseSchema>;
export type Concept = z.infer<typeof ConceptSchema>;
export type ConceptWithoutId = Omit<Concept, "id">;