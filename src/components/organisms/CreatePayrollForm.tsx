import { PayrollSchemeTypeExtend } from "@/src/types/payroll.type";
import { PayrollFields } from "../molecules/PayrollFields";
import { useState } from "react";

export function CreatePayrollForm({ onSubmit }: { onSubmit: (data: PayrollSchemeTypeExtend) => void }) {

    const [formData, setFormData] = useState<PayrollSchemeTypeExtend>({
        code: "",
        description: "",
        payFrequency: "",
        hoursPerDay: 0,
        workingDaysPerWeek: 0,
        totalHoursPeriod: 0,
        hasVacation: false,
        hasBonus: false,
        hasLiquidation: false,
        payrollSchemeDet: [
            {
                concept_id: 0,
                concept_code: '',
                concept_description: '',
                value: 0,
                hours: 0
            }
        ]
    });

const handleChange = (field: keyof PayrollSchemeTypeExtend, value: string) => {
    setFormData(prev => ({
        ...prev,
        [field]: value,
    }));
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // enviar el formulario al padre
}


return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <PayrollFields data={formData} setFormData= {setFormData} onChange={handleChange} />
        <button className="bg-blue-600 text-white mt-12 px-4 py-2 rounded w-full cursor-pointer">
            Guardar cambios
        </button>
    </form>
);
}