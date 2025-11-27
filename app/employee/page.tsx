import PivotTable from "@/src/components/molecules/PivotTable";

export default function EmployeePage() {
    return (
    <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-amber-300">
      <main className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-amber-300 dark:bg-black sm:items-start">
        
        <PivotTable />

      </main>
    </div>
    )
}