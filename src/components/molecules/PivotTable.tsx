"use client"
import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";

import { ColDef } from "ag-grid-community";
import { localeES } from "@/src/es/TextTablePivotSpanish";

// Registrar módulos
ModuleRegistry.registerModules([AllCommunityModule]);

type RowType = {
  name: string;
  age: number;
  country: string;
};

export default function PivotTable() {
    const columnDefs: ColDef<RowType>[] = useMemo(() => [
        { headerName: "Name", field: "name", sortable: true, filter: true },
        { headerName: "Age", field: "age", sortable: true, filter: true },
        { headerName: "Country", field: "country", sortable: true, filter: true },
    ], []);

    const rowData = useMemo(() => [
        { name: "John Doe", age: 28, country: "USA" },
        { name: "Anna Smith", age: 24, country: "UK" },
        { name: "Kevin Brown", age: 32, country: "Canada" },
    ], []);

    return (
        <div className="ag-theme-quartz" style={{ height: 400, width: "100%"}}>
            <AgGridReact
                rowData={rowData}
                localeText={localeES}
                columnDefs={columnDefs}
                pagination={true}
            />
        </div>
    );
}
