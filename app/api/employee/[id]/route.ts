import { Employee } from "@/src/entities/Employee";
import { getDataSource } from "@/src/lib/typeorm";


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;  // ← IMPORTANTE
        const body = await req.json();
        const db = await getDataSource()

        const employeeRepo = db.getRepository(Employee)

        const employee = await employeeRepo.findOneBy({ id: parseInt(id) });
        if (!employee) {
            return new Response(JSON.stringify({ error: "Empleado no encontrado" }), { status: 404 });
        }

        employeeRepo.merge(employee, { ...body , payrollSchemeEnc: body.payrollSchemeEnc_id ? { id: body.payrollSchemeEnc_id } : null });
        await employeeRepo.save(employee);
        return new Response(JSON.stringify(employee), { status: 200 });
    } catch (e) {
        console.error("ERROR PUTCH:", e);
        return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500 });
    }
}

export async function DELETE(req: Request,  context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;  // ← IMPORTANTE

        const db = await getDataSource()

        const employeeRepo = db.getRepository(Employee)

        const employee = employeeRepo.delete(id)

        if(!employee){
            return new Response(JSON.stringify({ ok: false }), { status: 417 });
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
        console.error("ERROR DELETE:", e);
        return new Response(JSON.stringify({ error: "Error al eliminar" }), { status: 500 });
    }
}
