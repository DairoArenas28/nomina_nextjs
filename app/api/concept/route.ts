import { Concept } from "@/src/entities/Concept";
import { getDataSource } from "@/src/lib/typeorm";
import { ConceptResponseSchema, ConceptWithoutId } from "@/src/types/concept.type";
import { } from "@/src/types/employee.type";
import { NextResponse } from "next/server";
import { z } from "zod";

const db = await getDataSource();
const conceptRepo = db.getRepository(Concept);
/*export async function GET(request: NextRequest) {
    try {
        const content = await fs.readFileSync(filePath, "utf-8")
        const json = JSON.parse(content)
        return NextResponse.json( json )
    } catch (error) {
        return NextResponse.json({ error }, { status: 404 })
    }
}*/
export async function GET() {
    const concepts = await conceptRepo.find();
    // Validación con Zod
    const parsed = ConceptResponseSchema.parse(concepts);
    //console.log(parsed)
    return NextResponse.json(parsed);
}

export async function POST(req: Request) {
    try {
        const body = await req.json()

        // ✅ 1. Validación y tipado con Zod
        const parsed = ConceptWithoutId.parse(body)

        // ✅ 2. Conversión null → undefined (TypeORM safe)
        const data = {
            ...parsed,
            calculationType: parsed.calculationType ?? undefined,
            calculationBase: parsed.calculationBase ?? undefined,
            percentage: parsed.percentage ?? undefined,
            overtimeType: parsed.overtimeType ?? undefined,
            value: parsed.value ?? undefined,
        }

        // ✅ 3. Crear y guardar
        const concept = conceptRepo.create(data)
        const saved = await conceptRepo.save(concept)

        return NextResponse.json({
            data: saved,
            message: "Concepto guardado correctamente"
        })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { errors: error.issues },
                { status: 400 }
            )
        }

        console.error(error)
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        )
    }
}
