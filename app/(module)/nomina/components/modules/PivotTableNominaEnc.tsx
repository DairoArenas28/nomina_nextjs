'use client'
import { AllCommunityModule, ModuleRegistry, SelectionChangedEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefsNominaEnc } from "../../static";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo } from "react";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface NominaEncPageProps {
    id: string;
    onRowSelected: Dispatch<SetStateAction<number | null>>

}

export type RowTypeNominaEnc = {
    id: number;
    code: string;
    employeeName: string;
    documentNumber: string;
    position: string;
    accrual: number,
    deducted: number,
    total: number
};

export interface NominaEncApi {
    id: number;
    code: string;
    accrual: number;
    deducted: number;
    total: number;
    employee: {
        id: number;
        name: string;
        documentNumber: string;
        position: string;
    } | null;
}


export function PivotTableNominaEnc({ id, onRowSelected }: NominaEncPageProps) {

    const { data } = useQuery<NominaEncApi[]>({
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

        return data.map((item) => ({
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

    const onSelectionChanged = (params: SelectionChangedEvent) => {
        const selected = params.api.getSelectedRows()[0];
        if (selected) onRowSelected(selected.id);
    };

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={rowData ?? []}
                columnDefs={columnDefsNominaEnc}
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