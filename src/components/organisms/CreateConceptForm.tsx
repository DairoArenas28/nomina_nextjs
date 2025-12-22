import { useState } from "react";
import { ConceptWithoutId } from "@/src/types/concept.type";
import { ConceptFields } from "../molecules/ConceptFields";

interface EditFormProps {
    onSubmit: (data: ConceptWithoutId) => void;
}

export function CreateConceptForm({ onSubmit }: EditFormProps) {
    const [formData, setFormData] = useState<ConceptWithoutId>({
        code: "",
        description: "",
        type: "",
        value: ""
    });

    // 👉 ESTE era el faltante
    const handleChange = (field: keyof ConceptWithoutId, value: string) => {
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
            <ConceptFields data={formData} onChange={handleChange} />

            <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
                Guardar cambios
            </button>
        </form>
    );
}
