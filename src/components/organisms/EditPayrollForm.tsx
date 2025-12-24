'use client'
import { PayrollSchemeType, PayrollSchemeTypeExtend } from "@/src/types/payroll.type"
import { PayrollFields } from "../molecules/PayrollFields"
import { useEffect, useState } from "react";

interface EditFormProps {
    initialData: PayrollSchemeTypeExtend,
    onSubmit: (data: PayrollSchemeTypeExtend) => void
}

export function EditPayrollForm({ initialData, onSubmit }: EditFormProps) {

    const [formData, setFormData] = useState<PayrollSchemeTypeExtend>(initialData);

    // 🔥 sincroniza cuando cambie el registro a editar
    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (field: keyof PayrollSchemeTypeExtend, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <PayrollFields data={formData} onChange={handleChange} />
            <button className="bg-blue-600 text-white mt-12 px-4 py-2 rounded w-full cursor-pointer">
                Guardar cambios
            </button>
        </form>
    )
}