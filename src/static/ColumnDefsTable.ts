
import { ColDef } from "ag-grid-community";

export type RowTypeEmployee = {
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

export type RowTypeConcept = {

    id: number,
    code: string,
    description: string
    type: string
    value: string

}


export const columnDefsEmployee: ColDef<RowTypeEmployee>[] = [
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

export const columnDefsConcept: ColDef<RowTypeConcept>[] = [
    { headerName: "Código", field: "code", sortable: true, filter: true },
    { headerName: "Descripción", field: "description", sortable: true, filter: true },
    { headerName: "Tipo Concepto", field: "type", sortable: true, filter: true },
    { headerName: "Tipo Valor", field: "value", sortable: true, filter: true },

]