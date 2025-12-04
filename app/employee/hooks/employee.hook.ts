'use client'


import { EmployeeWithoutId } from "@/src/types/employee.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export function useCreateEmployee() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["employee-create"],
        mutationFn: async (data: EmployeeWithoutId) => {
            const res = await fetch("http://localhost:3000/api/employee",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            if(!res.ok){
                throw new Error("Error al crear empleado")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
        }
    })
}

export function useUpdateEmployee() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["employee-update"],
        mutationFn: async ({ id, ...data }: { id: number } & EmployeeWithoutId) => {
            const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error("Error al actualizar empleado")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
        }
    })
}

export function useDeleteEmployee() {

    const queryClient = useQueryClient()


    return useMutation({
        mutationKey: ["employee-delete"],
        mutationFn: async (id: number) => {
            console.log(id)
            const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) throw new Error("Error al eliminar")

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] })
        }
    })
}