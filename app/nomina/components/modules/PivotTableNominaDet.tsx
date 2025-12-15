'use client'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefsNominaEnc } from "../../static";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface NominaDetPageProps {
    id: string;
}

export type RowTypeConceptoTree = {
    id: number;
    path: string[];           // jerarquía
    concepto?: string;
    valor?: number;
    tipo?: "DEVENGADO" | "DEDUCIDO";
};

const rowData: RowTypeConceptoTree[] = [
    // DEVENGADOS
    {
        id: 1,
        path: ["Carlos López", "Devengados", "Salario"],
        concepto: "Salario",
        valor: 2500000,
        tipo: "DEVENGADO"
    },
    {
        id: 2,
        path: ["Carlos López", "Devengados", "Auxilio Transporte"],
        concepto: "Auxilio Transporte",
        valor: 140606,
        tipo: "DEVENGADO"
    },

    // DEDUCIDOS
    {
        id: 3,
        path: ["Carlos López", "Deducidos", "Salud"],
        concepto: "Salud",
        valor: 100000,
        tipo: "DEDUCIDO"
    },
    {
        id: 4,
        path: ["Carlos López", "Deducidos", "Pensión"],
        concepto: "Pensión",
        valor: 100000,
        tipo: "DEDUCIDO"
    }
];


export function PivotTableNominaDet({ id }: NominaDetPageProps) {

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

    /*const rowData = useMemo<RowTypeNominaEnc[]>(() => {
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
    }, [data]);*/

    return (
        <div className="ag-theme-quartz" style={{ height: 300, width: "100%" }}>
            <AgGridReact<RowTypeConceptoTree>
                rowData={rowData}
                treeData={true}
                getDataPath={(data) => data.path}
                groupDefaultExpanded={-1}
                columnDefs={[
                    { field: "concepto", headerName: "Concepto" },
                    {
                        field: "valor",
                        headerName: "Valor",
                        valueFormatter: (p) =>
                            p.value
                                ? p.value.toLocaleString("es-CO", {
                                    style: "currency",
                                    currency: "COP"
                                })
                                : ""
                    }
                ]}
            />
        </div>
    )
}