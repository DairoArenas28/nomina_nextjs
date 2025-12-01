"use client"
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

import type { GridApi } from "ag-grid-community";

import { localeES } from "@/src/es/TextTablePivotSpanish";
import { RowType } from "@/src/static/ColumnDefsTable";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Employee } from "@/src/types/employee.type";
import { UseMutationResult } from "@tanstack/react-query";
import ModalForm from "./ModalForm";
import { EditUserForm } from "../organisms/EditEmployeForm";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    data: Employee[];
    columnDefs: any[];
    deleteHooks: UseMutationResult<unknown, Error, number, unknown>
    entity: "employee";
}


export default function PivotTable({ data, columnDefs, deleteHooks, entity }: Props) {

    const [api, setApi] = useState<GridApi | null>(null);

    const gridRef = useRef<AgGridReact<RowType>>(null);

    const [open, setOpen] = useState(false);

    const [idSelected, setIdSelected] = useState(0)

    const [mode, setMode] = useState<"create" | "edit">("create");

    const handleGetSelected = () => {
        const selected = gridRef.current?.api.getSelectedRows() ?? [];
        // ejemplo: obtener solo los nombres
        const id = selected.map((row) => row.id);

        deleteHooks.mutate(id[0])
        //console.log("Seleccionados:", names);
    };

    const handleEditSelected = () => {
        const selected = gridRef.current?.api.getSelectedRows() ?? [];
        if (selected.length === 0) return alert("Seleccione un registro");

        setIdSelected(selected[0].id);
        setMode("edit");
        setOpen(true);
    };

    const handleDeleteSelected = () => {
        const selected = gridRef.current?.api.getSelectedRows() ?? [];

        if (selected.length === 0) {
            alert("Seleccione un registro");
            return;
        }

        const id = selected[0].id;

        deleteHooks.mutate(id);
    };

    function FormResolver() {
        const record = data.find(x => x.id === idSelected);

        if (entity === "employee" && mode === "edit") {
            return (
                <EditUserForm
                    initialData={record!}
                    onSubmit={(updatedData) => {
                        console.log("Empleado actualizado", updatedData);
                        setOpen(false);
                    }}
                />
            );
        }

        /*if (entity === "employee" && mode === "create") {
            return (
                <CreateEmployeeForm
                    onSubmit={(newData) => {
                        console.log("Empleado creado", newData);
                        setOpen(false);
                    }}
                />
            );
        }*/

        // Puedes extender así con product, roles, etc.
        return <div>No existe formulario para esta operación</div>;
    }

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>

            <div className="flex mb-3 flex-row justify-between">
                <div>
                    <button
                        onClick={() => api?.exportDataAsCsv({
                            fileName: entity + ".csv",
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

                    <button onClick={handleEditSelected} className="rounded-xl p-2 bg-blue-500 text-white cursor-pointer">
                        Editar
                    </button>

                    <button onClick={handleDeleteSelected} className="rounded-xl p-2 bg-red-500 text-white cursor-pointer">
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
                columnDefs={columnDefs}
                onGridReady={(params) => setApi(params.api)}
                pagination={true}
            />

            <ModalForm isOpen={open} onClose={() => setOpen(false)}>
                <FormResolver />
            </ModalForm>
        </div>
    );
}
