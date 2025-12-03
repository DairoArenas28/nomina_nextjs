import { EmployeeWithoutId } from "@/src/types/employee.type";

interface EditUserFieldsProps {
  data?: EmployeeWithoutId;
  onChange?: (field: keyof EmployeeWithoutId, value: string) => void;
}

export function EmployeeFields({ data, onChange }: EditUserFieldsProps) {
  return (
    <div className="max-h-[380px] overflow-y-auto">

      {/* Nombre */}
      <div>
        <label className="font-semibold">Nombre</label>
        <input
          value={data?.name ?? ""}
          onChange={(e) => onChange?.("name", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Edad */}
      <div>
        <label className="font-semibold">Edad</label>
        <input
          type="number"
          value={data?.age ?? ""}
          onChange={(e) => onChange?.("age", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Tipo documento */}
      <div>
        <label className="font-semibold">Tipo de Documento</label>
        <input
          value={data?.documentType ?? ""}
          onChange={(e) => onChange?.("documentType", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Número documento */}
      <div>
        <label className="font-semibold">Número de Documento</label>
        <input
          value={data?.documentNumber ?? ""}
          onChange={(e) => onChange?.("documentNumber", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* País */}
      <div>
        <label className="font-semibold">País</label>
        <input
          value={data?.country ?? ""}
          onChange={(e) => onChange?.("country", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Dirección */}
      <div>
        <label className="font-semibold">Dirección</label>
        <input
          value={data?.address ?? ""}
          onChange={(e) => onChange?.("address", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Teléfono */}
      <div>
        <label className="font-semibold">Teléfono</label>
        <input
          value={data?.phone ?? ""}
          onChange={(e) => onChange?.("phone", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Email */}
      <div>
        <label className="font-semibold">Email</label>
        <input
          value={data?.email ?? ""}
          onChange={(e) => onChange?.("email", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Fecha de contratación */}
      <div>
        <label className="font-semibold">Fecha de Ingreso</label>
        <input
          type="date"
          value={data?.hireDate ? data.hireDate.toString().substring(0, 10) : ""}
          onChange={(e) => onChange?.("hireDate", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Tipo de contrato */}
      <div>
        <label className="font-semibold">Tipo de Contrato</label>
        <input
          value={data?.contractType ?? ""}
          onChange={(e) => onChange?.("contractType", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Cargo */}
      <div>
        <label className="font-semibold">Cargo</label>
        <input
          value={data?.position ?? ""}
          onChange={(e) => onChange?.("position", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Salario */}
      <div>
        <label className="font-semibold">Salario</label>
        <input
          type="number"
          value={data?.salary ?? ""}
          onChange={(e) => onChange?.("salary", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* EPS */}
      <div>
        <label className="font-semibold">EPS</label>
        <input
          value={data?.eps ?? ""}
          onChange={(e) => onChange?.("eps", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Pensión */}
      <div>
        <label className="font-semibold">Pensión</label>
        <input
          value={data?.pension ?? ""}
          onChange={(e) => onChange?.("pension", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* ARL */}
      <div>
        <label className="font-semibold">ARL</label>
        <input
          value={data?.arl ?? ""}
          onChange={(e) => onChange?.("arl", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Banco */}
      <div>
        <label className="font-semibold">Banco</label>
        <input
          value={data?.bank ?? ""}
          onChange={(e) => onChange?.("bank", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Tipo de cuenta */}
      <div>
        <label className="font-semibold">Tipo de Cuenta</label>
        <input
          value={data?.accountType ?? ""}
          onChange={(e) => onChange?.("accountType", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Número de cuenta */}
      <div>
        <label className="font-semibold">Número de Cuenta</label>
        <input
          value={data?.accountNumber ?? ""}
          onChange={(e) => onChange?.("accountNumber", e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
    </div>
  );
}
