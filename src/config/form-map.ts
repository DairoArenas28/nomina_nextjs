import { CreateConceptForm } from "../components/organisms/CreateConceptForm";
import { CreateEmployeeForm } from "../components/organisms/CreateEmployeeForm";
import { CreatePayrollForm } from "../components/organisms/CreatePayrollForm";
import { EditConceptForm } from "../components/organisms/EditConceptForm";
import { EditEmployeeForm } from "../components/organisms/EditEmployeForm";
import { EditPayrollForm } from "../components/organisms/EditPayrollForm";


export const FORM_MAP: Record<
  string,
  {
    create?: React.FC<any>;
    edit?: React.FC<any>;
  }
> = {
  employee: {
    create: CreateEmployeeForm,
    edit: EditEmployeeForm,
  },
  concept: {
    create: CreateConceptForm,
    edit: EditConceptForm,
  },
  payroll: {
    create: CreatePayrollForm,
    edit: EditPayrollForm,
  },
};
