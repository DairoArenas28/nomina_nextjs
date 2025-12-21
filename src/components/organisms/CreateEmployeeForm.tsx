import { useState } from "react";
import { EmployeeFields } from "../molecules/EmployeeFields";
import { EmployeeWithoutId } from "@/src/types/employee.type";

interface EditEmployeeFormProps {
    onSubmit: (data: EmployeeWithoutId) => void;
}

export function CreateEmployeeForm({ onSubmit }: EditEmployeeFormProps) {
    const [formData, setFormData] = useState<EmployeeWithoutId>({
        name: "",
        age: 0,
        documentType: "",
        documentNumber: "",
        country: "",
        address: "",
        phone: "",
        email: "",
        hireDate: "",
        contractType: "",
        position: "",
        salary: 0,
        eps: "",
        pension: "",
        arl: "",
        bank: "",
        accountType: "",
        accountNumber: "",
    });

    const handleChange = (field: keyof EmployeeWithoutId, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData); // enviar el formulario al padre
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
