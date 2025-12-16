'use client'


import { EmployeeWithoutId } from "@/src/types/employee.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ConceptWithoutId } from "../types/concept.type"


export function useCreateConcept() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["concept-create"],
        mutationFn: async (data: EmployeeWithoutId) => {
            const res = await fetch("http://localhost:3000/api/concept",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })

            if(!res.ok){
                throw new Error("Error al crear el concepto")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["concepts"] })
        }
    })
}

export function useUpdateConcept() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["concept-update"],
        mutationFn: async ({ id, ...data }: { id: number } & ConceptWithoutId) => {
            const res = await fetch(`http://localhost:3000/api/concept/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (!res.ok) {
                throw new Error("Error al actualizar el concepto")
            }
            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["concepts"] })
        }
    })
}

export function useDeleteConcept() {

    const queryClient = useQueryClient()


    return useMutation({
        mutationKey: ["concept-delete"],
        mutationFn: async (id: number) => {
            console.log(id)
            const res = await fetch(`http://localhost:3000/api/concept/${id}`, {
                method: "DELETE"
            })

            if (!res.ok) throw new Error("Error al eliminar")

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["concepts"] })
        }
    })
}