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

            <div className="flex mb-3 flex-row justify-between">
                <div>
                    <button
                        onClick={() => api?.exportDataAsCsv({
                            fileName: nameCSV + ".csv",
                            columnSeparator: ";",
                            suppressQuotes: true
                        })}
                        className="p-2 bg-sky-600  text-white rounded-xl cursor-pointer"
                    >
                        Exportar a Excel
                    </button>


                </div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        onChange={(e) =>
                            gridRef.current?.api.setGridOption("quickFilterText", e.target.value)
                        }
                        className="p-2 rounded-xl bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button onClick={handleGetSelected} className="rounded-xl p-2 bg-green-600 text-white cursor-pointer">
                        Visualizar
                    </button>

                    <button onClick={handleGetSelected} className="rounded-xl p-2 bg-blue-500 text-white cursor-pointer">
                        Editar
                    </button>

                    <button onClick={handleGetSelected} className="rounded-xl p-2 bg-red-500 text-white cursor-pointer">
                        Eliminar
                    </button>
                </div>
            </div>

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
