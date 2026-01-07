'use client'

import { useState } from "react";
import { PivotTableNominaDet } from "../modules/PivotTableNominaDet";
import { PivotTableNominaEnc } from "../modules/PivotTableNominaEnc";

interface NominaEncPageProps {
    id: string;
}

export function NominaEncPage({ id }: NominaEncPageProps) {

    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-3 w-full">

            <PivotTableNominaEnc id={id} onRowSelected={setSelectedId} />

            {selectedId !== null && (
                <PivotTableNominaDet selectedId={selectedId} />
            )}
        </div>

    )
}