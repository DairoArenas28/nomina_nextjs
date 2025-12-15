'use client'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefsNominaEnc } from "../../static";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface NominaEncPageProps {
    id: string;
}

export function PivotTableNominaEnc({ id }: NominaEncPageProps) {

    const {data} = useQuery({
        queryKey: ["nomina-enc", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/nomina/${id}`, { cache: "no-store" });

            if (!res.ok) {
                throw new Error("Error en la API");
            }
            const json = await res.json();
            return json;
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2
    })

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={data ?? []}
                columnDefs={columnDefsNominaEnc}
                pagination={true}
                localeText={localeES}
            />
        </div>
    )
}