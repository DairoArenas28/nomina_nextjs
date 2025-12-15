'use client';
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { AllCommunityModule, ModuleRegistry, SelectionChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Dispatch, SetStateAction } from "react";
import { columnDefsNomina } from "../../static";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    onRowSelected: Dispatch<SetStateAction<number | null>>
}

export function PivotTableNomina({ onRowSelected }: Props) {

    const { data } = useQuery({
        queryKey: ["nomina"],
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

    const onSelectionChanged = (params: SelectionChangedEvent) => {
        const selected = params.api.getSelectedRows()[0];
        if (selected) onRowSelected(selected.id);
    };

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={data ?? []}
                columnDefs={columnDefsNomina}
                rowSelection={{
                    mode: "singleRow",
                    enableClickSelection: true   // ⬅️ reemplazo oficial
                }}
                onSelectionChanged={onSelectionChanged}
                pagination={true}
                localeText={localeES}
            />
        </div>
    )
}