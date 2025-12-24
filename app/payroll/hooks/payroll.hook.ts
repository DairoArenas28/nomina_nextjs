import { PayrollSchemeType } from "@/src/types/payroll.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useCreatePayroll() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["payroll-create"],
        mutationFn: async (payrollScheme: PayrollSchemeType) => {
            console.log(payrollScheme)
            const res = await fetch("http://localhost:3000/api/payroll", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payrollScheme)
            })
            if (!res.ok) {
                throw new Error("Error al crear el esquema de nómina")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payroll"] })
        }
    })
}

export function useUpdatePayroll() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["payroll-update"],
        mutationFn: async ({ id, ...payrollScheme }: { id: number } & PayrollSchemeType) => {
            const res = await fetch(`http://localhost:3000/api/payroll/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payrollScheme)
            })
            if (!res.ok) {
                throw new Error("Error al actualizar el esquema de nómina")
            }
            return res.json()
        }
        ,
        onSuccess: () => {
            //queryClient.invalidateQueries({ queryKey: ["payroll"] })
            //queryClient.refetchQueries({ queryKey: ["payroll"] })
        }
    })
}

export function useDeletePayroll() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["payroll-delete"],
        mutationFn: async (id: number) => {
            const res = await fetch(`http://localhost:3000/api/payroll/${id}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                throw new Error("Error al eliminar el esquema de nómina")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["payroll"] })
        }
    })
}