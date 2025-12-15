'use client'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefsNominaEnc } from "../../static";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface NominaEncPageProps {
    id: string;
}

export type RowTypeNominaEnc = {
    id: number;
    code: string;
    employeeName: string;
    documentNumber: string;
    position: string;
    department: string;
    accrual: number,
    deducted: number,
    total: number
};


export function PivotTableNominaEnc({ id }: NominaEncPageProps) {

    const { data } = useQuery({
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

    const rowData = useMemo<RowTypeNominaEnc[]>(() => {
        if (!data) return [];

        return data.map((item: any) => ({
            id: item.id,
            code: item.code,
            employeeName: item.employee?.name ?? "",
            documentNumber: item.employee?.documentNumber ?? "",
            position: item.employee?.position ?? "",
            accrual: item.accrual,
            deducted: item.deducted,
            total: item.total
        }));
    }, [data]);

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={rowData ?? []}
                columnDefs={columnDefsNominaEnc}
                pagination={true}
                localeText={localeES}
            />
        </div>
    )
}