'use client';
import { localeES } from "@/src/es/TextTablePivotSpanish";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

interface Props {
    columnDefs: any[];
}

export function PivotTableEnc({ columnDefs }: Props) {
    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%" }}>
            <AgGridReact
                rowData={[]}
                columnDefs={columnDefs}
                pagination={true}   
                localeText={localeES}         
            />
        </div>
    )
}