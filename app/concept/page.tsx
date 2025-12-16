'use client'
import PivotTable from "@/src/components/molecules/PivotTable";
import { useCreateConcept, useDeleteConcept, useUpdateConcept } from "@/src/hooks/concept.hook";
import { columnDefsConcept } from "@/src/static/ColumnDefsTable";
import { useQuery } from "@tanstack/react-query";


export default function ConceptPage() {

    const createMutation = useCreateConcept()
    const updateMutation = useUpdateConcept()
    const deleteMutation = useDeleteConcept()

    const { data } = useQuery({
        queryKey: ["concepts"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/concept", { cache: "no-store" });

            if (!res.ok) {
                throw new Error("Error en la API");
            }

            const json = await res.json();
            //console.log(json)
            //const parsed = EmployeeResponseSchema.parse(json);

            return json; // <-- Array de empleados
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2
    });

    return (
        <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
            <div className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
                <PivotTable columnDefs={columnDefsConcept} createHooks={createMutation} updateHooks={updateMutation} deleteHooks={deleteMutation} data={data} entity="concept" />
            </div>
        </div>
    )
}