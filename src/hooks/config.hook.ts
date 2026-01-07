import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ConfigWithoutId } from "../types/config.type";


export function useConfigUpdate() {

    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["config-update"],
        mutationFn: async (data: ConfigWithoutId) => {
            const res = await fetch("http://localhost:3000/api/config", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Error al crear configuración");
            }
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["config"] })
        }
    });
}