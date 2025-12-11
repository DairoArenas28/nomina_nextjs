"use client"
import { Button } from "@/src/components/atoms/Button";
import { columnDefsNomina } from "../../static";
import { PivotTableEnc } from "../modules/PivotTableEnc";
import ModalForm from "@/src/components/molecules/ModalForm";
import { useState } from "react";
import { CreateNominaForm } from "./CreateNominaForm";



export function NominaPage() {

    const [open, setOpen] = useState(false)

    return (
        <div className="flex flex-col gap-3 w-full ">
            <div>
                <Button text="Generar Periodo" onClick={() => setOpen(true)}/>
            </div>
            <PivotTableEnc columnDefs={columnDefsNomina}/>
            <ModalForm isOpen={open} onClose={() => setOpen(false)}>
                <CreateNominaForm />
            </ModalForm>
        </div>
    )
}