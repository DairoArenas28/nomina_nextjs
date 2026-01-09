"use client";

import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type { GridApi } from "ag-grid-community";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import ModalForm from "./ModalForm";
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { QueryObserverResult, UseMutationResult } from "@tanstack/react-query";
import { swalSuccess, swalError, swalConfirmDelete } from "@/src/lib/swal";
import { FORM_MAP } from "@/src/config/form-map";

ModuleRegistry.registerModules([AllCommunityModule]);

export interface PivotTableProps { data: any[]; columnDefs: any[]; onRefetch: () => Promise<QueryObserverResult<any[], Error>>; isFetching: boolean; createHooks: UseMutationResult<unknown, Error, any, unknown>; updateHooks: UseMutationResult<unknown, Error, { id: number } & any, unknown>; deleteHooks: UseMutationResult<unknown, Error, number, unknown>; entity: string; }

export default function PivotTable({
    data,
    columnDefs,
    onRefetch,
    isFetching,
    createHooks,
    updateHooks,
    deleteHooks,
    entity,
}: PivotTableProps) {
    const gridRef = useRef<AgGridReact<any>>(null);
    const [api, setApi] = useState<GridApi | null>(null);

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<"create" | "edit">("create");
    const [idSelected, setIdSelected] = useState<number | null>(null);

    const getSelectedId = () => {
        const selected = gridRef.current?.api.getSelectedRows() ?? [];
        return selected.length ? selected[0].id : null;
    };

    const openCreate = () => {
        setMode("create");
        setOpen(true);
    };

    const openEdit = () => {
        const id = getSelectedId();
        if (!id) return Swal.fire("Seleccione un registro");
        setIdSelected(id);
        setMode("edit");
        setOpen(true);
    };

    const deleteSelected = async () => {
        const id = getSelectedId();
        if (!id) {
            Swal.fire("Seleccione un registro");
            return;
        }

        const result = await swalConfirmDelete();
        if (!result.isConfirmed) return;

        deleteHooks.mutate(id, {
            onSuccess: () => swalSuccess("¡Registro Eliminado!"),
            onError: () => swalError("No se pudo eliminar el registro"),
        });
    };

    const record = data.find((x) => x.id === idSelected);
    const FormComponent = FORM_MAP[entity]?.[mode];

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            {/* Toolbar */}
            <div className="flex mb-3 flex-row justify-between">
                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            api?.exportDataAsCsv({
                                fileName: `${entity}.csv`,
                                columnSeparator: ";",
                                suppressQuotes: true,
                            })
                        }
                        className="p-2 bg-sky-600  text-white rounded-xl cursor-pointer"
                    >
                        Exportar
                    </button>

                    <button
                        onClick={onRefetch}
                        disabled={isFetching}
                        className="p-2 bg-sky-600  text-white rounded-xl cursor-pointer"
                    >
                        {isFetching ? "Cargando..." : "Consultar"}
                    </button>
                </div>

                <div className="flex gap-2">
                    <input
                        placeholder="Buscar..."
                        onChange={(e) =>
                            gridRef.current?.api.setGridOption(
                                "quickFilterText",
                                e.target.value
                            )
                        }
                        className="p-2 rounded-xl bg-gray-200 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button onClick={openCreate} className="rounded-xl p-2 bg-green-600 text-white cursor-pointer">
                        Crear
                    </button>

                    <button onClick={openEdit} className="p-2 bg-blue-600 text-white rounded-xl cursor-pointer">
                        Editar
                    </button>

                    <button onClick={deleteSelected} className="p-2 bg-red-600 text-white rounded-xl cursor-pointer">
                        Eliminar
                    </button>
                </div>
            </div>

            {/* Grid */}
            <AgGridReact
                ref={gridRef}
                rowData={data}
                columnDefs={columnDefs}
                localeText={localeES}
                pagination
                rowSelection={{ mode: "multiRow", enableClickSelection: true }}
                onGridReady={(p) => setApi(p.api)}
            />

            {/* Modal */}
            <ModalForm isOpen={open} onClose={() => setOpen(false)}>
                {FormComponent ? (
                    <FormComponent
                        initialData={record}
                        onSubmit={(payload: any) => {
                            const mutate =
                                mode === "create"
                                    ? createHooks.mutate
                                    : updateHooks.mutate;

                            mutate(
                                mode === "edit"
                                    ? { id: idSelected, ...payload }
                                    : payload,
                                {
                                    onSuccess: () =>
                                        swalSuccess(
                                            mode === "create"
                                                ? "¡Registro Creado!"
                                                : "¡Registro Actualizado!"
                                        ),
                                    onError: (e) =>
                                        swalError("No se pudo completar la operación" + e),
                                }
                            );

                            setOpen(false);
                        }}
                    />
                ) : (
                    <div>No existe formulario para esta entidad</div>
                )}
            </ModalForm>
        </div>
    );
}

