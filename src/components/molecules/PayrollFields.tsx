'use client'
import { PayrollSchemeTypeExtend } from "@/src/types/payroll.type";
import { DataEntryTable } from "./DataEntryTable";
import { columnDefsPayrollSchemeDet } from "@/src/static/ColumnDefsTable";


export function PayrollFields({ data, onChange }: { data: PayrollSchemeTypeExtend; onChange: (field: keyof PayrollSchemeTypeExtend, value: any) => void }) {

    const payrollSchemeDet = data.payrollSchemeDet
    console.log(data)
    console.log(payrollSchemeDet)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="font-semibold">Código</label>
                <input
                    type="text"
                    value={data.code}
                    onChange={(e) => onChange("code", e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            {/* Add more fields as needed */}
            <div>
                <label className="font-semibold">Descripción</label>
                <input
                    type="text"
                    value={data.description}
                    onChange={(e) => onChange("description", e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label className="font-semibold">Frecuencia de pago</label>
                <select
                    value={data.code}
                    onChange={(e) => onChange("code", e.target.value)}
                    className="border p-2 rounded w-full"
                >
                    <option value="weekly">Semanal</option>
                    <option value="biweekly">Quincenal</option>
                    <option value="monthly">Mensual</option>
                </select>
            </div>
            <div>
                <label className="font-semibold">Hora día</label>
                <input
                    type="number"
                    value={data.hoursPerDay}
                    onChange={(e) => onChange("hoursPerDay", e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label className="font-semibold">Días a la semana</label>
                <input
                    type="text"
                    value={data.workingDaysPerWeek}
                    onChange={(e) => onChange("workingDaysPerWeek", e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div>
                <label className="font-semibold">Total Horas</label>
                <input
                    type="text"
                    value={data.totalHoursPeriod}
                    onChange={(e) => onChange("totalHoursPeriod", e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>
            <div className="flex">
                <label className="font-semibold">Vacaciones</label>
                <input
                    type="checkbox"
                    checked={data.hasVacation}
                    onChange={(e) => onChange("hasVacation", e.target.checked)}
                    placeholder="Vacaciones"
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="flex">
                <label className="font-semibold">Cesantías</label>
                <input
                    type="checkbox"
                    checked={data.hasBonus}
                    onChange={(e) => onChange("hasBonus", e.target.checked)}
                    placeholder="Cesantías"
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="flex">
                <label className="font-semibold">Liquidación</label>
                <input
                    type="checkbox"
                    checked={data.hasLiquidation}
                    onChange={(e) => onChange("hasLiquidation", e.target.checked)}
                    placeholder="Liquidación"
                    className="border p-2 rounded w-full"
                />
            </div>

            <div className="col-span-3">
                <DataEntryTable
                    rowData={payrollSchemeDet}
                    columnDefs={columnDefsPayrollSchemeDet}
                    height={350}
                    startEditColKey="concept_code"
                    triggerField="concept_code"
                    createEmptyRow={() => ({
                        concept_id: 0,
                        concept_code: '',
                        concept_description: '',
                        value: 0,
                        hours: 0
                    })}
                    onTrigger={async (code, params) => {
                        const res = await fetch(`/api/concept/by-code/${code}`);
                        const concept = await res.json();
                        console.log("COncepto: ", concept)
                        if (!concept) return;

                        params.node.setDataValue('concept_id', concept.id);
                        params.node.setDataValue('concept_code', concept.code);
                        params.node.setDataValue('concept_description', concept.description);
                    }}
                    onRowsChange={(rows) => {
                        onChange("payrollSchemeDet", rows);
                    }}
                />

            </div>
        </div>
    );
}