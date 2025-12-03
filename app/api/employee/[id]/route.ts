import { Employee } from "@/src/entities/Employee";
import { getDataSource } from "@/src/lib/typeorm";


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
