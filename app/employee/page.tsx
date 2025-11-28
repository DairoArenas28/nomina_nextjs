"use client";
import PivotTable from "@/src/components/molecules/PivotTable";
import { EmployeeResponseSchema } from "@/src/types/employee.type";
import { useQuery } from "@tanstack/react-query";
import { useDeleteEmployee } from "./hooks/employee-delete.action";

export default function EmployeePage() {

  const deleteMutation = useDeleteEmployee()

  const { data } = useQuery({
    queryKey: ["emproyees"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3000/api/employee/`, { cache: "no-store" });
      const json = await res.json();
      const parsed = EmployeeResponseSchema.parse(json); // ← valida y tipa
      return parsed.data;
    }

  })

  return (
    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
      <main className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
        <PivotTable data={data ?? []} deleteHooks={deleteMutation}/>
      </main>
    </div>
  )
}