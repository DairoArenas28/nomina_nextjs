import { Employee } from "@/src/types/employee.type";

interface EditUserFieldsProps {
    data: Employee,
    onChange: (field: keyof Employee, value: string) => void
}

export function EditUserFields({ data, onChange }: EditUserFieldsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="font-semibold">Nombre</label>
        <input
          value={data.name}
          onChange={e => onChange("name", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <label className="font-semibold">Email</label>
        <input
          value={data.email}
          onChange={e => onChange("email", e.target.value)}
          className="border p-2 rounded"
        />
      </div>
    </div>
  );
}