import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {

    year: string
    month: string

}

export function useCreateNomina() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["nomina-create"],
        mutationFn: async ({ year, month }: Props) => {
            const res = await fetch("http://localhost:3000/api/nomina", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ year, month })
            })

            if (!res.ok) {
                throw new Error("Error al crear el periodo")
            }

            return res.json()
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["nomina"] })
        }
    })
}