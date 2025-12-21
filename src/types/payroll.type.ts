import z, { object } from "zod";


const PayrollSchemeEnc = object({
    code: z.string(),
    description: z.string(),
    payFrequency: z.string(),
    hoursPerDay: z.number(),
    workingDaysPerWeek: z.number(),
    totalHoursPeriod: z.number(),
    hasVacation: z.boolean(),
    hasBonus: z.boolean(),
    hasLiquidation: z.boolean()
})

const PayrollSchemeDet = object({
    concept_id: z.number(),
    value: z.number(),
    hours: z.number()
})

export const PayrollScheme = object({
    ...PayrollSchemeEnc.shape,
    payrollSchemeDet: z.array(PayrollSchemeDet)
})

export type PayrollSchemeType = z.infer<typeof PayrollScheme>;

