"use client";
import PivotTable from "@/src/components/molecules/PivotTable";
import { EmployeeResponseSchema } from "@/src/types/employee.type";
import { useQuery } from "@tanstack/react-query";
import { useDeleteEmployee } from "./hooks/employee-delete.hook";
import { columnDefsEmployee } from "@/src/static/ColumnDefsTable";

export default function EmployeePage() {

  const deleteMutation = useDeleteEmployee()

  const { data } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("/api/employee", { cache: "no-store" });

      if (!res.ok) {
        throw new Error("Error en la API");
      }

      const json = await res.json();
      const parsed = EmployeeResponseSchema.parse(json);

      return parsed.data; // <-- Array de empleados
    },
  });
  
  console.log(data)
  return (

    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
      <main className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">

        <PivotTable data={data ?? []} columnDefs={columnDefsEmployee} deleteHooks={deleteMutation} entity="employee" />
      </main>
    </div>
  )
}