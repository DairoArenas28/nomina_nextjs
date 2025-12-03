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

    hireDate: z.string(), // formato YYYY-MM-DD (opcional: se puede validar más)
    contractType: z.string(),
    position: z.string(),
    salary: z.string().transform(Number),

    eps: z.string(),
    pension: z.string(),
    arl: z.string(),

    bank: z.string(),
    accountType: z.string(),
    accountNumber: z.string()
});

export const EmployeeWithoutId = EmployeeSchema.omit({ id: true });
export const EmployeeResponseSchema = z.array(EmployeeSchema)

// Tipo inferido automáticamente
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type EmployeeWithoutId = Omit<Employee, "id">;