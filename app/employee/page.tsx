import PivotTable from "@/src/components/molecules/PivotTable";
import { EmployeeResponseSchema } from "@/src/types/employee.type";

const readJSON = async () => {
  const res = await fetch(`http://localhost:3000/api/fs/`,{ cache: "no-store" });
  const json = await res.json();
  const parsed = EmployeeResponseSchema.parse(json); // ← valida y tipa
  return parsed.data;
};

export default async function EmployeePage() {

  const employee = await readJSON() 

  console.log(employee)

  return (
    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
      <main className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">

        <PivotTable data={employee}/>

      </main>
    </div>
  )
}