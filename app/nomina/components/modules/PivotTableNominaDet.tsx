'use client'
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { columnDefsNominaDet } from "../../static";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { totalmem } from "os";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface NominaDetPageProps {
    selectedId: number;
}

export type RowTypeNominaDet = {
    id: number;          // jerarquía
    code?: string;
    description?: string;
    valor?: number;
    tipo?: "Devengado" | "Deducido";
};

export interface NominaDetApi {
    id: number;
    concept: {
        id: number;
        code: string;
        description: string;
        type: string;

    } | null;
    value: number;
    hours: number;
    total?: number;
}

/*
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
];*/


export function PivotTableNominaDet({ selectedId }: NominaDetPageProps) {

    const { data } = useQuery<NominaDetApi[]>({
        queryKey: ["nomina-det", selectedId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/api/nominaEnc/${selectedId}`, { cache: "no-store" });

            if (!res.ok) {
                throw new Error("Error en la API");
            }
            const json = await res.json();
            return json;
        },
        enabled: !!selectedId,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2
    })

    const rowData = useMemo<RowTypeNominaDet[]>(() => {
        if (!data) return [];

        return data.map((item) => ({
            id: item.id,          // jerarquía
            code: item.concept?.code,
            description: item.concept?.description,
            value: item.value,
            hours: item.hours,
            type: item.concept?.type.trim() as "Devengado" | "Deducido",
            total: item.total,

        }));
    }, [data]);

    return (
        <div className="ag-theme-quartz" style={{ height: 300, width: "100%" }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefsNominaDet}
                localeText={localeES}
                getRowStyle={(params) => {
                    if (params.data?.type === 'Devengado') {
                        return { backgroundColor: '#dcfce7' };
                    }
                    if (params.data?.type === 'Deducido') {
                        return { backgroundColor: '#fee2e2' };
                    }
                    return undefined;
                }}
            />
        </div>
    )
}