import { PayrollSchemeEnc } from "@/src/entities/PayrollSchemeEnc";
import { EmployeeWithoutId } from "@/src/types/employee.type";
import { useQuery } from "@tanstack/react-query";
import { LocationSelector } from "../organisms/LocationSelector/LocationSelector";
import { InputField } from "./UI/InputField";
import { SelectField } from "./UI/SelectField";
import { BankAccountTypeLabel, BankLabel, ContractTypeLabel, DocumentTypeLabel, JobPositionLabel } from "@/src/constants";

interface EditEmployeeFieldsProps {
  data?: EmployeeWithoutId;
  onChange?: (field: keyof EmployeeWithoutId, value: string) => void;
}

export function EmployeeFields({ data, onChange }: EditEmployeeFieldsProps) {

  const { data: payrollSchemes } = useQuery<PayrollSchemeEnc[]>({
    queryKey: ["payrollSchemes"],
    queryFn: async () => {
      const res = await fetch("/api/payroll");
      return res.json();
    }
  });

  console.log(payrollSchemes);

  return (
    <div className="max-h-[600px] overflow-y-auto p-3 space-y-6">

      {/* === INFORMACIÓN PERSONAL === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nombre */}
          <InputField
            labelProps={{children:"Nombre"}}
            inputProps={{
              value: data?.name ?? "",
              onChange: (e) => onChange?.("name", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Edad */}
          <InputField
            labelProps={{children:"Edad"}}
            inputProps={{
              value: data?.age ?? "",
              onChange: (e) => onChange?.("age", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />
        </div>
      </section>

      {/* === DOCUMENTO Y CONTACTO === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Documento & Contacto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Tipo documento */}

          <SelectField
            labelProps={{children: 'Tipo de Documento'}}
            selectProps={{
              value: data?.documentType ?? "", 
              onChange:  (e) => onChange?.("documentType", e.target.value),
              className: 'border p-2 rounded w-full'
            }}
            options={DocumentTypeLabel}
          />

          {/* Número documento */}
          <InputField
            labelProps={{children:"Número de Documento"}}
            inputProps={{
              value: data?.documentNumber ?? "",
              onChange: (e) => onChange?.("documentNumber", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Localizacion */}

          <div className="md:col-span-2">
            <LocationSelector
              value={{
                country: data?.country ?? '',
                state: data?.state ?? '',
                city: data?.city ?? ''
              }}
              onChange={(location) => {
                onChange?.('country', location.country);
                onChange?.('state', location.state);
                onChange?.('city', location.city);
              }}
            />
          </div>

          {/* Dirección */}
          <InputField
            labelProps={{children:"Dirección"}}
            inputProps={{
              value: data?.address ?? "",
              onChange: (e) => onChange?.("address", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Teléfono */}
          <InputField
            labelProps={{children:"Teléfono"}}
            inputProps={{
              value: data?.phone ?? "",
              onChange: (e) => onChange?.("phone", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Email */}
          <InputField
            labelProps={{children:"Email"}}
            inputProps={{
              value: data?.email ?? "",
              onChange: (e) => onChange?.("email", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

        </div>
      </section>

      {/* === LABORAL === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Información Laboral</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Fecha de ingreso */}
          <InputField
            labelProps={{children:"Fecha de Ingreso"}}
            inputProps={{
              type: 'date',
              value: data?.hireDate ? data.hireDate.toString().substring(0, 10) : "",
              onChange: (e) => onChange?.("hireDate", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Tipo de contrato */}
          <SelectField
            labelProps={{children: 'Tipo de Contrato' }}
            selectProps={{
              value: data?.contractType ?? "",
              onChange: (e) => onChange?.("contractType", e.target.value),
              className: 'border p-2 rounded w-full'
            }}
            options={ContractTypeLabel}
          />

          {/* Cargo */}

          <SelectField
            labelProps={{children: 'Cargo'}}
            selectProps={{
              value: data?.position ?? "",
              onChange: (e) => onChange?.("position", e.target.value),
              className: 'border p-2 rounded w-full'
            }}
            options={JobPositionLabel}
          />

          {/* Salario */}
          <InputField
            labelProps={{children:"Salario"}}
            inputProps={{
              type: 'number',
              value: data?.salary ?? "",
              onChange: (e) => onChange?.("salary", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Plantilla */}
          <SelectField
            labelProps={{children: 'Plantilla'}}
            selectProps={{
              value: data?.payrollSchemeEnc_id ?? "",
              onChange: (e) => onChange?.("payrollSchemeEnc_id", e.target.value),
              className: 'border p-2 rounded w-full'
            }}
          >
            {payrollSchemes?.map((scheme) => (
                <option key={scheme.id} value={scheme.id}>
                  {scheme.description}
                </option>
              ))}
          </SelectField>

        </div>
      </section>

      {/* === SEGURIDAD SOCIAL === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Seguridad Social</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* EPS */}
          <InputField
            labelProps={{children:"EPS"}}
            inputProps={{
              type: 'text',
              value: data?.eps ?? "",
              onChange: (e) => onChange?.("eps", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* Pensión */}
          <InputField
            labelProps={{children:"Pensión"}}
            inputProps={{
              type: 'text',
              value: data?.pension ?? "",
              onChange: (e) => onChange?.("pension", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

          {/* ARL */}
          <InputField
            labelProps={{children:"ARL"}}
            inputProps={{
              type: 'text',
              value: data?.arl ?? "",
              onChange: (e) => onChange?.("arl", e.target.value),
              className: "border p-2 rounded w-full"
            }}
          />

        </div>
      </section>

      {/* === INFORMACIÓN BANCARIA === */}
      <section>
        <h3 className="font-bold text-lg mb-2">Información Bancaria</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Banco */}
          <SelectField
            labelProps={{children: 'Tipo de Cuenta'}}
            selectProps={{
              value: data?.bank ?? "",
              onChange:(e) => onChange?.("bank", e.target.value),
              className:"border p-2 rounded w-full"
            }}
            options={BankLabel}
          />

          {/* Tipo de cuenta */}
          <SelectField
            labelProps={{children: 'Tipo de Cuenta'}}
            selectProps={{
              value: data?.accountType ?? "",
              onChange:(e) => onChange?.("accountType", e.target.value),
              className:"border p-2 rounded w-full"
            }}
            options={BankAccountTypeLabel}
          />

          {/* Número de cuenta */}
          <InputField
            labelProps={{children: 'Número de Cuenta'}}
            inputProps={{
              value: data?.accountNumber ?? "",
              onChange: (e) => onChange?.("accountNumber", e.target.value),
              className: 'border p-2 rounded w-full'
            }}
          />

        </div>
      </section>

    </div>
  );
}
