import z, { object } from "zod";


const PayrollSchemeEnc = object({
    code: z.string(),
    description: z.string(),
    payFrequency: z.string(),
    hoursPerDay: z.number(),
    workingDaysPerWeek: z.number(),
    workingDaysPerMonth: z.number(),
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

const PayrollSchemeDetExtend = PayrollSchemeDet.extend({concept_code: z.string(), concept_description: z.string()})

export const PayrollScheme = object({
    ...PayrollSchemeEnc.shape,
    payrollSchemeDet: z.array(PayrollSchemeDet)
})

export const PayrollSchemeExtend = object({
    ...PayrollSchemeEnc.shape,
    payrollSchemeDet: z.array(PayrollSchemeDetExtend)
})

export type PayrollSchemeType = z.infer<typeof PayrollScheme>;
export type PayrollSchemeTypeExtend = z.infer<typeof PayrollSchemeExtend>;

