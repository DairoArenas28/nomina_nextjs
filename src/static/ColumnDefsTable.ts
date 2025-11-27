
import { ColDef } from "ag-grid-community";

export type RowType = {
    id: number;
    name: string;
    age: number;
    documentType: string;
    documentNumber: string;
    country: string;
    address: string;
    phone: string;
    email: string;

    hireDate: string;
    contractType: string;
    position: string;
    salary: number;

    eps: string;
    pension: string;
    arl: string;

    bank: string;
    accountType: string;
    accountNumber: string;
};


export const columnDefsEmployee: ColDef<RowType>[] = [
    { headerName: "Nombre completo", field: "name", sortable: true, filter: true },
    { headerName: "Edad del empleado", field: "age", sortable: true, filter: true },
    { headerName: "Tipo de documento", field: "documentType", sortable: true, filter: true },
    { headerName: "Número del documento", field: "documentNumber", sortable: true, filter: true },
    { headerName: "País de residencia", field: "country", sortable: true, filter: true },
    { headerName: "Dirección del empleado", field: "address", sortable: true, filter: true },
    { headerName: "Teléfono", field: "phone", sortable: true, filter: true },
    { headerName: "Correo electrónico", field: "email", sortable: true, filter: true },
    { headerName: "Fecha de ingreso", field: "hireDate", sortable: true, filter: true },
    { headerName: "Tipo de contrato", field: "contractType", sortable: true, filter: true },
    { headerName: "Cargo del empleado", field: "position", sortable: true, filter: true },
    { headerName: "Salario base mensual", field: "salary", sortable: true, filter: true },
    { headerName: "Entidad promotora de salud", field: "eps", sortable: true, filter: true },
    { headerName: "Fondo de pensiones", field: "pension", sortable: true, filter: true },
    { headerName: "Administradora de riesgos laborales", field: "arl", sortable: true, filter: true },
    { headerName: "Banco donde recibe el pago", field: "bank", sortable: true, filter: true },
    { headerName: "Tipo de cuenta", field: "accountType", sortable: true, filter: true },
    { headerName: "Número de cuenta", field: "accountNumber", sortable: true, filter: true },
];