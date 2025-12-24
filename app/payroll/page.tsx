'use client'
import PivotTable from "@/src/components/molecules/PivotTable";
import { columnDefsPayrollScheme } from "@/src/static/ColumnDefsTable";
import { useCreatePayroll, useDeletePayroll, useUpdatePayroll } from "./hooks/payroll.hook";
import { useQuery } from "@tanstack/react-query";
import { PayrollSchemeType } from "@/src/types/payroll.type";


export default function PayrollPage() {

    const createMutation = useCreatePayroll()
    const updateMutation = useUpdatePayroll()
    const deleteMutation = useDeletePayroll()

    const { data, refetch, isFetching } = useQuery<PayrollSchemeType[]>({
        queryKey: ["payroll"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/api/payroll", { cache: "no-store" })
            if (!res.ok) {
                throw new Error("Error en la API")
            }
            const json = await res.json()
            return json
        },
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 2
    })

    console.log(data)

    return (
        <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300 ">
            <div className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
                <PivotTable onRefetch={refetch} isFetching={isFetching}  data={data ?? []}  columnDefs={columnDefsPayrollScheme} createHooks={createMutation} updateHooks={updateMutation} deleteHooks={deleteMutation} entity="payroll"/>
            </div>
        </div>
    )
}