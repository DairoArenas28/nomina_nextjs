import { z } from "zod";

export const ConfigSchema = z.object({
  id: z.number().int().positive().optional(),

  /* ===============================
     CONFIGURACIÓN BÁSICA
  =============================== */

  // Salario mínimo legal vigente
  smlv: z
    .number()
    .positive("El SMLV debe ser mayor a 0"),

  // Requisito auxilio (cantidad de SMLV)
  transportNumberSalaryRequirement: z
    .number()
    .min(0, "No puede ser negativo"),

  // Valor calculado del requisito auxilio
  transportValueSalaryRequirement: z
    .number()
    .min(0, "No puede ser negativo"),

  // Auxilio de transporte
  transportAllowanceValue: z
    .number()
    .min(0, "No puede ser negativo"),

  /* ===============================
     SEGURIDAD SOCIAL
  =============================== */

  // Salud
  healthEmployeePercent: z
    .number()
    .min(0)
    .max(100),

  healthEmployerPercent: z
    .number()
    .min(0)
    .max(100),

  // Pensión
  pensionEmployeePercent: z
    .number()
    .min(0)
    .max(100),

  pensionEmployerPercent: z
    .number()
    .min(0)
    .max(100),

  // Riesgos laborales
  occupationalRiskPercent: z
    .number()
    .min(0)
    .max(100),

  // Base seguridad social
  socialSecurityBase: z
    .number()
    .min(0),
});


export const ConfigCreateSchema = ConfigSchema.omit({
  id: true,
});

export type ConfigWithoutId = z.infer<typeof ConfigCreateSchema>;

export type Config = z.infer<typeof ConfigSchema>;
