import PivotTable from "@/src/components/molecules/PivotTable";
import { columnDefsConcept } from "@/src/static/ColumnDefsTable";


export default function page() {
    return (
        <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300">
            <div className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
                <PivotTable columnDefs={columnDefsConcept} data={[]} entity="concept"/>
            </div>
        </div>
    )
}