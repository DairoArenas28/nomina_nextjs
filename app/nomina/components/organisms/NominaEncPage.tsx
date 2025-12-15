'use client'

import { PivotTableNominaDet } from "../modules/PivotTableNominaDet";
import { PivotTableNominaEnc } from "../modules/PivotTableNominaEnc";

interface NominaEncPageProps {
    id: string;
}

export function NominaEncPage({ id }: NominaEncPageProps) {
    
    

    return (
        <div className="flex flex-col gap-3 w-full">

            <PivotTableNominaEnc id={id}/>

            <PivotTableNominaDet id={id}/>
        </div>

    )
}