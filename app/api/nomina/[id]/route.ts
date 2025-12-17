import { NominaEnc } from "@/src/entities/NominaEnc";
import { Employee } from "@/src/entities/Employee";
import { Nomina } from "@/src/entities/Nomina";
import { getDataSource } from "@/src/lib/typeorm";
import { NextResponse } from "next/server"
import { formatConsecutive } from "@/src/utils/consecutive";
import { NominaDet } from "@/src/entities/NominaDet";
import { Concept } from "@/src/entities/Concept";
import { NominaState } from "@/src/entities/enums";


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
        }
    });
    return NextResponse.json(nominaEnc);
}

export async function POST(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const db = await getDataSource()
    const nominaRepo = db.getRepository(Nomina)
    const employeeRepo = db.getRepository(Employee)
    const conceptRepo = db.getRepository(Concept)
    const nominaEncRepo = db.getRepository(NominaEnc)
    const nominaDetRepo = db.getRepository(NominaDet)

    const nomina = await nominaRepo.findOneBy({ id: Number(id) })
    const concept = await conceptRepo.find()
    const employees = await employeeRepo.find()
    const totalRegisterNominaEnc = await nominaEncRepo.count()

    if (!nomina) {
        return NextResponse.json({ message: "Nómina no encontrada, verifica por favor" })
    }

    if (!employees) {
        return NextResponse.json({ message: "No hay empleados para generar la nómina, verifica por favor" })
    }

    employees.map(async (content) => {
        const newNominaEnc = new NominaEnc()
        newNominaEnc.code = formatConsecutive(totalRegisterNominaEnc + 1)
        newNominaEnc.hoursWorked = 23
        newNominaEnc.deducted = 20000
        newNominaEnc.accrual = 20000
        newNominaEnc.nomina = { id: Number(id) } as Nomina
        newNominaEnc.employee = { id: content.id } as Employee

        const savedNominaEnc = await nominaEncRepo.save(newNominaEnc)

        concept.map((content) => {
            const newNominaDet = new NominaDet()
            newNominaDet.nominaEnc = {id: savedNominaEnc.id} as NominaEnc
            newNominaDet.concept = {id: content.id} as Concept
            nominaDetRepo.save(newNominaDet)
        })
    })

    nomina.state = NominaState.GENERADO
    await nominaRepo.save(nomina)

    console.log(id);

    return NextResponse.json({ employees });
}