import { ColDef } from "ag-grid-community";

export type RowType = {
    id: number;
    period: string;
    accrual: number;
    deducted: number;
};

export const columnDefsNomina: ColDef<RowType>[] = [
    { headerName: "Período", field: "period", sortable: true, filter: true },
    { headerName: "Devengado", field: "accrual", sortable: true, filter: true },
    { headerName: "Deducido", field: "deducted", sortable: true, filter: true },

];
