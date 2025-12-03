import { useState } from "react";
import { EmployeeFields } from "../molecules/EmployeeFields";
import { Employee } from "@/src/types/employee.type";

interface EditUserFormProps {
    initialData: Employee,
    onSubmit: (data: Employee) => void
}

export function EditEmployeeForm({ initialData, onSubmit }: EditUserFormProps) {

    if (!initialData) {
        return <div>Selecciona un empleado</div>;
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (field: keyof Employee, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <EmployeeFields data={formData} onChange={handleChange} />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Guardar cambios
            </button>
        </form>
    );
}
