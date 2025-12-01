'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteEmployee(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey:["employee-delete"],
        mutationFn: async (id: number) => {
            console.log(id)
            const res = await fetch(`http://localhost:3000/api/employee/${id}`, {
                method: "DELETE"
            })

            if(!res.ok) throw new Error("Error al eliminar")

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["employees"]})
        }
    })
}