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

        const { id } = await context.params;
        const db = await getDataSource()

        const nominaRepo = db.getRepository(Nomina)
        const employeeRepo = db.getRepository(Employee)
        const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc)
        const nominaEncRepo = db.getRepository(NominaEnc)
        const nominaDetRepo = db.getRepository(NominaDet)

        let deductedNomina = 0
        let accrualNomina = 0

        const nomina = await nominaRepo.findOneBy({ id: Number(id) })
        if (!nomina) {
            return NextResponse.json({ message: "Nómina no encontrada" }, { status: 404 })
        }

        const employees = await employeeRepo.find({
            relations: { payrollSchemeEnc: true }
        })

        if (!employees.length) {
            return NextResponse.json({ message: "No hay empleados" }, { status: 400 })
        }

        let totalRegisterNominaEnc = await nominaEncRepo.count()

        for (const content of employees) {

            let deductedNominaEnc = 0
            let accrualNominaEnc = 0

            console.log("Procesando empleado", content.id)

            const payrollScheme = await payrollSchemeEncRepo.findOne({
                where: { id: content.payrollSchemeEnc.id },
                relations: { payrollSchemeDet: { concept: true } }
            })

            if (!payrollScheme?.payrollSchemeDet?.length) {
                throw new Error(`La plantilla ${content.payrollSchemeEnc.id} no tiene conceptos`)
            }

            const newNominaEnc = new NominaEnc()
            totalRegisterNominaEnc++
            newNominaEnc.code = formatConsecutive(totalRegisterNominaEnc)
            newNominaEnc.hoursWorked = payrollScheme.totalHoursPeriod / 2
            newNominaEnc.nomina = { id: Number(id) } as Nomina
            newNominaEnc.employee = { id: content.id } as Employee

            const savedNominaEnc = await nominaEncRepo.save(newNominaEnc)

            for (const item of payrollScheme.payrollSchemeDet) {

                const total = item.hours
                    ? item.hours * content.valueHoursSalary
                    : item.value

                if (item.concept.type === 'Deducido') {
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

            savedNominaEnc.accrual = accrualNominaEnc
            savedNominaEnc.deducted = deductedNominaEnc
            savedNominaEnc.total = accrualNominaEnc - deductedNominaEnc

            await nominaEncRepo.save(savedNominaEnc)

            accrualNomina += accrualNominaEnc
            deductedNomina += deductedNominaEnc
        }

        nomina.state = NominaState.GENERADO
        nomina.accrual = accrualNomina
        nomina.deducted = deductedNomina
        nomina.total = accrualNomina - deductedNomina

        await nominaRepo.save(nomina)

        return NextResponse.json({ ok: true })

    } catch (error: any) {
        console.error("ERROR GENERANDO NÓMINA:", error)
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
