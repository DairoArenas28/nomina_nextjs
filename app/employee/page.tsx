"use client";
import PivotTable from "@/src/components/molecules/PivotTable";
import { useQuery } from "@tanstack/react-query";
import { useCreateEmployee, useDeleteEmployee } from "./hooks/employee.hook";
import { columnDefsEmployee } from "@/src/static/ColumnDefsTable";

export default function EmployeePage() {

  const createMutation = useCreateEmployee()
  const deleteMutation = useDeleteEmployee()

  const { data } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/employee", { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Error en la API");
      }

      const json = await res.json();
      console.log(json)
      //const parsed = EmployeeResponseSchema.parse(json);

      return json; // <-- Array de empleados
    },
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 2
  });
  
  console.log(data)
  return (

    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
      <main className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">

        <PivotTable data={data ?? []} columnDefs={columnDefsEmployee} createHooks={createMutation} deleteHooks={deleteMutation} entity="employee" />
      </main>
    </div>
  )
}