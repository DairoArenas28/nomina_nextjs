import { ColDef } from "ag-grid-community";

export type RowType = {
    id: number;
    code:string;
    period: string;
    state:string;
    accrual: number;
    deducted: number;
    total: number;
};

export const columnDefsNomina: ColDef<RowType>[] = [
    { headerName: "Código", field: "code", sortable: true, filter: false },
    { headerName: "Período", field: "period", sortable: true, filter: true },
    { headerName: "Estado", field: "state", sortable: true, filter: true },
    { headerName: "Devengado", field: "accrual", sortable: true, filter: true },
    { headerName: "Deducido", field: "deducted", sortable: true, filter: true },
    { headerName: "Total", field: "total", sortable: true, filter: true },

];
