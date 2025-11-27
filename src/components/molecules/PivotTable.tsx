"use client"
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

import type { GridApi } from "ag-grid-community";

import { localeES } from "@/src/es/TextTablePivotSpanish";
import { columnDefsEmployee, RowType } from "@/src/static/ColumnDefsTable";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Employee } from "@/src/types/employee.type";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    data: Employee[];
}


export default function PivotTable({ data }: Props) {

    const [api, setApi] = useState<GridApi | null>(null);

    const gridRef = useRef<AgGridReact<RowType>>(null);

    const path = usePathname()

    const nameCSV = path.replace("/", "")

    const handleGetSelected = () => {
        const selected = gridRef.current?.api.getSelectedRows() ?? [];
        // ejemplo: obtener solo los nombres
        const names = selected.map((row) => row.id);

        console.log("Seleccionados:", names);
    };

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>

            <button
                onClick={() => api?.exportDataAsCsv({
                    fileName: nameCSV + ".csv",
                    columnSeparator: ";",
                    suppressQuotes: true
                })}
                className="mb-3 px-4 py-2 bg-sky-600 text-white rounded"
            >
                Exportar a Excel
            </button>

            <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) =>
                    gridRef.current?.api.setGridOption("quickFilterText", e.target.value)
                }
                className="border p-2 rounded"
            />

            <button onClick={handleGetSelected} className="p-2 bg-blue-500 text-white">
                Ver seleccionados
            </button>

            <AgGridReact
                ref={gridRef}
                rowSelection={{
                    mode: "multiRow",
                    enableClickSelection: true   // ⬅️ reemplazo oficial
                }}
                rowData={data}
                localeText={localeES}
                columnDefs={columnDefsEmployee}
                onGridReady={(params) => setApi(params.api)}
                pagination={true}
            />
        </div>
    );
}
