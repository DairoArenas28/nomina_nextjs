'use client'

import { Config } from "@/src/types/config.type";
import { ChangeEvent, useEffect, useState } from "react"

interface Props {
    data: Config;
    onChange?: (field: keyof Config, value: string) => void;
}

export function ConfigFields({ data, onChange }: Props) {

    console.log('config fields ', data);

    console.log('data en config fields', data.transportValueSalaryRequirement.toString());

    const [transportValue, setTransportValue] = useState(data.transportValueSalaryRequirement.toString());

    useEffect(() => {
        setTransportValue(
            data.transportValueSalaryRequirement.toString()
        );
    }, [data.transportValueSalaryRequirement]);

    //console.log('data en config fields', data);

    const changeTransportValue = (e: ChangeEvent<HTMLInputElement>) => {
        const calculatedValue = Number(e.target.value) * Number(data.smlv);
        onChange && onChange("transportNumberSalaryRequirement", e.target.value)
        onChange && onChange("transportValueSalaryRequirement", calculatedValue.toString())
        setTransportValue(calculatedValue.toString());
    }

    return (
        <>
            <fieldset className="border border-gray-900 rounded-lg p-6 bg-white m-3">
                <legend className="bg-white px-2 text-lg font-bold text-gray-900">
                    Configuración Básica
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                    <div>
                        <label className="font-semibold">
                            Salario mínimo legal vigente (SMLV)
                        </label>
                        <input
                            name="smlv"
                            type="number"
                            defaultValue={data.smlv}
                            onChange={(e) => onChange && onChange("smlv", e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold">
                            Requisito auxilio
                        </label>

                        <div className="flex rounded-md focus-within:ring-2 focus-within:ring-gray-900">
                            <input
                                name="transportNumberSalaryRequirement"
                                type="number"
                                defaultValue={data.transportNumberSalaryRequirement}
                                onChange={changeTransportValue}
                                className="border border-gray-900 p-2 rounded-l-md w-2/6 focus:outline-none"
                                placeholder="SMLV"
                            />
                            <input
                                name="transportValueSalaryRequirement"
                                defaultValue={transportValue}
                                className="border border-l-0 border-gray-900 p-2 rounded-r-md w-full bg-gray-200 cursor-not-allowed focus:outline-none"
                                disabled
                                placeholder="Valor calculado"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold">
                            Auxilio de transporte
                        </label>
                        <input
                            name="transportAllowanceValue"
                            defaultValue={data.transportAllowanceValue}
                            onChange={(e) => onChange && onChange("transportAllowanceValue", e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>

            <fieldset className="border border-gray-900 rounded-lg p-6 bg-white m-3">
                <legend className="bg-white px-2 text-lg font-bold text-gray-900">
                    Configuración seguridad social
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div>
                        <label className="font-semibold block mb-1">
                            Porcentaje Salud (empleado)
                        </label>
                        <input
                            name="healthEmployeePercent"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="%"
                            defaultValue={data.healthEmployeePercent}
                            onChange={(e) => onChange && onChange("healthEmployeePercent", e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">
                            Porcentaje Salud (empleador)
                        </label>
                        <input
                            name="healthEmployerPercent"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="%"
                            defaultValue={data.healthEmployerPercent}
                            onChange={(e) => onChange && onChange('healthEmployerPercent', e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">
                            Porcentaje Pensión (empleado)
                        </label>
                        <input
                            name="pensionEmployeePercent"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="%"
                            defaultValue={data.pensionEmployeePercent}
                            onChange={(e) => onChange && onChange('pensionEmployeePercent', e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">
                            Porcentaje Pensión (empleador)
                        </label>
                        <input
                            name="pensionEmployerPercent"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="%"
                            defaultValue={data.pensionEmployerPercent}
                            onChange={(e) => onChange && onChange('pensionEmployerPercent', e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">
                            Porcentaje Riesgos Laborales
                        </label>
                        <input
                            name="occupationalRiskPercent"
                            type="number"
                            step="0.01"
                            min="0"
                            max="100"
                            placeholder="%"
                            defaultValue={data.occupationalRiskPercent}
                            onChange={(e) => onChange && onChange('occupationalRiskPercent', e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="font-semibold block mb-1">
                            Base para Seguridad Social
                        </label>
                        <input
                            name="socialSecurityBase"
                            type="number"
                            placeholder="COP"
                            defaultValue={data.socialSecurityBase}
                            onChange={(e) => onChange && onChange('socialSecurityBase', e.target.value)}
                            className="border border-gray-900 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </fieldset>
        </>
    )
}