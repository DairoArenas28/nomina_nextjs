import { Concept } from "@/src/entities/Concept";
import { getDataSource } from "@/src/lib/typeorm";


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;  // ← IMPORTANTE
        const body = await req.json();
        const db = await getDataSource()

        const conceptRepo = db.getRepository(Concept)

        const concept = await conceptRepo.findOneBy({ id: parseInt(id) });
        if (!concept) {
            return new Response(JSON.stringify({ error: "Empleado no encontrado" }), { status: 404 });
        }

        conceptRepo.merge(concept, body);
        await conceptRepo.save(concept);
        return new Response(JSON.stringify(concept), { status: 200 });
    } catch (e) {
        console.error("ERROR PUTCH:", e);
        return new Response(JSON.stringify({ error: "Error al actualizar" }), { status: 500 });
    }
}

export async function DELETE(req: Request,  context: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await context.params;  // ← IMPORTANTE

        const db = await getDataSource()

        const conceptRepo = db.getRepository(Concept)

        const concept = conceptRepo.delete(id)

        if(!concept){
            return new Response(JSON.stringify({ ok: false }), { status: 417 });
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (e) {
        console.error("ERROR DELETE:", e);
        return new Response(JSON.stringify({ error: "Error al eliminar" }), { status: 500 });
    }
}
