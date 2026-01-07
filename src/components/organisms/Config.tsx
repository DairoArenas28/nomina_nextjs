'use client'
import { useEffect, useState } from "react";
import { ConfigFields } from "../molecules/ConfigFields";
import type { Config } from "@/src/types/config.type";
import { useQuery } from "@tanstack/react-query";
import { useConfigUpdate } from "@/src/hooks/config.hook";


export function Config() {

    const updateMutation = useConfigUpdate()

    const { data: config, isSuccess } = useQuery({
        queryKey: ["config"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/config");
            if (!res.ok) {
                throw new Error("Error al obtener configuración");
            }
            return res.json();
        }
    });

    //console.log('config en config organism', config);

    const [formData, setFormData] = useState<Config>(config || {
        id: 0,
        smlv: 0,
        transportNumberSalaryRequirement: 0,
        transportValueSalaryRequirement: 0,
        transportAllowanceValue: 0,
        healthEmployeePercent: 0,
        healthEmployerPercent: 0,
        pensionEmployeePercent: 0,
        pensionEmployerPercent: 0,
        occupationalRiskPercent: 0,
        socialSecurityBase: 0
    })

    useEffect(() => {
        if (isSuccess && config) {
            setFormData(config);
        }
    }, [config, isSuccess]);


    const handleChange = (field: keyof Config, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario
        console.log("Mutable", formData);
        updateMutation.mutate(formData)
    }

    return (
        <div className="h-full w-full bg-white rounded-2xl">
            <form onSubmit={handleSubmit} className="p-4">
                <ConfigFields data={formData} onChange={handleChange} />
                <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer mt-4 w-full">
                    Guardar cambios
                </button>
            </form>
        </div>
    )
}