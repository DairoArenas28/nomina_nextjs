import { z } from "zod";

export const EmployeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.number().min(18).max(80),
    documentType: z.string(),
    documentNumber: z.string(),
    country: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string().email(),

    hireDate: z.date(), // formato YYYY-MM-DD (opcional: se puede validar más)
    contractType: z.string(),
    position: z.string(),
    salary: z.string().transform(Number),
    payrollSchemeEnc_id: z.number().nullable(),

    eps: z.string(),
    pension: z.string(),
    arl: z.string(),

    bank: z.string(),
    accountType: z.string(),
    accountNumber: z.string()
});

export const EmployeeWithoutId = EmployeeSchema.omit({ id: true });
export const EmployeeResponseSchema = z.array(EmployeeSchema)
export const EmployeeGetResponseSchema = EmployeeSchema.extend({
    payrollSchemeEncDescription: z.string().nullable()
}).array();


// Tipo inferido automáticamente
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeWithoutId = Omit<Employee, "id">;