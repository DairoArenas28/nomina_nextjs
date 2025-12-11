import { use, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { useCreateNomina } from "../../hooks/nomina.hook";

export function CreateNominaForm() {
    const createMutation = useCreateNomina()
    const [year, setYear] = useState<number | "">("");
    const [month, setMonth] = useState<number | "">("");
    const months = [
        "1", "2", "3", "4", "5", "6",
        "7", "8", "9", "10", "11", "12"
    ];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!year || !month) {
            alert("Por favor selecciona año y mes.");
            return;
        }

        console.log({ year, month });

        createMutation.mutate({  year: String(year), month: String(month) } );
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-row space-x-4 items-center">
            <div>
                <label className="block mb-2 font-semibold">Año</label>
                <input
                    name="year"
                    type="number"
                    min={2025}
                    max={2035}  // hasta donde quieras
                    step={1}
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    placeholder="2025"
                    className="border px-3 py-2 rounded"
                />
            </div>
            <div>
                <label className="block mb-2 font-semibold">Mes</label>
                <select
                    name="month"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                    className="border px-3 py-2 rounded h-10"
                >
                    <option value="">Selecciona mes</option>
                    {months.map((name, index) => (
                        <option key={index} value={index + 1}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mt-8">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                    Generar
                </button>
            </div>
        </form>
    );
}

