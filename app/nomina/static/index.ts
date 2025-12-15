import { ColDef } from "ag-grid-community";

export type RowTypeNomina = {
    id: number;
    code:string;
    period: string;
    state:string;
    accrual: number;
    deducted: number;
    total: number;
};

export type RowTypeNominaEnc = {
    id: number;
    code:string;
    employeeName: string;
    documentNumber:string;
    position:string;
    department:string;
};


export const columnDefsNomina: ColDef<RowTypeNomina>[] = [
    { headerName: "Código", field: "code", sortable: true, filter: false },
    { headerName: "Período", field: "period", sortable: true, filter: true },
    { headerName: "Estado", field: "state", sortable: true, filter: true },
    { headerName: "Devengado", field: "accrual", sortable: true, filter: true },
    { headerName: "Deducido", field: "deducted", sortable: true, filter: true },
    { headerName: "Total", field: "total", sortable: true, filter: true },

];

export const columnDefsNominaEnc: ColDef<RowTypeNominaEnc>[] = [
    { headerName: "Código", field: "code", sortable: true, filter: false },
    { headerName: "Nombre Empleado", field: "employeeName", sortable: true, filter: true },
    { headerName: "Número Documento", field: "documentNumber", sortable: true, filter: true },
    { headerName: "Cargo", field: "position", sortable: true, filter: true },
    { headerName: "Departamento", field: "department", sortable: true, filter: true },
];


