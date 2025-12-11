"use client"
import { Button } from "@/src/components/atoms/Button";
import { columnDefsNomina } from "../../static";
import { PivotTableEnc } from "../modules/PivotTableEnc";
import ModalForm from "@/src/components/molecules/ModalForm";
import { useState } from "react";
import { CreateNominaForm } from "./CreateNominaForm";
import { useGenerateNomina } from "../../hooks/nomina.hook";
import Swal from "sweetalert2";



export function NominaPage() {

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const generateNomina = useGenerateNomina()
    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton:
                "px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 font-medium mx-2 cursor-pointer",
            cancelButton:
                "px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-medium mx-2 cursor-pointer",
        },
        buttonsStyling: false,
    });

    const handleGenerate = () => {
        console.log(selectedId)
        if (selectedId) {
            swalWithTailwind
                .fire({
                    title: "¿Estas seguro de generar la nómina?",
                    text: "No podrás revertir esta acción.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, Generar",
                    cancelButtonText: "No, Cancelar",
                    reverseButtons: true,
                })
                .then((result) => {
                    if (result.isConfirmed) {
                        generateNomina.mutate(selectedId, {
                            onSuccess: () => {
                                swalWithTailwind.fire({
                                    title: "¡Nómina Generada!",
                                    icon: "success",
                                });
                            },
                            onError: () => {
                                swalWithTailwind.fire({
                                    title: "Error",
                                    text: "No se pudo generar la nómina.",
                                    icon: "error",
                                });
                            },
                        });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithTailwind.fire({
                            title: "Cancelado",
                            text: "No se realizó ningún cambio.",
                            icon: "error",
                        });
                    }
                });


        } else {
            //throw new Error("Selecciona un periodo")
            //console.log("Selecciona un periodo")
            Swal.fire({
                icon: "info",
                title: "Oops...",
                text: "Selecciona un periodo!",
                footer: ''
            });
        }

    }

    return (
        <div className="flex flex-col gap-3 w-full ">
            <div className="flex justify-between">
                <div>
                    <Button text="Generar Periodo" color="bg-gray-600" onClick={() => setOpen(true)} />
                </div>
                <div>
                    <Button text="Generar Nómina" color="bg-blue-600" onClick={handleGenerate} />
                </div>
            </div>
            <PivotTableEnc columnDefs={columnDefsNomina} onRowSelected={setSelectedId} />
            <ModalForm isOpen={open} onClose={() => setOpen(false)}>
                <CreateNominaForm />
            </ModalForm>
        </div>
    )
}