"use client";
import { PivotTableEnc } from "./components/modules/PivotTableEnc";
import { columnDefsNomina } from "./static";


export default function NominaPage() {

    return (
        <div className="flex w-full items-center justify-center font-sans dark:bg-black bg-gray-300 ">
            <div className="flex  w-full max-w-8xl flex-col items-center justify-between py-32 px-16 bg-gray-300 dark:bg-black sm:items-start">
                <PivotTableEnc columnDefs={columnDefsNomina}/>
            </div>
        </div>
    )
}