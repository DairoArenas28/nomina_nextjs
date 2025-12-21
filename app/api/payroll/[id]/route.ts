import { Concept } from "@/src/entities/Concept";
import { PayrollSchemeDet } from "@/src/entities/PayrollSchemeDet";
import { PayrollSchemeEnc } from "@/src/entities/PayrollSchemeEnc";
import { getDataSource } from "@/src/lib/typeorm";
import { PayrollSchemeType } from "@/src/types/payroll.type";


export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body: PayrollSchemeType =  await request.json()

    const db = await getDataSource()
    const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc)
    const payrollSchemeDetRepo = db.getRepository(PayrollSchemeDet)
    const payrollSchemeEnc = await payrollSchemeEncRepo.findOneBy({ id: parseInt(id) });

    if (!payrollSchemeEnc) {
        return new Response(JSON.stringify({ error: "Esquema de nómina no encontrado" }), { status: 404 });
    }
    
    payrollSchemeEnc.code = body.code
    payrollSchemeEnc.description = body.description
    payrollSchemeEnc.payFrequency = body.payFrequency
    payrollSchemeEnc.hoursPerDay = body.hoursPerDay
    payrollSchemeEnc.workingDaysPerWeek = body.workingDaysPerWeek
    payrollSchemeEnc.totalHoursPeriod = body.totalHoursPeriod
    payrollSchemeEnc.hasVacation = body.hasVacation
    payrollSchemeEnc.hasBonus = body.hasBonus
    payrollSchemeEnc.hasLiquidation = body.hasLiquidation
    await payrollSchemeEncRepo.save(payrollSchemeEnc)
    await payrollSchemeDetRepo.delete({ payrollSchemeEnc: { id: payrollSchemeEnc.id } })
    const payrollSchemeDetOnly = body.payrollSchemeDet
    payrollSchemeDetOnly.map(async(item) => {
        const newPayrollSchemeDet = new PayrollSchemeDet()
        newPayrollSchemeDet.payrollSchemeEnc = {id: payrollSchemeEnc.id} as PayrollSchemeEnc
        newPayrollSchemeDet.concept = {id: item.concept_id} as Concept
        newPayrollSchemeDet.value = item.value
        newPayrollSchemeDet.hours = item.hours
        await payrollSchemeDetRepo.save(newPayrollSchemeDet)
    })
    return new Response(JSON.stringify(body), { status: 200 });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const db = await getDataSource()
    const payrollSchemeEncRepo = db.getRepository(PayrollSchemeEnc)
    const payrollSchemeEnc = await payrollSchemeEncRepo.findOneBy({ id: parseInt(id) });
    if (!payrollSchemeEnc) {
        return new Response(JSON.stringify({ error: "Esquema de nómina no encontrado" }), { status: 404 });
    }
    await payrollSchemeEncRepo.delete(payrollSchemeEnc.id)
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
}

