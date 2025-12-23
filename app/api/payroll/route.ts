import { Concept } from "@/src/entities/Concept";
import { PayrollSchemeDet } from "@/src/entities/PayrollSchemeDet";
import { PayrollSchemeEnc } from "@/src/entities/PayrollSchemeEnc";
import { getDataSource } from "@/src/lib/typeorm";
import { PayrollSchemeType } from "@/src/types/payroll.type";
import { NextResponse } from "next/server";

export async function GET() {
    const db =  await getDataSource()
    const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc)
    const payrollSchemes = await payrollSchemeEncRepo.find({
        relations: {
            payrollSchemeDet: {
                concept: true
            }
        }
    })
    return NextResponse.json(payrollSchemes)
}

export async function POST(request: Request) {
    const body: PayrollSchemeType =  await request.json()

    const db = await getDataSource()
    const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc)
    const payrollSchemeDetRepo = db.getRepository(PayrollSchemeDet)

    const payrollSchemeDetOnly = body.payrollSchemeDet

    const newPayrollSchemeEnc = new PayrollSchemeEnc()
    newPayrollSchemeEnc.code = body.code
    newPayrollSchemeEnc.description = body.description
    newPayrollSchemeEnc.payFrequency = body.payFrequency
    newPayrollSchemeEnc.hoursPerDay = body.hoursPerDay
    newPayrollSchemeEnc.workingDaysPerWeek = body.workingDaysPerWeek
    newPayrollSchemeEnc.totalHoursPeriod = body.totalHoursPeriod
    newPayrollSchemeEnc.hasVacation = body.hasVacation
    newPayrollSchemeEnc.hasBonus = body.hasBonus
    newPayrollSchemeEnc.hasLiquidation = body.hasLiquidation

    const savedPayrollSchemeEnc = await payrollSchemeEncRepo.save(newPayrollSchemeEnc)

    payrollSchemeDetOnly.map(async(item) => {
        const newPayrollSchemeDet = new PayrollSchemeDet()
        newPayrollSchemeDet.payrollSchemeEnc = {id: savedPayrollSchemeEnc.id} as PayrollSchemeEnc
        newPayrollSchemeDet.concept = {id: item.concept_id} as Concept
        newPayrollSchemeDet.value = item.value
        newPayrollSchemeDet.hours = item.hours
        await payrollSchemeDetRepo.save(newPayrollSchemeDet)
    })
    
    return NextResponse.json(payrollSchemeDetOnly)
}