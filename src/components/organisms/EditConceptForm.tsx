import { useState } from "react";
import { ConceptWithoutId } from "@/src/types/concept.type";
import { ConceptFields } from "../molecules/ConceptFields";

interface EditFormProps {
    initialData: ConceptWithoutId,
    onSubmit: (data: ConceptWithoutId) => void
}

export function EditConceptForm({ initialData, onSubmit }: EditFormProps) {

    if (!initialData) {
        return <div>Selecciona un concepto</div>;
    }

    const [formData, setFormData] = useState(initialData);

    const handleChange = (field: keyof ConceptWithoutId, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <ConceptFields data={formData} onChange={handleChange} />

            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                Guardar cambios
            </button>
        </form>
    );
}
