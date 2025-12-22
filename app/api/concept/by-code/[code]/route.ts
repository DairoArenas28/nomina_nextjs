import { Concept } from "@/src/entities/Concept";
import { getDataSource } from "@/src/lib/typeorm";
import { NextResponse } from "next/server";


export async function GET(req: Request, context: { params: Promise<{ code: string }> }) {
    try {
        const { code } = await context.params;
        const db = await getDataSource()

        const conceptRepo = db.getRepository(Concept)

        const concept = await conceptRepo.findOneBy({ code });
        if (!concept) {
            return new Response(JSON.stringify({ error: "Concepto no encontrado" }), { status: 404 });
        }

        return NextResponse.json(concept);
    } catch (e) {
        console.error("ERROR GET:", e);
        return new Response(JSON.stringify({ error: "Error al obtener el registro" }), { status: 500 });
    }
}
