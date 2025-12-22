import { localeES } from "@/src/es/TextTablePivotSpanish";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useRef } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

interface DataEntryTableProps<T> {
    rowData: T[];
    columnDefs: any[];

    /** Crea una fila vacía */
    createEmptyRow: () => T;

    /** Campo que dispara la acción al tabular */
    triggerField?: keyof T;

    /** Acción al salir de la celda (ej: buscar en backend) */
    onTrigger?: (value: any, params: any) => Promise<void>;

    /** Columna que entra en edición al crear fila */
    startEditColKey?: string;

    onRowsChange: (rows: T[]) => void;

    height?: number;
}

export function DataEntryTable<T>({
    rowData,
    columnDefs,
    createEmptyRow,
    triggerField,
    onTrigger,
    startEditColKey,
    onRowsChange,
    height = 400
}: DataEntryTableProps<T>) {

    const gridRef = useRef<AgGridReact>(null);

    const emitRows = () => {
        if (!onRowsChange || !gridRef.current) return;

        const rows: T[] = [];
        gridRef.current.api.forEachNode(node => {
            rows.push(node.data);
        });

        onRowsChange(rows);
    };

    const addRow = () => {
        const res = gridRef.current?.api.applyTransaction({
            add: [createEmptyRow()]
        });

        //emitRows();

        if (!res || !startEditColKey) return;

        const rowNode = res.add[0];

        gridRef.current?.api.startEditingCell({
            rowIndex: rowNode.rowIndex!,
            colKey: startEditColKey
        });
    };

    const onCellEditingStopped = async (params: any) => {
        if (triggerField && onTrigger && params.colDef.field === triggerField && params.value) {
            await onTrigger(params.value, params);
        }

        emitRows();  // ✅ sincroniza estado
    };


    return (
        <div
            className="ag-theme-quartz w-full"
            style={{ height, width: "100%" }}
        >
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={addRow}
                    className="px-3 py-1 bg-blue-600 text-white rounded my-3 cursor-pointer"
                >
                    + Agregar línea
                </button>
            </div>

            <AgGridReact
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                localeText={localeES}
                defaultColDef={{
                    editable: true,
                    resizable: true
                }}
                rowSelection={{
                    mode: "singleRow",
                    enableClickSelection: true
                }}
                onCellEditingStopped={onCellEditingStopped}
            />
        </div>
    );
}
