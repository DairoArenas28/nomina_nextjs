import { NominaEnc } from "@/src/entities/NominaEnc";
import { Employee } from "@/src/entities/Employee";
import { Nomina } from "@/src/entities/Nomina";
import { getDataSource } from "@/src/lib/typeorm";
import { NextResponse } from "next/server"
import { formatConsecutive } from "@/src/utils/consecutive";
import { NominaDet } from "@/src/entities/NominaDet";
import { Concept } from "@/src/entities/Concept";
import { NominaState } from "@/src/entities/enums";
import { PayrollSchemeEnc } from "@/src/entities/PayrollSchemeEnc";
import { PayrollSchemeDet } from "@/src/entities/PayrollSchemeDet";
import { Config } from "@/src/entities/Config";


export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const db = await getDataSource()
    const nominaEncRepo = db.getRepository(NominaEnc)

    const nominaEnc = await nominaEncRepo.find({
        where: {
            nomina: { id: Number(id) }
        },
        relations: {
            employee: true
        },
        order: { code: "ASC" }
    });
    return NextResponse.json(nominaEnc);
}

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params
        const db = await getDataSource()

        await db.transaction(async (manager) => {

            const nominaRepo = manager.getRepository(Nomina)
            const employeeRepo = manager.getRepository(Employee)
            const payrollSchemeEncRepo = manager.getRepository(PayrollSchemeEnc)
            const nominaEncRepo = manager.getRepository(NominaEnc)
            const nominaDetRepo = manager.getRepository(NominaDet)
            const configRepo = manager.getRepository(Config)

            let deductedNomina = 0
            let accrualNomina = 0

            /* ===============================
               CONFIGURACIÓN GENERAL
            =============================== */

            const [config] = await configRepo.find({
                order: { id: "ASC" },
                take: 1,
            })

            if (!config) {
                throw new Error(
                    "La configuración es requerida para generar la nómina"
                )
            }

            /* ===============================
               NÓMINA
            =============================== */

            const nomina = await nominaRepo.findOneBy({ id: Number(id) })

            if (!nomina) {
                throw new Error("Nómina no encontrada")
            }

            if (nomina.state === NominaState.GENERADO) {
                throw new Error("La nómina ya fue generada")
            }

            /* ===============================
               EMPLEADOS
            =============================== */

            const employees = await employeeRepo.find({
                relations: { payrollSchemeEnc: true }
            })

            if (!employees.length) {
                throw new Error("No hay empleados para procesar")
            }

            let totalRegisterNominaEnc = await nominaEncRepo.count()

            /* ===============================
               PROCESO DE NÓMINA
            =============================== */

            for (const employee of employees) {

                let deductedNominaEnc = 0
                let accrualNominaEnc = 0

                const payrollScheme = await payrollSchemeEncRepo.findOne({
                    where: { id: employee.payrollSchemeEnc.id },
                    relations: {
                        payrollSchemeDet: {
                            concept: true
                        }
                    }
                })

                if (!payrollScheme?.payrollSchemeDet?.length) {
                    throw new Error(
                        `La plantilla ${employee.payrollSchemeEnc.id} no tiene conceptos`
                    )
                }

                /* ===============================
                   NÓMINA ENCABEZADO
                =============================== */

                const nominaEnc = nominaEncRepo.create({
                    code: formatConsecutive(++totalRegisterNominaEnc),
                    hoursWorked: payrollScheme.totalHoursPeriod / 2,
                    nomina: { id: Number(id) },
                    employee: { id: employee.id }
                })

                const savedNominaEnc = await nominaEncRepo.save(nominaEnc)

                /* ===============================
                   NÓMINA DETALLE
                =============================== */

                for (const item of payrollScheme.payrollSchemeDet) {

                    const total = item.hours
                        ? item.hours * employee.valueHoursSalary
                        : item.value

                    if (item.concept.type === "Deducido") {
                        deductedNominaEnc += total
                    } else {
                        accrualNominaEnc += total
                    }

                    await nominaDetRepo.save({
                        nominaEnc: savedNominaEnc,
                        concept: item.concept,
                        hours: item.hours,
                        value: item.value,
                        total
                    })
                }

                /* ===============================
                   TOTALES EMPLEADO
                =============================== */

                savedNominaEnc.accrual = accrualNominaEnc
                savedNominaEnc.deducted = deductedNominaEnc
                savedNominaEnc.total = accrualNominaEnc - deductedNominaEnc

                await nominaEncRepo.save(savedNominaEnc)

                accrualNomina += accrualNominaEnc
                deductedNomina += deductedNominaEnc
            }

            /* ===============================
               TOTALES NÓMINA
            =============================== */

            nomina.state = NominaState.GENERADO
            nomina.accrual = accrualNomina
            nomina.deducted = deductedNomina
            nomina.total = accrualNomina - deductedNomina

            await nominaRepo.save(nomina)
        })

        return NextResponse.json({ ok: true })

    } catch (error: any) {
        console.error("ERROR GENERANDO NÓMINA:", error)

        return NextResponse.json(
            { message: error.message ?? "Error generando la nómina" },
            { status: 500 }
        )
    }
}
