import { PayrollSchemeType, PayrollSchemeTypeExtend } from "@/src/types/payroll.type"
import { PayrollFields } from "../molecules/PayrollFields"
import { useState } from "react";

interface EditFormProps {
    initialData: PayrollSchemeTypeExtend,
    onSubmit: (data: PayrollSchemeTypeExtend) => void
}

export function EditPayrollForm({ initialData, onSubmit }: EditFormProps) {

    if (!initialData) {
        return <div>Selecciona una plantilla</div>;
    }

    const [formData, setFormData] = useState<PayrollSchemeTypeExtend>(initialData);

    const handleChange = (field: keyof PayrollSchemeTypeExtend, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <PayrollFields data={initialData} onChange={handleChange} />
        </form>
    )
}