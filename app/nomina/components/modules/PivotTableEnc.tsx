'use client';
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    columnDefs: any[];
}

export function PivotTableEnc({ columnDefs }: Props) {

    const { data } = useQuery({
        queryKey: ["employees"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/nomina", { cache: "no-store" });

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
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={data ?? []}
                columnDefs={columnDefs}
                pagination={true}
                localeText={localeES}
            />
        </div>
    )
}